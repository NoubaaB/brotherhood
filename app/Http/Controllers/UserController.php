<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
        $data = $request->validate([
            "name"=>"required|string|max:25",
            "email"=>"required|string|email|max:35",
            "image" => "required|string|max:50",
            "password" => "min:6|required_with:confirm_password|same:confirm_password|max:35"
        ]);
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        
        return response()->json(["user"=>$user],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
        $data = $request->validate([
            "name" => "required|string|max:25",
            "email" => "required|string|email|max:35",
            "image" => "required|string|max:50",
            "password" => "sometimes|min:6|required_with:confirm_password|same:confirm_password|max:35"
        ]);
        if(isset($data['password'])){
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json(["user" => $user], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        $status = $user->delete();
        response()->json(["status"=>$status],200);
    }
}
