<?php

namespace App\Models;

use App\Models\User;
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

    function product() : BelongsTo {
        return $this->belongsTo(Product::class);
    }

    function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
