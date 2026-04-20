<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MasterlistController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $students = Student::query()
            ->when($search, function ($query) use ($search) {
                $query->where('student_id', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('course', 'like', "%{$search}%");
            })
            ->orderBy('last_name')
            ->orderBy('first_name')
            ->paginate(10)
            ->withQueryString();

        $tenant = tenant();
        $tenantPlan = $tenant->plan ?? 'basic';
        $maxStudents = $tenant->getPlanFeature('max_students_per_import');
        $nextImportAt = null;

        if ($maxStudents !== null && $tenant->last_masterlist_import_at) {
            $lastImportDate = \Carbon\Carbon::parse($tenant->last_masterlist_import_at);
            $nextImportAt = $lastImportDate->addDay()->toIso8601String();
        }

        return Inertia::render('tenant/Masterlist', [
            'students' => $students,
            'filters' => $request->only('search'),
            'tenantPlan' => $tenantPlan,
            'nextImportAt' => $nextImportAt,
        ]);
    }

    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());

        return redirect()->back()->with('success', 'Student added successfully.');
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        return redirect()->back()->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->back()->with('success', 'Student removed successfully.');
    }

    public function clearAll()
    {
        Student::query()->delete();

        return redirect()->back()->with('success', 'All students have been removed from the masterlist.');
    }
}
