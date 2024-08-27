<?php

namespace App\Http\Controllers\dashboardPage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class dashboardController extends Controller
{
    function dashboard(){
        return Inertia::render('dashboard/dashboard');
    }

    function projects(){
        return Inertia::render('dashboard/projectList');
    }
    function projectForms(){
        return Inertia::render('dashboard/projectForms');
    }

    function forms(){
        return Inertia::render('dashboard/forms');
    }

    function login(){
        return Inertia::render('login');
    }

    function registratoin(){
        return Inertia::render('registration');
    }
}
