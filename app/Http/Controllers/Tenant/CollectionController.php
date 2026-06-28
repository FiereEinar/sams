<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CollectionController extends Controller
{
    public function index(): Response
    {
        $collections = Collection::latest()->get();

        return Inertia::render('tenant/Collections', [
            'collections' => $collections,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'fee' => ['required', 'numeric', 'min:0'],
            'details' => ['nullable', 'array'],
            'details.*' => ['string'],
            'semester' => ['nullable', 'string', 'max:255'],
            'school_year' => ['nullable', 'string', 'max:255'],
        ]);

        Collection::create($validated);

        return back()->with('success', 'Collection created successfully.');
    }

    public function update(Request $request, Collection $collection)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'fee' => ['required', 'numeric', 'min:0'],
            'details' => ['nullable', 'array'],
            'details.*' => ['string'],
            'semester' => ['nullable', 'string', 'max:255'],
            'school_year' => ['nullable', 'string', 'max:255'],
            'is_archived' => ['nullable', 'boolean'],
        ]);

        $collection->update($validated);

        return back()->with('success', 'Collection updated successfully.');
    }

    public function destroy(Collection $collection)
    {
        $collection->delete();

        return back()->with('success', 'Collection deleted successfully.');
    }
}
