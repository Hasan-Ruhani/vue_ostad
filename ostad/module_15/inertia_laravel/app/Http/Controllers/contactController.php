<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Profile;
use App\Models\SpecificContact;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class contactController extends Controller
{


    // public function createSpcContact(Request $request){

    //     $user_id = $request -> header('id');
    //     $user = User::where('id', $user_id) -> first();
    //     $profile_id = $user->profile->id;

    //     return $profile_id;
    // }

    public function createSpcContact(Request $request)
    {
        $profile_id = $request->id;
        $profile = Profile::where('id', $profile_id)->first();

        if (!$profile) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile not found',
            ], 404);
        }

        $user_Email = $profile->user->email;

        // Define validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
            'skype' => 'nullable|string|max:50',
            'message' => 'required|string',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()->all(),
            ], 422);
        }

        // Create data array from validated inputs
        $data = [
            'profile_id' => $profile_id,
            'user_email' => $user_Email,
            'client_name' => $request->input('name'),
            'client_email' => $request->input('email'),
            'whatsapp' => $request->input('whatsapp'),
            'skype' => $request->input('skype'),
            'message' => $request->input('message'),
        ];

        // Create SpecificContact record
        $contact = SpecificContact::create($data);

        // Send email if contact creation is successful
        if ($contact) {
            Mail::to($user_Email)->send(new contactMail($data));
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Email sent sucessfully',
        ], 201);
    }



    public function allContact(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
            'skype' => 'nullable|string|max:50',
            'message' => 'required|string',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()->all(),
            ], 422);
        }

        // Retrieve emails for users with role 'user', status 'active' and have a profile
        $userEmails = User::where('role', 'user')
            ->where('status', 'active')
            ->whereHas('profile')
            ->pluck('email')
            ->all();

        // Retrieve emails for users with role 'admin65'
        $adminEmails = User::where('role', 'admin65')
            ->pluck('email')
            ->all();

        // Combine both email lists
        $emails = array_merge($userEmails, $adminEmails);

        $data = [
            'client_name' => $request->input('name'),
            'client_email' => $request->input('email'),
            'whatsapp' => $request->input('whatsapp'),
            'skype' => $request->input('skype'),
            'message' => $request->input('message'),
        ];

        // Create Contact record
        $contact = Contact::create($data);

        // Check if contact creation was successful
        if ($contact) {
            try {
                // Send email to all collected emails
                foreach ($emails as $email) {
                    Mail::to($email)->send(new contactMail($data));
                }
                return response()->json([
                    'status' => 'success',
                    'message' => 'Email sent successfully'
                ], 200);
            } catch (\Exception $e) {
                // Handle email sending failure
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to send email. ' . $e->getMessage()
                ], 500);
            }
        } else {
            // Handle contact creation failure
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create contact record'
            ], 500);
        }
    }


    

    



    public function spcUserContact(Request $request) {
        $user_id = $request->header('id');
        $user = User::find($user_id);
    
        if ($user) {
            $profile_id = $user->profile->id;
            return Profile::where('id', $profile_id)->with('spcContact')->get();
        } else {
            return 'No contact found for the user.';
        }
    }
    
}
