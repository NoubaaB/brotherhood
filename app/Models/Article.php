<?php

namespace App\Models;

use App\Models\User;
use App\Models\Bill;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory , SoftDeletes;

    protected $guarded = [];

    protected $with = ["product","user"];

    protected $casts= [
        "is_private"=>"boolean",
        "users_id"=>"array",
        "date"=> "date:Y-m-d"
    ];

    /**
     * Get the article's users_invoices_ids.
     */
    public function proccess_users_invoices(): void
    {
        $users_id = [];
        if ($this->bill_id) {
            $users_id = $this->bill->invoices->map(fn($invoice) => $invoice->user_id)->toArray();
        }
        $this->update(["users_id"=> $users_id]);
    }

    function product() : BelongsTo {
        return $this->belongsTo(Product::class);
    }

    function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    function bill(): BelongsTo{
        return $this->belongsTo(Bill::class);
    }
}
