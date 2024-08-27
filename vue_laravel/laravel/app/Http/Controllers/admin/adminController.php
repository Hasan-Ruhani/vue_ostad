<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Helper\ResponseHelper;
use App\Models\AdminProfile;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Validator;

class adminController extends Controller
{
    public function createProfile(Request $request)
    {
        $user_id = $request->header('id');
        $role = $request->header('role');

        // Check if the user's role is 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to create profile',
            ], 403);
        }

        // Check if the user exists
        $user = User::find($user_id);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

        // Check if the profile already exists
        $existingProfile = AdminProfile::where('user_id', $user_id)->first();
        if ($existingProfile) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profile already exists',
            ], 400);
        }

        // Validate and handle image upload
        $request->validate([
            'image' => 'required|file|mimes:jpeg,png,jpg,gif|max:10240', // max 10 MB
        ]);

        $img_url = null;
        if ($request->hasFile('image')) {
            $img = $request->file('image');

            // Upload image to Cloudinary
            $uploadedFileUrl = Cloudinary::upload($img->getRealPath(), [
                'folder' => 'cfs_mirzaovi/Admin_image'
            ])->getSecurePath();

            $img_url = $uploadedFileUrl;
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Image is required',
            ], 400);
        }

        // Create the profile
        $profile = AdminProfile::create([
            'image' => $img_url,
            'user_id' => $user_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Profile created successfully',
            'data' => $profile
        ], 201);
    }



    public function updateProfile(Request $request)
    {
        $user_id = $request->header('id');
        $role = $request->header('role');

        // Check if the role is not 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to update profile',
            ], 403);
        }

        // Check if the user ID matches the logged-in user
        $user = User::find($user_id);
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found or unauthorized',
            ], 403);
        }

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'image' => 'required|file|mimes:jpeg,png,jpg,gif|max:10240', // max 10 MB
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user_id,
            'username' => 'required|string|min:5|unique:users,username,' . $user_id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 400);
        }

        // Handle image upload to Cloudinary
        if ($request->hasFile('image')) {
            $img = $request->file('image');

            // Upload image to Cloudinary
            $uploadedFileUrl = Cloudinary::upload($img->getRealPath(), [
                'folder' => 'cfs_mirzaovi/Admin_image'
            ])->getSecurePath();

            // Update the profile with the new image URL
            AdminProfile::where('user_id', $user_id)->update([
                'image' => $uploadedFileUrl,
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Image is required',
            ], 400);
        }

        // Update user information
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'username' => $request->input('username'),
        ]);

        $profile = AdminProfile::where('user_id', $user_id)->first();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => $profile,
        ], 200);
    }



    public function adminProfile(Request $request)
{
    // Validate headers
    $user_id = $request->header('id');
    $role = $request->header('role');

    if (!$user_id || !$role) {
        return response()->json([
            'status' => 'error',
            'message' => 'Missing required headers',
        ], 400);
    }

    try {
        // Find the user by ID
        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

        // Check if the user is an admin and trying to access their own profile
        if ($role === 'admin65' && $user->role === 'admin65') {
            // Fetch the admin profile, which could be null
            $profile = AdminProfile::where('user_id', $user_id)->first();

            // Combine user information and profile
            $data = [
                'user' => $user,
                'profile' => $profile,
            ];

            // Return the combined information
            return response()->json([
                'status' => 'success',
                'message' => 'Profile retrieved successfully',
                'data' => $data,
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to access profile',
            ], 403);
        }
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'An error occurred while processing your request',
            'error' => $e->getMessage(),
        ], 500);
    }
}









    public function admnList(Request $request): JsonResponse
    {
        // Retrieve user ID and role from headers
        $requester_id = $request->header('id');
        $requester_role = $request->header('role');

        // Check if the role is 'admin65'
        if ($requester_role !== 'admin65') {
            return ResponseHelper::Out('error', 'Unauthorized to view user list', 403);
        }

        // Check if the user with the provided ID and role exists
        $requester_user = User::where('id', $requester_id)
                            ->where('role', 'admin65')
                            ->first();

        if (!$requester_user) {
            return ResponseHelper::Out('error', 'Unauthorized to view user list', 403);
        }

        // Fetch active users with the role 'admin65' along with their AdminProfile
        $data = User::where('status', 'active')
                    ->where('role', 'admin65')
                    ->with('adminProfile') // Assuming there is a relation defined in the User model
                    ->get();

        return ResponseHelper::Out('success', $data, 200);
    }

}
