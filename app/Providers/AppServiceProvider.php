<?php

namespace App\Providers;

use App\Models\Bill;
use App\Models\User;
use App\Models\Article;
use App\Models\Capital;
use App\Models\Invoice;
use App\Models\Product;
use App\Policies\BillPolicy;
use App\Policies\UserPolicy;
use App\Policies\ArticlePolicy;
use App\Policies\CapitalPolicy;
use App\Policies\InvoicePolicy;
use App\Policies\ProductPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Gate::policy(Article::class, ArticlePolicy::class);
        Gate::policy(Bill::class, BillPolicy::class);
        Gate::policy(Capital::class, CapitalPolicy::class);
        Gate::policy(Invoice::class, InvoicePolicy::class);
        Gate::policy(Product::class, ProductPolicy::class);
        Gate::policy(User::class, UserPolicy::class);
    }
}
