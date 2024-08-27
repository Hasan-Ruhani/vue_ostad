<?php

namespace App\Http\Controllers;

use App\Helper\ResponseHelper;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\File;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class teamController extends Controller
{

    public function createProfile(Request $request)
    {
        $user_id = $request->header('id');
        $role = $request->header('role');

        // Check if role is not 'user'
        if ($role !== 'user') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to create a profile',
            ], 403);
        }

        // Check if a profile already exists for the given user_id
        $existingProfile = Profile::where('user_id', $user_id)->first();

        if ($existingProfile) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile already exists',
            ], 400);
        }

        // Validation rules
        $validator = Validator::make($request->all(), [
            'designation' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:20480', // Max 20MB
            'facebook' => 'nullable|string|max:500',
            'github' => 'nullable|string|max:500',
            'linkedin' => 'nullable|string|max:500',
            'leetcode' => 'nullable|string|max:500',
            'guideline' => 'nullable|string',
            'skills' => 'nullable|array',
            'skills.*' => 'nullable|string|max:255',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()->all(),
            ], 422);
        }

        $img_url = null;
        $img = $request->file('image');
        if ($img) {
            // Upload image to Cloudinary
            $uploadedFileUrl = Cloudinary::upload($img->getRealPath(), [
                'folder' => 'cfs_mirzaovi/profile_image'
            ])->getSecurePath();
            
            $img_url = $uploadedFileUrl;
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Image is required',
            ], 400);
        }

        $profileData = [
            'designation' => $request->input('designation'),
            'description' => $request->input('description'),
            'image' => $img_url,
            'user_id' => $user_id,
        ];

        // Handle optional nullable fields
        if ($request->filled('facebook')) {
            $profileData['facebook'] = $request->input('facebook');
        }
        if ($request->filled('github')) {
            $profileData['github'] = $request->input('github');
        }
        if ($request->filled('linkedin')) {
            $profileData['linkedin'] = $request->input('linkedin');
        }
        if ($request->filled('leetcode')) {
            $profileData['leetcode'] = $request->input('leetcode');
        }
        if ($request->filled('guideline')) {
            $profileData['guideline'] = $request->input('guideline');
        }

        $profile = Profile::create($profileData);

        $skills = $request->input('skills');
        if ($skills) {
            foreach ($skills as $skillName) {
                $skill = Skill::firstOrCreate(['name' => $skillName]);
                $profile->skills()->attach($skill->id);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Profile created successfully',
            'data' => $profile->load('skills')
        ], 201);
    }


    public function updateProfile(Request $request)
    {
        $user_id = $request->header('id');
        $role = $request->header('role');

        // Check if the user's role is 'user'
        if ($role !== 'user') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to update profile',
            ], 403);
        }

        $user = User::find($user_id);
        if (!$user || !$user->profile) {
            return response()->json([
                'status' => 'error',
                'message' => 'User or profile not found',
            ], 404);
        }

        $profile_id = $user->profile->id;

        // Validation rules
        $validator = Validator::make($request->all(), [
            'designation' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20480', // Max 20MB
            'email' => 'required|email|unique:users,email,' . $user_id, // Ensure email is unique for the current user
            'username' => 'required|string|min:5|unique:users,username,' . $user_id, // Ensure username is unique and at least 5 characters long
            'facebook' => 'nullable|string|max:500',
            'github' => 'nullable|string|max:500',
            'linkedin' => 'nullable|string|max:500',
            'leetcode' => 'nullable|string|max:500',
            'guideline' => 'nullable|string|max:500',
            'skills' => 'nullable|array',
            'skills.*' => 'nullable|string|max:255',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()->all(),
            ], 422);
        }

        $img_url = $user->profile->image; // Keep existing image if no new image is provided

        if ($request->hasFile('image')) {
            $img = $request->file('image');

            // Upload image to Cloudinary
            $uploadedFileUrl = Cloudinary::upload($img->getRealPath(), [
                'folder' => 'cfs_mirzaovi/profile_image'
            ])->getSecurePath();
            
            $img_url = $uploadedFileUrl;

            // Optionally delete the old image from Cloudinary if necessary
            Cloudinary::destroy($user->profile->image);
        }

        // Update profile data
        $profileData = [
            'designation' => $request->input('designation'),
            'description' => $request->input('description'),
            'image' => $img_url,
            'facebook' => $request->input('facebook', ''),
            'github' => $request->input('github', ''),
            'linkedin' => $request->input('linkedin', ''),
            'leetcode' => $request->input('leetcode', ''),
            'guideline' => $request->input('guideline', ''),
        ];

        Profile::where('id', $profile_id)->update($profileData);

        // Update user data
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'username' => $request->input('username'), // Update the username
        ]);

        // Update skills
        $profile = Profile::find($profile_id);
        $profile->skills()->detach();

        $skills = $request->input('skills');
        if ($skills) {
            foreach ($skills as $skillName) {
                $skill = Skill::firstOrCreate(['name' => $skillName]);
                $profile->skills()->attach($skill->id);
            }
        }

        // Load the updated user and profile data with skills
        $updatedUser = User::with(['profile.skills'])->find($user_id);

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => $updatedUser,
        ], 200);
    }


    


    public function userProfile(Request $request)
    {
        $user_id = $request->header('id');
        $role = $request->header('role');

        // Check if the role is admin65
        if ($role === 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to access profile',
            ], 403);
        }

        // Find the user by ID
        $user = User::where('id', $user_id)->first();

        // Check if the user exists
        if ($user) {
            $profile = $user->load('profile'); // Load the profile relationship
            return response()->json([
                'status' => 'success',
                'message' => 'Request Successful',
                'data' => $profile
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }
    }

    

    public function profileDetail(Request $request): JsonResponse
    {
        // Get the username from the request input
        $username = $request->username;

        // Retrieve the user by username
        $user = User::where('username', $username)->first();

        // Check if the user exists
        if (!$user) {
            return ResponseHelper::Out('error', 'User not found', 404);
        }

        // Check if the user's role is 'admin65'
        if ($user->role === 'admin65') {
            return ResponseHelper::Out('error', 'Unauthorized to view profile', 403);
        }

        // Check if the user is active
        if ($user->status !== 'active') {
            return ResponseHelper::Out('error', 'User is not active', 403);
        }

        // Check if the user has a profile
        if (!$user->profile) {
            return ResponseHelper::Out('error', 'Profile not found', 404);
        }

        // Fetch user data with profile and skills
        $data = User::where('username', $username)->with('profile.skills')->first();

        return ResponseHelper::Out('success', $data, 200);
    }






    public function userList(): JsonResponse
    {
        // Fetch active users excluding those with the role 'admin65' and who have a profile
        $data = User::where('status', 'active')
                    ->where('role', '!=', 'admin65')
                    ->whereHas('profile')
                    ->with('profile.skills')
                    ->get();

        return ResponseHelper::Out('success', $data, 200);
    }

    



    
    
    public function deleteProfile(Request $request)
    {
        $user_id = $request->header('id');
        $role = $request->header('role');

        // Check if the user's role is 'admin65'
        if ($role === 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to delete profile',
            ], 403);
        }

        // Find the user's profile
        $profile = Profile::where('user_id', $user_id)->first();

        if (!$profile) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile not found',
            ], 404);
        }

        // Ensure the file path exists and delete if present
        $filePath = $profile->file_path; // Assuming 'file_path' is a column in the 'profiles' table

        if ($filePath && File::exists($filePath)) {
            File::delete($filePath);
        }

        // Delete the profile
        $profile->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile deleted successfully',
        ], 200);
    }


    
}

