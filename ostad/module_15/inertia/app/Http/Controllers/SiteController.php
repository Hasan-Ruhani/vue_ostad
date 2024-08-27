<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteController extends Controller
{
    function Index(){
        return Inertia::render('Index');
    }

    function Page1(){

        $share_data = [
            'name' => 'Hasan',
            'age' => 22,
            'city' => 'Khulna'
        ];

        return Inertia::render('Page1', ['data' => $share_data]);
    }

    function Page2(){

        $share_data = [
            'name' => 'Hasan',
            'age' => 22,
            'city' => 'Khulna'
        ];
        return Inertia::render('Page2', ['data' => $share_data]);
    }

    function Page3(){

        $share_data = [
            'name' => 'Hasan',
            'age' => 22,
            'city' => 'Khulna'
        ];

        $data = [
            'status' => 'success',
            'message' => 'data feached successfully',
            'data' => $share_data
        ];

        return Inertia::render('Page3') -> with($data);
    }


    function Page4(){
        return Inertia::render('Page4');
    }

    function PostBackRequest(Request $request){
        $json = $request -> input();

        $data = [
            'status' => 'success',
            'message' => 'from submit successfully',
            'data' => $json
        ];
        return redirect()->route('Index')->with($data);
    }

    function Page5(){
        return Inertia::render('Page5');
    }
}
