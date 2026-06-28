<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\TransactionPayment;
use Illuminate\Http\Request;

class TransactionPaymentController extends Controller
{
    public function store(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0.01'],
            'date' => ['nullable', 'date'],
            'mode_of_payment' => ['required', 'in:cash,gcash'],
        ]);

        $date = $validated['date'] ?? now();

        $payment = TransactionPayment::create([
            'transaction_id' => $transaction->id,
            'amount' => $validated['amount'],
            'date' => $date,
            'mode_of_payment' => $validated['mode_of_payment'],
            'recorded_by_id' => auth()->id(),
        ]);

        $transaction->paid_amount += $validated['amount'];
        if ($transaction->paid_amount >= $transaction->total_amount) {
            $transaction->status = 'paid';
        } else {
            $transaction->status = 'partial';
        }
        $transaction->save();

        return back()->with('success', 'Payment added successfully.');
    }
}
