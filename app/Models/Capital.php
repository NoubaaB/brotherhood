<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Capital extends Model
{
    use HasFactory , SoftDeletes;

    protected $guarded = [];

    function user() : BelongsTo {
        return $this->BelongsTo(User::class);
    }
}
