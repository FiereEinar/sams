<?php

namespace App\Http\Controllers;

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
