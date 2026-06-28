<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Student;
use App\Models\TenantSetting;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Models\TransactionPayment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(Request $request): Response
    {
        $transactions = Transaction::with(['student', 'recordedBy', 'collection', 'payments'])
            ->latest()
            ->paginate(15);

        $collections = Collection::latest()->get();

        return Inertia::render('tenant/Transactions', [
            'transactions' => $transactions,
            'collections' => $collections,
        ]);
    }

    public function searchStudents(Request $request)
    {
        $q = $request->query('q', '');

        if (empty($q)) {
            return response()->json([]);
        }

        $students = Student::where('student_id', 'like', "%{$q}%")
            ->orWhere('first_name', 'like', "%{$q}%")
            ->orWhere('last_name', 'like', "%{$q}%")
            ->take(10)
            ->get();

        return response()->json($students);
    }

    public function studentBalances(Request $request, Student $student)
    {
        $transactions = Transaction::where('student_id', $student->id)
            ->with('collection')
            ->get();
            
        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'date' => ['nullable', 'date'],
            'mode_of_payment' => ['required', 'in:cash,gcash'],
            'description' => ['nullable', 'string', 'max:1000'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*.id' => ['required', 'exists:collections,id'],
            'categories.*.details' => ['nullable', 'array'],
            'categories.*.amount_paid' => ['nullable', 'numeric', 'min:0'],
        ]);

        $date = $validated['date'] ?? now();

        $collectionIds = collect($validated['categories'])->pluck('id');
        $collections = Collection::whereIn('id', $collectionIds)->get()->keyBy('id');

        $governor = TenantSetting::getSetting('officers_governor');
        $viceGovernor = TenantSetting::getSetting('officers_vice_governor');
        $treasurer = TenantSetting::getSetting('officers_treasurer');
        $auditor = TenantSetting::getSetting('officers_auditor');

        foreach ($validated['categories'] as $cat) {
            if (!$collections->has($cat['id'])) {
                continue;
            }

            $collection = $collections[$cat['id']];
            
            $paymentAmount = isset($cat['amount_paid']) ? (float) $cat['amount_paid'] : (float) $collection->fee;
            
            if ($paymentAmount < 0) {
                return back()->withErrors(['amount' => "Payment amount cannot be negative for collection {$collection->name}."]);
            }

            // Check if transaction exists
            $transaction = Transaction::where('student_id', $validated['student_id'])
                ->where('collection_id', $collection->id)
                ->first();

            if ($transaction) {
                // Prevent overpayment
                if (($transaction->paid_amount + $paymentAmount) > $collection->fee) {
                    return back()->withErrors(['amount' => "Payment exceeds the remaining balance for collection {$collection->name}."]);
                }

                $newPaidAmount = $transaction->paid_amount + $paymentAmount;
                $status = 'paid';
                if ($newPaidAmount == 0) {
                    $status = 'pending';
                } elseif ($newPaidAmount < $collection->fee) {
                    $status = 'partial';
                }

                $transaction->update([
                    'paid_amount' => $newPaidAmount,
                    'status' => $status,
                ]);
            } else {
                // Create new transaction
                if ($paymentAmount > $collection->fee) {
                    return back()->withErrors(['amount' => "Payment exceeds the required fee for collection {$collection->name}."]);
                }

                $status = 'paid';
                if ($paymentAmount == 0) {
                    $status = 'pending';
                } elseif ($paymentAmount < $collection->fee) {
                    $status = 'partial';
                }

                $transaction = Transaction::create([
                    'student_id' => $validated['student_id'],
                    'collection_id' => $collection->id,
                    'details' => $cat['details'] ?? [],
                    'description' => $validated['description'] ?? null,
                    'paid_amount' => $paymentAmount,
                    'status' => $status,
                    'date' => $date,
                    'recorded_by_id' => auth()->id(),
                    'governor' => $governor,
                    'vice_governor' => $viceGovernor,
                    'treasurer' => $treasurer,
                    'auditor' => $auditor,
                ]);
            }

            if ($paymentAmount > 0) {
                TransactionPayment::create([
                    'transaction_id' => $transaction->id,
                    'amount' => $paymentAmount,
                    'date' => $date,
                    'mode_of_payment' => $validated['mode_of_payment'],
                    'recorded_by_id' => auth()->id(),
                ]);
            }
        }

        return back()->with('success', 'Transaction(s) recorded successfully.');
    }

    public function update(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'description' => ['nullable', 'string', 'max:1000'],
            'details' => ['nullable', 'array'],
        ]);

        $transaction->update([
            'description' => $validated['description'],
            'details' => $validated['details'] ?? [],
        ]);

        return back()->with('success', 'Transaction updated successfully.');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return back()->with('success', 'Transaction deleted successfully.');
    }
}
