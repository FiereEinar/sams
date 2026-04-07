<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    public function index()
    {
        $plans = \App\Models\Plan::where('status', 'active')
            ->orderBy('price', 'asc')
            ->get();

        return \Inertia\Inertia::render('LandingPage', [
            'plans' => $plans,
        ]);
    }
}
