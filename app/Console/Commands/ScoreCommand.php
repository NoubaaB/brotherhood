<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\Invoice;
use Illuminate\Console\Command;

class ScoreCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:score';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Users Score';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        User::each(fn($user)=>$user->update(["score"=>0.00]));
        Invoice::where("checked",false)->each(fn($invoice)=> $invoice->scoring());
        $this->components->info('Users score are updated!');
    }
}
