<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::query()
            ->with('tenant')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn (Payment $payment) => [
                'id' => $payment->id,
                'tenant_id' => $payment->tenant_id,
                'organization_name' => $payment->tenant?->organization_name,
                'payer_name' => $payment->payer_name,
                'payer_email' => $payment->payer_email,
                'amount' => $payment->amount,
                'currency' => $payment->currency,
                'description' => $payment->description,
                'payment_method' => $payment->payment_method,
                'checkout_ref' => $payment->checkout_ref,
                'status' => $payment->status,
                'created_at' => $payment->created_at->format('M d, Y h:i A'),
            ]);

        return Inertia::render('admin/Payments', [
            'payments' => $payments,
        ]);
    }
}
