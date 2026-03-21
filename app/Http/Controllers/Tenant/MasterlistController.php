<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class MasterlistController extends Controller
{
    public function index(): Response
    {
        $students = Student::query()
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->get();

        return Inertia::render('tenant/Masterlist', [
            'students' => $students,
        ]);
    }
}
