<?php

use App\Http\Controllers\admin\adminController;
use App\Http\Controllers\admin\categoryController as AdminCategoryController;
use App\Http\Controllers\admin\portfolioController as AdminPortfolioController;
use App\Http\Controllers\admin\teamController as AdminTeamController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\contactController;
use App\Http\Controllers\portfolioController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\teamController;
use App\Http\Controllers\userController;
use App\Http\Middleware\TokenVerificationMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/token',[userController::class,'checkTokenValidity']);

    // Web API Routes
    Route::post('/user-registration',[userController::class,'userRegistration']);
    Route::post('/user-login',[userController::class,'userLogin']);
    Route::post('/send-otp',[userController::class,'sendOTPCode']);
    Route::post('/verify-otp',[userController::class,'verifyOTP']);
    Route::post('/reset-password',[userController::class,'resetPassword'])->middleware([TokenVerificationMiddleware::class]);

    // User/Admin Logout
    Route::get('/user-logout',[userController::class,'userLogout']);   // pull for test


    // Route::get('/portfolio_dash',[portfolioController::class,'portfolio_dash']);
    Route::post('/file-upload',[portfolioController::class,'image'])->middleware([TokenVerificationMiddleware::class]);

    // category
    Route::get('/allCategory', [categoryController::class, 'allCategory']);

    // Admin category
    Route::post('/createCategory', [AdminCategoryController::class, 'createCategory'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/admin/allCategory', [AdminCategoryController::class, 'allCategory'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/update-category/{id}', [AdminCategoryController::class, 'updateCategory'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/category/status/{category_id}', [AdminCategoryController::class, 'updateStatus'])->middleware([TokenVerificationMiddleware::class]);
    Route::delete('/deleteCategory/{id}', [AdminCategoryController::class, 'deleteCategory'])->middleware([TokenVerificationMiddleware::class]);


    // Admin portfolio backend
    Route::post('/admin/portfolioItem/{id}', [AdminPortfolioController::class, 'createPortfolio_item'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/admin/portfolioDetail/{id}', [AdminPortfolioController::class, 'portfolioDetail'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/admin/portfolioItem_update/{id}', [AdminPortfolioController::class, 'updatePortfolio_item'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/admin/portfolioBy_category/{id}', [AdminPortfolioController::class, 'portfolioBy_category'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/admin/allPortfolio', [AdminPortfolioController::class, 'allPortfolio'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/portfolio/status/{portfolio_id}', [AdminPortfolioController::class, 'updateStatus'])->middleware([TokenVerificationMiddleware::class]);
    Route::delete('/deletePortfolio/{id}', [AdminPortfolioController::class, 'deletePortfolio'])->middleware([TokenVerificationMiddleware::class]);

    // portfolio backend
    Route::get('/portfolioDetail/{id}', [portfolioController::class, 'portfolioDetail']);
    Route::get('/portfolioBy_category/{id}', [portfolioController::class, 'portfolioBy_category']);
    Route::get('/allPortfolio', [portfolioController::class, 'allPortfolio']);

    // team
    Route::post('/createProfile', [teamController::class, 'createProfile'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/user-profile',[teamController::class,'userProfile'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/updateProfile', [teamController::class, 'updateProfile'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/userList', [teamController::class, 'userList']);
    Route::get('/profileDetail/{username}', [teamController::class, 'profileDetail']);
    Route::delete('/deleteProfile', [teamController::class, 'deleteProfile'])->middleware([TokenVerificationMiddleware::class]);

    //admin team
    Route::post('/admin/createProfile/{user_id}', [AdminTeamController::class, 'createProfile'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/admin/updateProfile/{user_id}', [AdminTeamController::class, 'updateProfile'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/admin/userList', [AdminTeamController::class, 'userList'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/admin/profileDetail/{user_id}', [AdminTeamController::class, 'profileDetail'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/admin/status/{user_id}', [AdminTeamController::class, 'updateStatus'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/admin/changePassword/{user_id}', [AdminTeamController::class, 'change_userPassword'])->middleware([TokenVerificationMiddleware::class]);
    Route::delete('/admin/deleteProfile/{user_id}', [AdminTeamController::class, 'deleteProfile'])->middleware([TokenVerificationMiddleware::class]);

    // Admin
    Route::post('/admin-createProfile', [adminController::class, 'createProfile'])->middleware([TokenVerificationMiddleware::class]);
    Route::post('/admin-updateProfile', [adminController::class, 'updateProfile'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/admin-me', [adminController::class, 'adminProfile'])->middleware([TokenVerificationMiddleware::class]);
    Route::get('/adminList', [adminController::class, 'admnList'])->middleware([TokenVerificationMiddleware::class]);

    // specific review
    Route::post('/createSpcReview/{profile_id}', [ReviewController::class, 'createSpcReview']);
    Route::get('/spcUserReview/{id}', [reviewController::class, 'spcUserReview']);

    // specific contact
    Route::post('/createSpcContact/{id}', [contactController::class, 'createSpcContact']);
    Route::get('/spcUserContact', [contactController::class, 'spcUserContact'])->middleware([TokenVerificationMiddleware::class]);


    
    // all contact 
    Route::post('/contact', [contactController::class, 'allContact']);
    
    
    
    
    
  



