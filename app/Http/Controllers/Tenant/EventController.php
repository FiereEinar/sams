<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function generateEventCode(): string {
        $year = now()->year;
        $count = Event::whereYear('created_at', $year)->count() + 1;

        return "EVT-{$year}-" . str_pad($count, 3, '0', STR_PAD_LEFT);
    }
}
