<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\TenantSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TenantSettingController extends Controller
{
    private const ALLOWED_KEYS = [
        'theme_mode',
        'accent_color',
    ];

    public function index(): Response
    {
        return Inertia::render('tenant/Settings');
    }

    public function update(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'key' => ['required', 'string', 'in:'.implode(',', self::ALLOWED_KEYS)],
            'value' => ['nullable', 'string', 'max:255'],
        ]);

        TenantSetting::setSetting($validated['key'], $validated['value']);

        return back();
    }
}
