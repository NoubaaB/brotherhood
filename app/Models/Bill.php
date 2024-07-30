<?php

namespace App\Models;

use App\Models\User;
use App\Models\Article;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use PhpParser\Node\Stmt\Return_;

class Bill extends Model
{
    use HasFactory , SoftDeletes;

    protected $guarded = [];

    protected $with = ["articles","user", "invoices"];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();
        //manage resources
        static::deleting(fn ($model) => $model->deletet());
    }

    function articles() : HasMany {
        return $this->hasMany(Article::class);
    }

    function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    function invoices() : HasMany {
        return $this->hasMany(Invoice::class);
    }

    function cals_invoices() : void {
        $total_each = $this->amount / User::count();
        $that = $this;
        $this->invoices()->delete();
        User::each(function ($user) use ($that, $total_each) {
            $my_charge = $that->articles->where("user_id", $user->id)->sum("price");
            Invoice::create([
                "price" => ($my_charge - $total_each),
                "user_id" => $user->id,
                "bill_id" => $that->id,
            ]);
        });
    }

    public function calc() {
        $this->update(["amount"=> $this->articles->sum("price")]);
    }

    function delete()  : void {
        $this->articles()->each(fn ($article) => $article->update(["bill_id" => null]));
        $this->invoices()->delete();
    }
}
