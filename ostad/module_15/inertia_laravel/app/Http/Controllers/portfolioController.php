<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Image;
use App\Models\PortfolioDetail;
use App\Models\Solution;
use App\Models\Tag;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class portfolioController extends Controller
{


    public function allPortfolio()
    {
        // Eager load 'solutions', 'tags', and 'images' relationships with 'portfolioDetails'
        // Filter portfolios where both portfolio and category status are active
        $portfolios = PortfolioDetail::with('solutions', 'tags', 'images', 'category')
            ->where('status', 'active')
            ->whereHas('category', function($query) {
                $query->where('status', 'active');
            })
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $portfolios,
        ]);
    }


    
    

    public function portfolioDetail(Request $request)
    {
        $id = $request->id;
        $portfolio = PortfolioDetail::with('images', 'category', 'solutions', 'tags')->find($id);

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio item not found'], 404);
        }

        // Check the status of the PortfolioDetail and its associated Category
        if ($portfolio->status !== 'active' || $portfolio->category->status !== 'active') {
            return response()->json(['message' => 'Portfolio is inactive'], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => $portfolio,
        ]);
    }

    

    public function portfolioBy_category(Request $request)
    {
        $category_id = $request->id;
        $category = Category::find($category_id);

        if (!$category) {
            return response()->json(['message' => 'No category found for this portfolio!'], 404);
        }

        // Check if the category is active
        if ($category->status !== 'active') {
            return response()->json(['message' => 'Category is inactive'], 403);
        }

        $portfolios = PortfolioDetail::where('category_id', $category_id)
            ->where('status', 'active')
            ->with('solutions', 'tags', 'images')
            ->get();

        if ($portfolios->isEmpty()) {
            return response()->json(['message' => 'No active portfolios found for this category'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $portfolios,
        ]);
    }
}
