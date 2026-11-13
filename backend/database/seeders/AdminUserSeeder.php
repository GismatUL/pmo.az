<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Creates the CMS administrator. Credentials come from ADMIN_EMAIL /
     * ADMIN_PASSWORD; the fallback password is for local development only.
     */
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@pmo.az');

        $admin = User::query()->firstOrNew(['email' => $email]);

        if (! $admin->exists) {
            $admin->fill([
                'name' => 'PMO.az Admin',
                'password' => env('ADMIN_PASSWORD', 'password'),
            ]);
            $admin->email_verified_at = now();
        }

        $admin->is_admin = true;
        $admin->save();
    }
}
