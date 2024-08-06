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

    protected $casts = [
        "date" => "date:Y-m-d"
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
        static::deleting(fn ($model) => $model->delete_resources());
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
        $filtred_users = [];
        if(request()->has("users_id")){
            $users_id = request()->validate([
                "users_id.*" => "sometimes|exists:users,id"
            ]);
            
            $merged_users = array_merge($users_id['users_id'], $this->invoices()->get("user_id")->toArray());
            
            // Get unique values
            $filtred_users = array_unique($merged_users);
        }else{
            $filtred_users = $this->invoices->map(fn ($model) => $model->user_id)->toArray();
        }

        Invoice::where([
            ["user_id", "!=", $filtred_users],
            ["bill_id", "=" ,$this->id]
        ])->delete();
        
        $total_each = $this->amount / User::find($filtred_users)->count();

        foreach ($filtred_users as $user_id) {
            $my_charge = $this->articles->where("user_id", $user_id)->sum("price");
            $invoice = Invoice::where([
                ["bill_id","=",$this->id],
                ["user_id" , "=" , $user_id]
            ])->first();

            if($invoice){
                $invoice->update([
                    "spent" => $my_charge,
                    "price" => ($my_charge - $total_each),                    
                ]);
            }else{
                Invoice::create([
                    "spent" => $my_charge,
                    "price" => ($my_charge - $total_each),
                    "user_id" => $user_id,
                    "bill_id" => $this->id,
                ]);
            }
        }
    }

    public function calc() {
        $sum = $this->articles->sum("price");
        $this->amount = $sum;
        $this->cals_invoices();
        $this->save();
    }

    function delete_resources()  : void {
        $this->articles()->each(fn ($article) => $article->update(["bill_id" => null]));
        $this->invoices()->delete();
    }
}
