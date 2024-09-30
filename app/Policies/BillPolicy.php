<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Bill;
use App\Models\User;

class BillPolicy
{
    public function before(User $user, string $ability): bool|null
    {
        if ($user->activate) {
            return true;
        }

        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Bill $bill): bool
    {
        //
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Bill $bill): bool
    {
        //
        return $user?->id == $bill->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Bill $bill): bool
    {
        //
        return $user?->id == $bill->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Bill $bill): bool
    {
        //
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Bill $bill): bool
    {
        //
        return true;
    }
}
