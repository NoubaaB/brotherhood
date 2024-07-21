<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Controllers\Controller;
use App\Models\Capital;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        //
        $date_start = request()->query("date_start");
        $date_end = request()->query("date_end");
        $items = Item::whereBetween("date", [$date_start, $date_end])->get();
        $capital = Capital::where("date_end","<=", $date_end)->where("user_id", auth()->id())->first();
        return response()->json([
            "items" => $items,
            "capital" => $capital
        ], 200);
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
        $r_items = $request->validate([
            "items.*.date"=> "required|string",
            "items.*.description"=> "required|string|max:400",
            "items.*.price"=> "required|numeric",
            "items.*.is_private"=> "required|boolean",
            "items.*.product_id"=> "required|exists:products,id"
        ]);
        $items = [];
        foreach ($r_items["items"] as $item) {
            $item["user_id"] = auth()->id();
            $item = Item::create($item);
            $items[] = $item;
        }

        return response()->json(["items"=>$items],200);
        

    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
        $status = $item->delete();
        return response()->json(["status"=>$status],200);
    }
}
