<?php

namespace App\Models;

use App\Models\Article;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Total extends Model
{
    use HasFactory , SoftDeletes;

    protected $guarded = [];

    function articles() : HasMany {
        return $this->hasMany(Article::class);
    }
}
