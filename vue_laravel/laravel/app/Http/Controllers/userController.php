<?php

namespace App\Http\Controllers;

use App\Helper\JWTToken;
use App\Mail\OTPMail;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;


class userController extends Controller
{
    
    public function userRegistration(Request $request)
    {
        // Define validation rules
        $rules = [
            'name' => 'required|string|max:20',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:6',
        ];

        // Define custom error messages
        $messages = [
            'email.unique' => 'This email already exists, please try with another email.',
            'password.min' => 'Password must be at least 6 characters.',
        ];

        // Validate request inputs with custom messages
        try {
            $request->validate($rules, $messages);

            // Generate a unique username
            $name = $request->input('name');
            $username = $this->generateUniqueUsername($name);

            // Create user with default role 'user'
            $user = User::create([
                'name' => $name,
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')), // Hash the password
                'role' => 'user',
                'username' => $username,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'User Registration Successful'
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return custom error message for validation failures
            $errors = $e->errors();
            return response()->json([
                'status' => 'failed',
                'message' => $errors['email'][0] ?? ($errors['password'][0] ?? 'Registration failed')
            ], 400);
        } catch (Exception $e) {
            // Return generic error message for other exceptions
            return response()->json([
                'status' => 'failed',
                'message' => 'Registration failed'
            ], 500);
        }
    }

    private function generateUniqueUsername($name)
    {
        $baseUsername = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $name)); // Remove non-alphanumeric characters
        if (strlen($baseUsername) < 5) {
            $baseUsername .= substr(str_shuffle('0123456789'), 0, 5 - strlen($baseUsername)); // Ensure minimum length of 5
        }

        $username = $baseUsername;
        $counter = 1;

        while (User::where('username', $username)->exists()) {
            $username = $baseUsername . $counter;
            $counter++;
        }

        return $username;
    }

    

    public function userLogin(Request $request)
    {
        $login = $request->input('login'); // Either email or username
        $password = $request->input('password');
        
        // Attempt to find user by email or username
        $user = User::where('email', $login)->orWhere('username', $login)->first();

        // Check if user exists and the provided password matches the hashed password in the database
        if ($user && Hash::check($password, $user->password)) {
            // User Login -> JWT Token Issue
            $token = JWTToken::CreateToken($user->email, $user->id, $user->username);  // Include username in the token

            return response()->json([
                'status' => 'success',
                'message' => 'User Login Successful',
                'role' => $user->role,
                'token' => $token,
            ], 200)->cookie('token', $token, 60 * 24 * 30, '/', null, true, true, false, 'None');
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Unauthorized'
            ], 401); // Return 401 Unauthorized for incorrect credentials
        }
    }
    // cookie('token', $token, 60 * 24 * 30, '/', null, true, true, false, 'None');
    // ('token', $token, 5/60, '/', null, true, true, false, 'None');

    public function checkTokenValidity(Request $request)   // this function for check token validatoin in frontend
    {
        // Retrieve the token from the request cookie
        $token = $request->cookie('token');

        // Check if the token is provided
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Token not provided',
            ], 401);
        }

        // Verify the token using the JWTToken helper
        $result = JWTToken::VerifyToken($token);

        if ($result === 'unauthorized') {
            return response()->json([
                'status' => 'error',
                'message' => 'Token is invalid or has expired',
            ], 401);
        }

        // If the token is valid, return a success response
        return response()->json([
            'status' => 'success',
            'message' => 'Token is valid',
            'data' => $result, // You can return the decoded token data if needed
        ], 200);
    }


    function sendOTPCode(Request $request){

        $email = $request -> input('email');
        $otp = rand(100000,999999);
        $count = User::where('email','=',$email) -> count();

        if($count==1){
            // OTP Email Address
            Mail::to($email) -> send(new OTPMail($otp));
            // OTO Code Table Update
            User::where('email','=',$email) -> update(['otp' => $otp]);

            return response() -> json([
                'status' => 'success',
                'message' => '4 Digit OTP Code has been send to your email !'
            ],200);
        }
        else{
            return response()->json([
                'status' => 'failed',
                'message' => 'unauthorized'
            ]);
        }
    }

    function verifyOTP(Request $request){
        $email = $request -> input('email');
        $otp = $request -> input('otp');
        $count = User::where('email','=',$email)
            ->where('otp','=',$otp) -> count();

        if($count==1){
            // Database OTP Update
            User::where('email','=',$email) -> update(['otp'=>'0']);

            // Pass Reset Token Issue
            $token = JWTToken::CreateTokenForSetPassword($request -> input('email'));
            return response() -> json([
                'status' => 'success',
                'message' => 'OTP Verification Successful',
            ],200) -> cookie('token',$token,60*24*30);

        }
        else{
            return response()->json([
                'status' => 'failed',
                'message' => 'unauthorized'
            ],200);
        }
    }

    function resetPassword(Request $request){
        try{
            $email = $request -> header('email');
            $password = $request -> input('password');
            $confirm_password = $request -> input('confirm_password');
            User::where('email','=',$email) -> update(['password'=>$password, 'confirm_password'=>$confirm_password]);
            return response()->json([
                'status' => 'success',
                'message' => 'Request Successful',
            ],200);

        }catch (Exception $exception){
            return response() -> json([
                'status' => 'fail',
                'message' => 'Something Went Wrong',
            ],200);
        }
    }

    function userLogout() {
        return response()->json([
            'status' => 'success',
            'message' => 'Logout successfully'
        ], 200)->cookie('token', '', -1);
    }

    // function userLogout(){
    //     return redirect('/') -> cookie('token', '', -1);
    // }

    // function userLogout() {
    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Logout successfully'
    //     ], 200)->cookie('token', '', -1, null, null, false, true, 'Lax'); // Set 'SameSite' to 'None'
    // }
    
    
}


