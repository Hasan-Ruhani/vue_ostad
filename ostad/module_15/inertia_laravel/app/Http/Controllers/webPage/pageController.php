<?php

namespace App\Http\Controllers\webPage;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class pageController extends Controller
{
    function home(){
        return Inertia::render('web/home');
    }
}
