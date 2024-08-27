<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class categoryController extends Controller
{
    public function createCategory(Request $request)
    {
        $role = $request->header('role');

        // Check if the role is admin65
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only admins can create categories.',
            ], 403);
        }

        // Check if the category already exists
        $category = Category::where('name', $request->input('category'))->first();
        if ($category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category already exists',
            ], 409);
        }

        // Create a new category
        try {
            $newCategory = Category::create([
                'name' => $request->input('category'),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Category created successfully',
                'data' => $newCategory,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    
    public function updateCategory(Request $request)
    {
        // Fetch user ID and role from request headers
        $role = $request->header('role');

        // Check if the role is admin65
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only admins can edit categories.',
            ], 403);
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Update the category
        try {
            $category_id = $request->id; // Get the category ID
            $category = Category::find($category_id);

            if (!$category) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Category item not found for the provided ID.',
                ], 404);
            }

            $new_category = $request->input('name'); // Get the new category

            $category->update([
                'name' => $new_category,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Category updated successfully',
                'data' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    public function allCategory(Request $request)
    {
        // Get the role from the request header
        $role = $request->header('role');
    
        // Check if the role is not 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only admin can access the categories',
            ], 403);
        }
    
        // Retrieve all categories
        $categories = Category::all();
    
        return response()->json([
            'status' => 'success',
            'data' => $categories->toArray(),
        ]);
    }



    public function updateStatus(Request $request, $category_id): JsonResponse
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

        // Find the category by ID
        $category= Category::find($category_id);

        // Check if category exists
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found',
            ], 404);
        }


        // Update the Categoryes status
        $category->status = $request->input('status');
        $category->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Category status updated successfully',
            'data' => $category,
        ], 200);
    }




    public function deleteCategory(Request $request)
    {
        $role = $request->header('role');
    
        // Check if the role is admin65
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only admins can delete categories.',
            ], 403);
        }
    
        // Delete the category
        try {
            $category_id = $request->id;
            $category = Category::find($category_id);
    
            if (!$category) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Category not found for this ID',
                ], 404);
            }
    
            $category->delete();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Category deleted successfully',
                'data' => $category
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
