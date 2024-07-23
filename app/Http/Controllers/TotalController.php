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
    public function store(Request $request) :JsonResponse
    {
        $articles = $request->validate([
            "articles.*" => "sometimes|exists:articles,id"
        ]);

        $articles = Article::find($articles["articles"]);
        $total = Total::create();
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
    public function destroy(Total $total)
    {
        //
    }
}
