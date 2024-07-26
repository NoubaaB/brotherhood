<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with=["notify_user", "trigger_user"];
    
    function trigger_user() : BelongsTo {
        return $this->belongsTo(User::class, "trigger_user_id");
    }

    function notify_user() : BelongsTo {
        return $this->belongsTo(User::class, "notify_user_id");
    }
}
