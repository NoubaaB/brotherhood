<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Http\Controllers\Controller;
use App\Models\Capital;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        //
        $date_start = request()->query("date_start");
        $date_end = request()->query("date_end");
        $articles = Article::whereBetween("date", [$date_start, $date_end])->get();
        $capital = Capital::where("date_end","<=", $date_end)->where("user_id", auth()->id())->first();
        return response()->json([
            "articles" => $articles,
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
        $r_articles = $request->validate([
            "articles.*.date"=> "required|string",
            "articles.*.description"=> "required|string|max:400",
            "articles.*.price"=> "required|numeric",
            "articles.*.is_private"=> "required|boolean",
            "articles.*.product_id"=> "required|exists:products,id"
        ]);
        $articles = [];
        foreach ($r_articles["articles"] as $article) {
            $article["user_id"] = auth()->id();
            $article = Article::create($article);
            $articles[] = $article;
        }

        return response()->json(["articles"=>$articles],200);
        

    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
        $status = $article->delete();
        return response()->json(["status"=>$status],200);
    }
}
