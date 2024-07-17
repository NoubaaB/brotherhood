<?php

namespace App\Models;

use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory , SoftDeletes;

    protected $guarded = [];

    function product() : BelongsTo {
        return $this->belongsTo(Product::class);
    }

    function user(): HasOne{
        return $this->hasOne(User::class);
    }
}
