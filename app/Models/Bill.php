<?php

namespace App\Models;

use App\Models\User;
use App\Models\Article;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bill extends Model
{
    use HasFactory , SoftDeletes;

    protected $guarded = [];

    protected $with = ["articles","user"];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        //manage resources
        static::deleting(fn ($model) => $model->articles()->each(fn($article)=>$article->update(["bill_id"=>null])));
    }

    function articles() : HasMany {
        return $this->hasMany(Article::class);
    }

    function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function calc() {
        $this->update(["amount"=> $this->articles->sum("price")]);
    }
}
