<?php

namespace Database\Seeders;

use App\Models\Enquiry;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(AdminUserSeeder::class);
        $this->call(ContentSeeder::class);

        // Sample inbox entries so the admin enquiry screen has data locally.
        if (app()->isLocal() && Enquiry::query()->doesntExist()) {
            Enquiry::factory()->count(6)->create();
            Enquiry::factory()->count(2)->create(['status' => 'closed', 'handled_at' => now()]);
        }
    }
}
