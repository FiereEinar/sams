<?php

namespace App\Http\Controllers\tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterlistController extends Controller
{
    public function index() {
        return Inertia::render("tenant/Masterlist");
    }
}
