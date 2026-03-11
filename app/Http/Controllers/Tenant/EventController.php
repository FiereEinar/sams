<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    private function generateEventCode(): string
    {
        $year = now()->year;
        $count = Event::whereYear('created_at', $year)->count() + 1;

        return "EVT-{$year}-" . str_pad($count, 3, '0', STR_PAD_LEFT);
    }

    public function eventsPage()
    {
        $events = Event::all()->sortBy('created_at')->values();

        return Inertia::render('tenant/Events', [
            'events' => $events
        ]);
    }

    public function eventDetailsPage(string $event)
    {
        $event = Event::where('id', $event)->firstOrFail();

        return Inertia::render('tenant/EventDetails', [
            'event' => $event,
        ]);
    }

    public function store(Request $request)
    {
        $body = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'venue' => 'required|string',
            'start_at' => 'required|date',
            'end_at' => 'required|date',
        ]);

        Event::create([
            'title' => $body['title'],
            'code' => $this->generateEventCode(),
            'venue' => $body['venue'],
            'description' => $body['description'],
            'start_at' => Carbon::parse($body['start_at'])->timezone('Asia/Manila'),
            'end_at' => Carbon::parse($body['end_at'])->timezone('Asia/Manila'),
            'created_by' => auth()->guard('web')->user()->id,
        ]);
    }
}
