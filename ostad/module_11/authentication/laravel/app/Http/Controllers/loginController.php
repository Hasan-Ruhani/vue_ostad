<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class loginController extends Controller
{

    public function data(){
        return response() -> json([
            'user' => [
                'id' => 1,
                'name' => 'Admin',
                'role' => 'admin'
            ]
            ]);
    }
    public function login(Request $request){
        $username = $request -> input('username');
        $password = $request -> input('password');

        if($username == 'admin' && $password == 'admin'){
            return response() -> json([
                'user' => [
                    'id' => 1,
                    'name' => 'Admin',
                    'role' => 'admin'
                ]
            ]);
        } elseif($username == 'editor' && $password == 'editor'){
            return response() -> json([
                'user' => [
                    'id' => 2,
                    'name' => 'Editor',
                    'role' => 'editor'
                ]
            ]);
        } elseif($username == 'user' && $password == 'user'){
            return response() -> json([
                'user' => [
                    'id' => 3,
                    'name' => 'User',
                    'role' => 'user'
                ]
            ]);
        } else{
            return response() -> json([
                'error' => 'Invalid username or password'
            ]);
        }
    }
}
