<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

#region non-authentication routes
Route::controller(AuthController::class)->group(function () {
    //login route
    Route::post("login", "login");
});
#endregion 


#region authentication routes
Route::middleware(["auth:sanctum"])->group(function () {
    #region auth routes
    Route::get("me", [AuthController::class, "me"]); //get auth user with
    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("update", [AuthController::class, "update"]);
    #endregion

    #region daily routes
    // Route::controller(DailyController::class)->prefix("dailies")->group(function () {
    //     Route::get("show_date/{date}", "show_date");
    //     Route::get("auth_list", "auth_list");
    //     Route::get("all_list", "all_list");
    //     Route::get("week_list", "week_list");
    //     Route::get("month_list", "month_list");
    // });
    #endregion

    #region main routes
    // Route::apiResources([
    //     "users" => UserController::class,
    //     "roles" => RoleController::class,
    //     "dailies" => DailyController::class,
    //     "commands" => CommandController::class,
    //     "clients" => ClientController::class,
    //     "items" => ItemController::class,
    // ]); 
    //get auth user with
    #endregion
});
