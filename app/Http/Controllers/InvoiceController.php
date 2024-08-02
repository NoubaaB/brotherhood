<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Jobs\NotificationJob;
use App\Events\UpdateBillEvent;

class InvoiceController extends Controller
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
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
        return response()->json(["bill_id"=>$invoice->bill_id],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
        $data = $request->validate([
            "checked"=>"required|boolean"
        ]);
        $invoice->update($data);

        NotificationJob::dispatch("Edit", "Invoice", $invoice->id);
        broadcast(new UpdateBillEvent($invoice->bill))->toOthers();
        
        return response()->json(["invoice"=>$invoice],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
