<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_id' => ['required', 'string', 'unique:students,student_id'],
            'last_name' => ['required', 'string', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'sex' => ['nullable', 'string', 'max:50'],
            'course' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:50'],
            'units' => ['nullable', 'string', 'max:50'],
            'section' => ['nullable', 'string', 'max:100'],
        ];
    }
}
