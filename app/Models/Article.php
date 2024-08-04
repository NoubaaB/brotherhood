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
        "date"=> "date:Y-m-d"
    ];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {

        parent::boot();

        //manage resources
        // static::saving(fn ($model) => $model?->bill?->calc());
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
