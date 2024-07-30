<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = ["user"];

    function bill() : BelongsTo {
        return $this->belongsTo(Bill::class);
    }

    function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }
}
