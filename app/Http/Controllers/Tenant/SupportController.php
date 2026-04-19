<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\SupportMessage;
use App\Models\SupportTicket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupportController extends Controller
{
    public function index(): Response
    {
        $tickets = SupportTicket::with(['user', 'latestMessage'])
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('tenant/Support', [
            'tickets' => $tickets,
        ]);
    }

    public function show(SupportTicket $ticket): Response
    {
        if ($ticket->user_id !== auth()->id()) {
            abort(403);
        }

        $ticket->load(['messages', 'user']);

        return Inertia::render('tenant/SupportThread', [
            'ticket' => $ticket,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subject' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:5000'],
        ]);

        $ticket = SupportTicket::create([
            'user_id' => auth()->id(),
            'subject' => $validated['subject'],
            'status' => 'open',
        ]);

        SupportMessage::create([
            'support_ticket_id' => $ticket->id,
            'sender_type' => 'tenant',
            'sender_name' => auth()->user()->name,
            'body' => $validated['body'],
        ]);

        return redirect()->route('tenant-support-thread', $ticket);
    }

    public function reply(Request $request, SupportTicket $ticket): RedirectResponse
    {
        if ($ticket->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'body' => ['required', 'string', 'max:5000'],
        ]);

        SupportMessage::create([
            'support_ticket_id' => $ticket->id,
            'sender_type' => 'tenant',
            'sender_name' => auth()->user()->name,
            'body' => $validated['body'],
        ]);

        if ($ticket->status === 'resolved') {
            $ticket->update(['status' => 'open']);
        }

        return back();
    }

    public function close(SupportTicket $ticket): RedirectResponse
    {
        if ($ticket->user_id !== auth()->id()) {
            abort(403);
        }

        $ticket->update(['status' => 'closed']);

        return back();
    }
}
