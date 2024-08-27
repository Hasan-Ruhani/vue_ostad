<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\Review;
use App\Models\SpecificReview;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function createReview(Request $request)
    {
        $user_id = $request->header('id');
        $reviewContent = $request->input('review');

        if ($reviewContent !== null && $reviewContent !== '') {
            $review = Review::create([
                'user_id' => $user_id,
                'review' => $reviewContent,
            ]);

            return $review;
        } else {
            // Handle the case where the review content is null or empty
            return response()->json(['error' => 'Review content cannot be null or empty'], 400);
        }
    }

    public function userReview(Request $request){
        return User::with('review') -> get();
    }

    //.......................................Specific Reviews........................................

    public function createSpcReview(Request $request){
        $profile_id = $request->profile_id;
        $profile = Profile::where('id', $profile_id)->first();
    
        if ($profile) {
            $data = [
                'profile_id' => $profile_id,
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'review' => $request->input('review')
            ];
    
            $review = SpecificReview::create($data);
    
            return $review;
        } else {
            return 'Customer profile not exists';
        }
    }

public function spcUserReview(Request $request){
    $profile_id = $request->id;
    
    $profile = SpecificReview::where('profile_id', $profile_id)->get();

    if ($profile->isEmpty()) {
        return response()->json(['message' => 'No matching records found'], 404);
    }

    return $profile;
    // return User::with('spcReview') -> get();   // all records
}

 
    
    // return User::with('spcReview') -> get();
}
