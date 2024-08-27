<?php

use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;


Route::get('/', [SiteController::class, 'Index']) -> name('Index');
Route::get('/Page1', [SiteController::class, 'Page1']) -> name('Page1');
Route::get('/Page2', [SiteController::class, 'Page2']) -> name('Page2');
Route::get('/Page3', [SiteController::class, 'Page3']) -> name('Page3');
Route::get('/Page4', [SiteController::class, 'Page4']) -> name('Page4');
Route::get('/Page5', [SiteController::class, 'Page5']) -> name('Page5');

Route::post('/PostBackRequest', [SiteController::class, 'PostBackRequest']) -> name('PostBackRequest');