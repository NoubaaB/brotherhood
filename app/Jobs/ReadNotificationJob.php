<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ReadNotificationJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public $notifications)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
        foreach ($this->notifications as $notification) {
            $notification->update(["read"=>true]);
        }
    }
}
