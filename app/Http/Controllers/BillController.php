<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Jobs\NotificationJob;
use App\Events\CreateBillEvent;
use App\Events\DeleteBillEvent;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        //
        $date_start = request()->query("date_start");
        $date_end = request()->query("date_end");
        $bills = Bill::whereBetween("date", [$date_start, $date_end])->get();
        return response()->json([
            "bills" => $bills,
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
        $bill = Bill::create([
            "date"=> date_format(now(), "Y-m-d"),
            "user_id" => auth()->id()
        ]);
        $sum = 0.00;
        $articles_id = [];
        foreach ($articles as $article) {
            $article->update(["bill_id"=>$bill->id]);
            $sum += $article->price;
            $articles_id [] = $article->id;
        }
        $bill->update(["amount"=>$sum]);
        $bill->load("user");
        $bill->without("articles");
        NotificationJob::dispatch("Create", "Bill", $bill->id);
        broadcast(new CreateBillEvent($bill, $articles_id))->toOthers();

        return response()->json(["bill" => $bill], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        //
        return response()->json(["bill"=>$bill],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bill $bill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bill $bill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill) : JsonResponse
    {
        //
        $bill->articles()->each(fn ($article) => $article->update(["bill_id"=>null]));
        NotificationJob::dispatch("Delete", "Bill", "$bill->date , $bill->amount");
        broadcast(new DeleteBillEvent($bill, $bill->articles->map(fn($item)=>$item->id)))->toOthers();
        $status =  $bill->delete();
        return response()->json(["status"=>$status],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete_collect() : JsonResponse
    {
        //
        $data = request()->validate([
            "bills.*" => "sometimes|exists:bills,id"
        ]);
        $bills = Bill::find($data["bills"]);
        $status = false ;
        foreach ($bills as $bill) {
            $bill->articles()->each(fn ($article) => $article->update(["bill_id"=>null]));
            NotificationJob::dispatch("Delete", "Bill", "$bill->date , $bill->amount");
            broadcast(new DeleteBillEvent($bill, $bill->articles->map(fn ($item) => $item->id)))->toOthers();
            $status = $bill->delete();
        }
        return response()->json(["status"=>$status],200);
    }
}