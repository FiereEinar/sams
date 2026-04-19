<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::orderBy('price', 'asc')->get();

        return Inertia::render('admin/Plans', ['plans' => $plans]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:basic,premium',
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'is_featured' => 'boolean',
        ]);

        $validated['status'] = 'active';

        Plan::create($validated);

        return back()->with('success', 'Plan created successfully.');
    }

    public function update(Request $request, Plan $plan)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:basic,premium',
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'is_featured' => 'boolean',
        ]);

        $plan->update($validated);

        return back()->with('success', 'Plan updated successfully.');
    }

    public function toggleStatus(Plan $plan)
    {
        $plan->update([
            'status' => $plan->status === 'active' ? 'archived' : 'active',
        ]);

        return back()->with('success', 'Plan status updated.');
    }
}
