<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EventSessionController extends Controller
{
    public function store(Request $request, Event $event): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $event->sessions()->create([
            'name' => $validated['name'],
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', "Session '{$validated['name']}' created.");
    }

    public function start(EventSession $session): RedirectResponse
    {
        if ($session->status !== 'pending' && $session->status !== 'paused') {
            return redirect()->back()->with('error', 'Session cannot be started.');
        }

        $session->update([
            'status' => 'active',
            'started_at' => $session->started_at ?? now(),
        ]);

        return redirect()->back()->with('success', "Session '{$session->name}' started.");
    }

    public function pause(EventSession $session): RedirectResponse
    {
        if ($session->status !== 'active') {
            return redirect()->back()->with('error', 'Only active sessions can be paused.');
        }

        $session->update([
            'status' => 'paused',
            'paused_at' => now(),
        ]);

        return redirect()->back()->with('success', "Session '{$session->name}' paused.");
    }

    public function resume(EventSession $session): RedirectResponse
    {
        if ($session->status !== 'paused') {
            return redirect()->back()->with('error', 'Only paused sessions can be resumed.');
        }

        $session->update([
            'status' => 'active',
        ]);

        return redirect()->back()->with('success', "Session '{$session->name}' resumed.");
    }

    public function end(EventSession $session): RedirectResponse
    {
        if ($session->status === 'ended') {
            return redirect()->back()->with('error', 'Session already ended.');
        }

        $session->update([
            'status' => 'ended',
            'ended_at' => now(),
        ]);

        return redirect()->back()->with('success', "Session '{$session->name}' ended.");
    }
}
