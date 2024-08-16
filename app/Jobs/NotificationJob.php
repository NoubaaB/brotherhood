<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Notification;
use Minishlink\WebPush\WebPush;
use App\Models\PushNotification;
use App\Events\NotificationEvent;
use Minishlink\WebPush\Subscription;
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
    public function __construct(public $operation , public $model , public $id, public $text = "")
    {
        //
        $auth_id = auth()->id();
        $users = User::where("id","!=",$auth_id)->get();
        $_model = strtolower($model)."s";
        $object = [
            "operation"=> $operation,
            "url"=> "/$_model/view/$id",
            "text"=>"$id $text",
            "model"=> $model,
            "trigger_user_id"=> $auth_id,
            "notify_user_id"=> null,
            "read"=> false,
        ];
        foreach ($users as $user) {
            $object["notify_user_id"]= $user->id;
            $notification = Notification::create($object);
            $notification->load(["notify_user", "trigger_user"]);
            broadcast(new NotificationEvent($notification));
        }
        $auth = [
            'VAPID' => [
                'subject' => env('WEB_PUSH_PUBLIC_OBJETCT'), // can be a mailto: or your website address
                'publicKey' => env('WEB_PUSH_PUBLIC_KEY'), // (recommended) uncompressed public key P-256 encoded in Base64-URL
                'privateKey' => env('WEB_PUSH_PRIVATE_KEY'), // (recommended) in fact the secret multiplier of the private key encoded in Base64-URL
            ],
        ];

        $webPush = new WebPush($auth);

        // Construct the payload with the logo.
        $user_name = auth()->user()->name;
        $notification_operation = $object['operation'];
        $notification_model = $object['model'];
        $text = $object['model'] != "Delete" ? $object['text'] : "";
        $g_text = "$user_name has $notification_operation $notification_model $text" ;
        $url = $object['url'];
        $payload = json_encode([
            'title' => env("APP_NAME"),
            'body' => $g_text,
            'url' => env('REVERB_SCHEME')."://".env('REVERB_HOST')."/$url",
        ]);
        
        $notifications = PushNotification::where([
            ["user_id","!=", $auth_id]
        ])->get();
        // dd($notifications);

        foreach ($notifications as $notification) {
            $webPush->sendOneNotification(
                Subscription::create($notification['subscriptions']),
                $payload,
                ['TTL' => 5000]
            );
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
