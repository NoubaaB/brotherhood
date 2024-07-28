<?php

namespace App\Jobs;

use App\Events\NotificationEvent;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class NotificationJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public $operation , public $model , public $id)
    {
        //
        $auth_id = auth()->id();
        $users = User::where("id","!=",$auth_id)->get();
        $_model = strtolower($model)."s";
        $object = [
            "operation"=> $operation,
            "url"=> "/$_model/view/$id",
            "text"=>"$id",
            "model"=> $model,
            "trigger_user_id"=> $auth_id,
            "notify_user_id"=> null,
            "read"=> false,
        ];
        foreach ($users as $user) {
            $object["notify_user_id"]= $user->id;
            $notification = Notification::create($object);
            broadcast(new NotificationEvent($notification));
        }
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
    }
}
