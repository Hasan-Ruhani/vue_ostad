<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Helper\ResponseHelper;
use App\Models\Skill;
use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class teamController extends Controller
{

    public function createProfile(Request $request, $user_id)
    {
        $role = $request->header('role');

        // Check if the role from the request header is not 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to create a profile',
            ], 403);
        }

        // Retrieve the user from the database
        $user = User::find($user_id);

        // Check if the user's role is 'admin65'
        if ($user && $user->role === 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile not created for this user',
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
        $profileData['facebook'] = $request->input('facebook', '');
        $profileData['github'] = $request->input('github', '');
        $profileData['linkedin'] = $request->input('linkedin', '');
        $profileData['leetcode'] = $request->input('leetcode', '');
        $profileData['guideline'] = $request->input('guideline', '');

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




    public function updateProfile(Request $request, $user_id)
    {
        $role = $request->header('role');

        // Check if the role from the request header is not 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 403);
        }

        // Retrieve the user from the database
        $user = User::find($user_id);

        // Check if the user's role is 'admin65'
        if ($user && $user->role === 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile not updated for this user',
            ], 403);
        }

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
            'facebook' => 'nullable|string|max:500',
            'github' => 'nullable|string|max:500',
            'linkedin' => 'nullable|string|max:500',
            'leetcode' => 'nullable|string|max:500',
            'guideline' => 'nullable|string|max:500',
            'skills' => 'nullable|array',
            'skills.*' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user_id,
            'username' => 'required|string|min:5|unique:users,username,' . $user_id, // Ensure username is unique and at least 5 characters long
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




    public function profileDetail(Request $request): JsonResponse
    {
        $role = $request->header('role');

        // Check if role is not 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 403);
        }

        // Retrieve the user from the database
        $user = User::find($request->user_id);

        // Check if the user exists and the user's role is 'admin65'
        if ($user && $user->role === 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only Admn acces this profile.',
            ], 403);
        }

        // Check if the user or the user's profile does not exist
        if (!$user || !$user->profile) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile not found',
            ], 404);
        }

        $data = User::where('id', $request->user_id)
                    ->with('profile.skills')
                    ->get();

        return ResponseHelper::Out('success', $data, 200);
    }




    public function userList(Request $request): JsonResponse
    {
        $role = $request->header('role');

        // Check if the requester is an admin
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 403);
        }

        // Fetch all users with their profiles
        $data = User::where('role', '!=', 'admin65')->with('profile.skills')->get();

        return ResponseHelper::Out('success', $data, 200);
    }

    public function updateStatus(Request $request, $user_id): JsonResponse
    {
        $role = $request->header('role');

        // Check if the requester is an admin
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 403);
        }

        // Validate the request
        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        // Find the user by ID
        $user = User::find($user_id);

        // Check if user exists
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

        // Check if the user's role is 'admin65'
        if ($user->role === 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Status not change for this user',
            ], 403);
        }

        // Update the user's status
        $user->status = $request->input('status');
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User status updated successfully',
            'data' => $user,
        ], 200);
    }

    // push for test


    public function change_userPassword(Request $request, $user_id)
    {
        $request->validate([
            'new_password' => 'required|string|min:6',
        ]);

        // Check if the requester is an admin
        $role = $request->header('role');
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 403);
        }

        // Retrieve the user by ID from route parameter
        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

        // Check if the user's role is admin65
        if ($user->role === 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Password not change for this user',
            ], 403);
        }

        // Hash the new password using bcrypt
        $new_password = bcrypt($request->input('new_password'));

        // Update the user's password in the database
        $user->password = $new_password;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Password updated successfully',
        ], 200);
    }

    
    
    


    

    public function deleteProfile(Request $request)
    {
        $role = $request->header('role');
        $userId = $request->user_id; // Admin provides user ID in the request

        // Check if the role is admin65
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 403);
        }

        // Retrieve the profile associated with the provided user ID
        $profile = Profile::where('user_id', $userId)->first();

        if (!$profile) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile not found',
            ], 404);
        }

        // Check if the user associated with the profile is 'admin65'
        $user = User::find($userId);
        if ($user && $user->role === 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile not delete for this user',
            ], 403);
        }

        // Delete the associated file if the file path is provided
        if ($profile->image) {
            File::delete(public_path($profile->image));
        }

        // Delete the profile
        $profile->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile deleted successfully',
            'data' => $profile
        ], 200);
    }



}
