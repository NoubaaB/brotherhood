<?php

namespace App\Http\Controllers;

use App\Models\Total;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class TotalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        //
        $date_start = request()->query("date_start");
        $date_end = request()->query("date_end");
        $totals = Total::whereBetween("date", [$date_start, $date_end])->get();
        return response()->json([
            "totals" => $totals,
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
    public function store(Request $request) :JsonResponse
    {
        $articles = $request->validate([
            "articles.*" => "sometimes|exists:articles,id"
        ]);

        $articles = Article::find($articles["articles"]);
        $total = Total::create(["user_id"=>auth()->id]);
        $sum = 0.00;
        foreach ($articles as $article) {
            $article->update(["total_id"=>$total->id]);
            $sum += $article->amount;
        }
        $total->update(["amount"=>$sum]);

        return response()->json(["total" => $total], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(Total $total)
    {
        //
        return response()->json(["total"=>$total],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Total $total)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Total $total)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Total $total) : JsonResponse
    {
        //
        $total->articles()->each(fn ($article) => $article->update(["total_id"=>null]));
        $status =  $total->delete();
        return response()->json(["status"=>$status],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete_collect() : JsonResponse
    {
        //
        $data = request()->validate([
            "totals.*" => "sometimes|exists:totals,id"
        ]);
        $totals = Total::find($data["totals"]);
        $status = false ;
        foreach ($totals as $total) {
            $total->articles()->each(fn ($article) => $article->update(["total_id"=>null]));
            $status = $total->delete();
        }
        return response()->json(["status"=>$status],200);
    }
}
