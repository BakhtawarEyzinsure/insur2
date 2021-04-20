<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // User::factory()->states('super_admin')->create();

        // factory(User::class, 1)->states('super_admin')->create();
        // factory(User::class, 1)->states('admin')->create();
        // factory(User::class, 1)->states('agencies')->create();
        // factory(User::class, 1)->states('agent')->create();
        // factory(User::class, 1)->states('visitor')->create();

        $this->call([
            CountriesSeeder::class,
            StatesSeeder::class,
            CitiesSeeder::class,
            UserSeeder::class,
            UserPermissionsSeeder::class,
            CategorySeeder::class,
            LicenseTypeSeeder::class,
        ]);
    }
}
