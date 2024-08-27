<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Image;
use App\Models\PortfolioDetail;
use App\Models\Solution;
use App\Models\Tag;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class portfolioController extends Controller
{
    public function createPortfolio_item(Request $request)
    {
        // Fetch user ID and role from request headers
        $role = $request->header('role');

        // Check if the role is admin65
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only admins can create portfolio items.',
            ], 403);
        }

        $category_id = $request->id;
        $category = Category::find($category_id);

        if (!$category) {
            return response()->json(['message' => 'Please insert a valid category first'], 400);
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            'head_line' => 'required|string|max:255',
            'description' => 'required|string',
            'client' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'project_url' => 'required|url',
            'problem' => 'nullable|string|max:255',
            'result' => 'nullable|string|max:255',
            'solutions' => 'nullable|array',
            'solutions.*' => 'string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'file|mimes:jpeg,png,jpg,gif,svg|max:20480'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create the portfolio record
        $portfolio = PortfolioDetail::create([
            'category_id' => $category->id,
            'head_line' => $request->input('head_line'),
            'duration' => $request->input('duration'),
            'description' => $request->input('description'),
            'client' => $request->input('client'),
            'problem' => $request->input('problem'),
            'result' => $request->input('result'),
            'project_url' => $request->input('project_url')
        ]);

        // Handle solutions
        $solutions = $request->input('solutions');
        if ($solutions !== null) {
            foreach ($solutions as $solutionName) {
                $solution = Solution::firstOrCreate(['name' => $solutionName]);
                $portfolio->solutions()->attach($solution->id);
            }
        }

        // Handle tags
        $tags = $request->input('tags');
        if ($tags !== null) {
            foreach ($tags as $tagName) {
                $tag = Tag::firstOrCreate(['name' => $tagName]);
                $portfolio->tags()->attach($tag->id);
            }
        }

        // Handle images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                // Upload each image to Cloudinary
                $uploadedImageUrl = Cloudinary::upload($file->getRealPath(), [
                    'folder' => 'cfs_mirzaovi/portfolio_images'
                ])->getSecurePath();

                Image::create([
                    'portfolio_id' => $portfolio->id,
                    'filename' => $uploadedImageUrl
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Portfolio item created successfully',
            'data' => $portfolio->load('solutions', 'tags', 'images')
        ], 201);
    }

    
    

    public function updatePortfolio_item(Request $request)
    {
        // Fetch user ID and role from request headers
        $user_id = $request->header('id');
        $role = $request->header('role');

        // Check if the role is admin65
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only admins can update portfolio items.',
            ], 403);
        }

        // Fetch portfolio ID from request
        $portfolio_id = $request->id;
        $portfolio = PortfolioDetail::find($portfolio_id);

        // Check if portfolio exists
        if (!$portfolio) {
            return response()->json([
                'status' => 'error',
                'message' => 'Portfolio item not found for the provided ID.',
            ], 404);
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id', // Ensure category_id exists in categories table
            'head_line' => 'required|string|max:255',
            'description' => 'required|string',
            'client' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'project_url' => 'required|url',
            'problem' => 'nullable|string|max:255',
            'result' => 'nullable|string|max:255',
            'solutions' => 'nullable|array',
            'solutions.*' => 'string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:255',
            'images' => 'nullable|array',
            'images.*' => 'file|mimes:jpeg,png,jpg,gif,svg|max:50000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Fetch category by ID
        $category_id = $request->input('category_id');
        $category = Category::find($category_id);

        // Check if category exists
        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found for the provided ID.',
            ], 404);
        }

        // Update portfolio details
        $portfolio->update([
            'category_id' => $category->id,
            'head_line' => $request->input('head_line'),
            'description' => $request->input('description'),
            'client' => $request->input('client'),
            'duration' => $request->input('duration'),
            'project_url' => $request->input('project_url'),
            'problem' => $request->input('problem'),
            'result' => $request->input('result'),
        ]);

        // Handle solutions
        $solutions = $request->input('solutions');
        if ($solutions !== null) {
            // Detach current solutions
            $portfolio->solutions()->detach();
            // Attach new solutions
            foreach ($solutions as $solutionName) {
                $solution = Solution::firstOrCreate(['name' => $solutionName]);
                $portfolio->solutions()->attach($solution->id);
            }
        }

        // Handle tags
        $tags = $request->input('tags');
        if ($tags !== null) {
            // Detach current tags
            $portfolio->tags()->detach();
            // Attach new tags
            foreach ($tags as $tagName) {
                $tag = Tag::firstOrCreate(['name' => $tagName]);
                $portfolio->tags()->attach($tag->id);
            }
        }

        // Handle images
        if ($request->hasFile('images')) {
            // Detach and delete current images from Cloudinary and database
            $currentImages = $portfolio->images;
            foreach ($currentImages as $currentImage) {
                Cloudinary::destroy($currentImage->filename); // Remove from Cloudinary
                $currentImage->delete(); // Remove from database
            }

            // Upload new images to Cloudinary and save to database
            foreach ($request->file('images') as $file) {
                $uploadedImageUrl = Cloudinary::upload($file->getRealPath(), [
                    'folder' => 'cfs_mirzaovi/portfolio_images'
                ])->getSecurePath();

                Image::create([
                    'portfolio_id' => $portfolio->id,
                    'filename' => $uploadedImageUrl
                ]);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Portfolio item updated successfully',
            'data' => $portfolio->load('images', 'solutions', 'tags')
        ], 200);
    }



    public function allPortfolio(Request $request)
    {
        // Get the role from the request header
        $role = $request->header('role');

        // Check if the role is not 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only admin access to the portfolio list',
            ], 403);
        }

        $portfolios = PortfolioDetail::with('category', 'images')->get();

        return response()->json([
            'status' => 'success',
            'data' => $portfolios,
        ]);
    }




    public function portfolioDetail(Request $request)
    {
        // Get the role from the request header
        $role = $request->header('role');

        // Check if the role is not 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only admin access to portfolio details',
            ], 403);
        }

        $id = $request->id;
        $portfolio = PortfolioDetail::with('category', 'images', 'solutions', 'tags')->find($id);

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio item not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $portfolio,
        ]);
    }


    public function updateStatus(Request $request, $portfolio_id): JsonResponse
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

        // Find the portfolio by ID
        $portfolio = PortfolioDetail::find($portfolio_id);

        // Check if portfolio exists
        if (!$portfolio) {
            return response()->json([
                'status' => 'error',
                'message' => 'Portfolio not found',
            ], 404);
        }


        // Update the portfolio's status
        $portfolio->status = $request->input('status');
        $portfolio->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Category status updated successfully',
            'data' => $portfolio,
        ], 200);
    }


    

    public function portfolioBy_category(Request $request)
    {
        // Get the role from the request header
        $role = $request->header('role');

        // Check if the role is not 'admin65'
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only admin access to portfolios by category',
            ], 403);
        }

        $category_id = $request->id;
        $category = Category::find($category_id);

        if (!$category) {
            return response()->json(['message' => 'No category found for this portfolio!'], 404);
        }

        $portfolios = PortfolioDetail::where('category_id', $category_id)
            ->with('images', 'solutions', 'tags')
            ->get();

        if ($portfolios->isEmpty()) {
            return response()->json(['message' => 'No portfolios found for this category'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $portfolios,
        ]);
    }




    public function deletePortfolio(Request $request)
    {
        // Fetch user ID and role from request headers
        $user_id = $request->header('id');
        $role = $request->header('role');

        // Check if the role is admin65
        if ($role !== 'admin65') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Only admins can delete portfolio items.',
            ], 403);
        }

        $portfolio_id = $request->id;
        $portfolio = PortfolioDetail::find($portfolio_id);

        if (!$portfolio) {
            return response()->json([
                'status' => 'error',
                'message' => 'No portfolio found for this ID.',
            ], 404);
        }

        try {
            // Attempt to delete the portfolio
            $deleted = PortfolioDetail::where('id', $portfolio_id)->delete();

            if ($deleted) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Portfolio deleted successfully.',
                    'data' => $portfolio
                ], 200);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Failed to delete portfolio.',
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting portfolio.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
