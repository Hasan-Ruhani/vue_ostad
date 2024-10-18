<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class categoryController extends Controller
{
    public function allCategory()
    {
        // Retrieve only categories with an active status
        $activeCategories = Category::where('status', 'active')->get();

        return response()->json([
            'status' => 'success',
            'data' => $activeCategories->toArray(),
        ]);
    }

}
