<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportMessage;
use App\Models\SupportTicket;
use App\Models\Tenant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupportController extends Controller
{
    public function index(): Response
    {
        $tenants = Tenant::all();
        $allTickets = [];

        foreach ($tenants as $tenant) {
            $tenant->run(function () use ($tenant, &$allTickets) {
                $tickets = SupportTicket::with(['user', 'latestMessage'])
                    ->latest()
                    ->get()
                    ->map(function (SupportTicket $ticket) use ($tenant) {
                        return [
                            'id' => $ticket->id,
                            'subject' => $ticket->subject,
                            'status' => $ticket->status,
                            'user_name' => $ticket->user->name ?? 'Unknown',
                            'latest_message' => $ticket->latestMessage?->body,
                            'latest_message_at' => $ticket->latestMessage?->created_at,
                            'tenant_id' => $tenant->id,
                            'tenant_name' => $tenant->organization_name,
                            'created_at' => $ticket->created_at,
                            'updated_at' => $ticket->updated_at,
                        ];
                    });

                $allTickets = array_merge($allTickets, $tickets->all());
            });
        }

        // Sort by latest updated
        usort($allTickets, fn ($a, $b) => strtotime($b['updated_at']) - strtotime($a['updated_at']));

        return Inertia::render('admin/Support', [
            'tickets' => $allTickets,
        ]);
    }

    public function show(Tenant $tenant, int $ticketId): Response
    {
        $ticketData = null;

        $tenant->run(function () use ($ticketId, $tenant, &$ticketData) {
            $ticket = SupportTicket::with(['messages', 'user'])->findOrFail($ticketId);

            $ticketData = [
                'id' => $ticket->id,
                'subject' => $ticket->subject,
                'status' => $ticket->status,
                'user_name' => $ticket->user->name ?? 'Unknown',
                'tenant_id' => $tenant->id,
                'tenant_name' => $tenant->organization_name,
                'created_at' => $ticket->created_at,
                'messages' => $ticket->messages->map(fn (SupportMessage $msg) => [
                    'id' => $msg->id,
                    'sender_type' => $msg->sender_type,
                    'sender_name' => $msg->sender_name,
                    'body' => $msg->body,
                    'created_at' => $msg->created_at,
                ]),
            ];
        });

        return Inertia::render('admin/SupportThread', [
            'ticket' => $ticketData,
            'tenant' => $tenant,
        ]);
    }

    public function reply(Request $request, Tenant $tenant, int $ticketId): RedirectResponse
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'max:5000'],
        ]);

        $tenant->run(function () use ($ticketId, $validated, $request) {
            $ticket = SupportTicket::findOrFail($ticketId);

            SupportMessage::create([
                'support_ticket_id' => $ticket->id,
                'sender_type' => 'admin',
                'sender_name' => $request->user()->name ?? 'System Admin',
                'body' => $validated['body'],
            ]);

            if ($ticket->status === 'open') {
                $ticket->update(['status' => 'in_progress']);
            }
        });

        return back();
    }

    public function updateStatus(Request $request, Tenant $tenant, int $ticketId): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:open,in_progress,resolved,closed'],
        ]);

        $tenant->run(function () use ($ticketId, $validated) {
            $ticket = SupportTicket::findOrFail($ticketId);
            $ticket->update(['status' => $validated['status']]);
        });

        return back();
    }
}
