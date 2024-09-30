<?php

namespace App\Http\Controllers;

use App\Models\Capital;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CapitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        //
        $capitals = Capital::where("user_id",Auth::id())->get();
        return response()->json(["capitals"=>$capitals],200);
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
    public function store(Request $request) : JsonResponse
    {
        //
        if ($request->user()->cannot('create',Capital::class)) {
            abort(403);
        }

        $data = $request->validate([
            "amount" => "required|numeric",
            "date_start" => "required|date_format:Y-m-d",
            "date_end" => "sometimes|nullable|date_format:Y-m-d"
        ]);
            
        $data["user_id"] = Auth::id();

        $capital = Capital::create($data);

        return response()->json(["capital"=>$capital],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Capital $capital)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Capital $capital)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Capital $capital) : JsonResponse
    {
        //
        if ($request->user()->cannot('update', $capital)) {
            abort(403);
        }
        $data = $request->validate([
            "amount" => "required|numeric",
            "date_start" => "required|date_format:Y-m-d",
            "date_end" => "sometimes|nullable|date_format:Y-m-d"
        ]);

        $capital->update($data);

        return response()->json(["capital" => $capital], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Capital $capital) : JsonResponse
    {
        //
        Gate::authorize('delete', $capital);

        $status = $capital->delete();
        return response()->json([
            "status"=>$status
        ],200);
    }
}
