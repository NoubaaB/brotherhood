<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Article;
use App\Models\Capital;
use Illuminate\Http\Request;
use App\Events\DeleteBillEvent;
use App\Events\UpdateBillEvent;
use Illuminate\Http\JsonResponse;
use App\Events\CreateArticleEvent;
use App\Events\DeleteArticleEvent;
use App\Events\UpdateArticleEvent;
use App\Http\Controllers\Controller;
use App\Jobs\NotificationJob;

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
        $bills = Bill::whereBetween("date", [$date_start, $date_end])->get();
        $capital = Capital::where("date_start",">=", $date_start)->where("user_id", auth()->id())->first();
        return response()->json([
            "articles" => $articles,
            "bills" => $bills,
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
    public function store(Request $request) : JsonResponse
    {
        //
        $r_articles = $request->validate([
            "articles.*.date"=> "required|date_format:Y-m-d",
            "articles.*.description"=> "sometimes|nullable|string|max:400",
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
        
        if(!$article->is_private){
            NotificationJob::dispatch("Create","Article",$article->id);
            broadcast(new CreateArticleEvent($article))->toOthers();
        }

        return response()->json(["articles"=>$articles],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article) : JsonResponse
    {
        //
        return response()->json([
            "article"=>$article
        ],200);
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
    public function update(Request $request, Article $article) : JsonResponse
    {
        $data = $request->validate([
            "article.date" => "required|date_format:Y-m-d",
            "article.description" => "sometimes|nullable|string|max:400",
            "article.price" => "sometimes|numeric",
            "article.is_private" => "sometimes|boolean",
            "article.product_id" => "sometimes|exists:products,id",
            "article.bill_id" => "sometimes|nullable|numeric"
        ]);
        $bill_id = $article->bill_id;
        $article->update($data["article"]);
        
        if($request->has("update_bill")){
            $bill = Bill::find($bill_id);
            $bill->calc();
            broadcast(new UpdateBillEvent($bill))->toOthers();
            if(count($bill->articles)==0){
                NotificationJob::dispatch("Delete", "Bill", "$bill->date , $bill->amount");
                broadcast(new DeleteBillEvent($bill,[$article->id]))->toOthers();
                $bill->delete();
            }else{
                NotificationJob::dispatch("Edit", "Bill", $bill_id);
            }
        }
        if(!$article->is_private && !$request->has("update_bill") ){
            NotificationJob::dispatch("Edit", "Article", $article->id);
            broadcast(new UpdateArticleEvent($article))->toOthers();
        }

        return response()->json(["article" => $article], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article) : JsonResponse
    {
        //
        if(!$article->is_private){
            NotificationJob::dispatch("Delete", "Article", $article->product->name);
            broadcast(new DeleteArticleEvent($article))->toOthers();
        }
        $bill_id = $article->bill_id;
        $status = $article->delete();
        if($bill_id){
            $bill = Bill::find($bill_id);
            $bill->calc();
            if(count($bill->articles)>0){
                broadcast(new UpdateBillEvent($bill))->toOthers();
            }else{
                broadcast(new DeleteBillEvent($bill, $bill->articles->map(fn ($item) => $item->id)))->toOthers();
            }
        }
        return response()->json(["status"=>$status],200);
    }
}
