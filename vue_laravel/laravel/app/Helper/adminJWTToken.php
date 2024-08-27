<?php

namespace App\Helper;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class adminJWTToken
{

    public static function CreateToken($adminEmail):string{
        $key =env('JWT_KEY');
        $payload=[
            'iss'=>'laravel-token',
            'iat'=>time(),
            'exp'=>time()+60*60,
            'userEmail'=>$adminEmail
        ];
       return JWT::encode($payload,$key,'HS256');
    }


    public static function CreateTokenForSetPassword($adminEmail):string{
        $key =env('JWT_KEY');
        $payload=[
            'iss'=>'laravel-token',
            'iat'=>time(),
            'exp'=>time()+60*20,
            'userEmail'=>$adminEmail
        ];
        return JWT::encode($payload,$key,'HS256');
    }



    public static function VerifyToken($admintoken):string|object
    {
        try {
            if($admintoken==null){
                return 'unauthorized';
            }
            else{
                $key =env('JWT_KEY');
                $decode=JWT::decode($admintoken,new Key($key,'HS256'));
                return $decode;
            }
        }
        catch (Exception $e){
            return 'unauthorized';
        }
    }

}
