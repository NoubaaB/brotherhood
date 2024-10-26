<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use App\Jobs\ReadNotificationJob;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        //
        $user_id = Auth::id();
        $notifications = Notification::where("notify_user_id", $user_id)
        ->latest()->with("notify_user")
        ->simplePaginate(10);

        $count = Notification::where([
            ["notify_user_id" , "=", $user_id],  
            ["read", "=",false]
        ])->count();
        return response()->json(['notifications' => $notifications, 'count' => $count], 200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : void
    {
        //
        $user_id = Auth::id();
        $page = $request->get("page");
        $notifications = Notification::where("notify_user_id", $user_id)
        ->latest()
        ->take(10 * $page)
        ->get();
        
        ReadNotificationJob::dispatch($notifications);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
