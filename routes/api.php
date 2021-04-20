<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post('login', 'App\Http\Controllers\Api\AuthController@login');
Route::post('register', 'App\Http\Controllers\Api\AuthController@register');

Route::group(['middleware' => 'api'], function () {
    Route::apiResources([
        'licenseType' => 'App\Http\Controllers\Api\LicenseTypeController',
        'country' => 'App\Http\Controllers\Api\CountryController',
        'user' => 'App\Http\Controllers\Api\UserController',
        'question' => 'App\Http\Controllers\Api\QuestionController',
        'answer' => 'App\Http\Controllers\Api\AnswerController',
        'category' => 'App\Http\Controllers\Api\CategoryController',
        'subcategory' => 'App\Http\Controllers\Api\SubcategoryController',
        'visitor' => 'App\Http\Controllers\Api\VisitorController',
        'agent' => 'App\Http\Controllers\Api\AgentController',
        'agency' => 'App\Http\Controllers\Api\AgencyController',
    ]);

    Route::post('subcategories-by-category-id', 'App\Http\Controllers\Api\SubcategoryController@subcategoriesByCategoryId');
    Route::post('states-by-country-id', 'App\Http\Controllers\Api\StateController@statesByCountryId');
    Route::post('cities-by-state-id', 'App\Http\Controllers\Api\CityController@citiesByStateId');
    Route::post('visitor-by-user-id', 'App\Http\Controllers\Api\VisitorController@visitorByUserId');
    Route::post('agent-by-user-id', 'App\Http\Controllers\Api\AgentController@agentByUserId');
    Route::post('agency-by-user-id', 'App\Http\Controllers\Api\AgencyController@agencyByUserId');
    Route::post('update-agency-licenses', 'App\Http\Controllers\Api\AgencyController@updateAgencyLicenses');

    Route::post('logout', 'App\Http\Controllers\Api\AuthController@logout');
});
