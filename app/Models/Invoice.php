<?php

namespace App\Models;

use App\Models\User;
use App\Events\UserScoreEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = ["user"];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();
        //manage resources
        static::updated(fn($model) => $model->scoring());
        // static::deleting(fn($model) => $model->delete_score());
    }

    function bill() : BelongsTo {
        return $this->belongsTo(Bill::class);
    }

    function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function scoring(): void
    {   
        $operator = $this->checked? -1: 1;
        $price = $this->user->score;
        $price += ($operator * $this->price);
        $this->user->score = $price;
        $this->user->save();
        $this->bill->update(["checked" => $this->bill->invoices()->where("checked", false)->count() == 0]);
        broadcast(new UserScoreEvent($this->user));
    }
}
