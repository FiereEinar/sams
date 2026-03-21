<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'last_name',
        'first_name',
        'middle_name',
        'sex',
        'course',
        'year',
        'units',
        'section',
    ];
}
