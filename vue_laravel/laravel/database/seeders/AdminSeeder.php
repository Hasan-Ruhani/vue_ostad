<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $adminEmail = 'hasan@gmail.com';
        $name = "Md. Hasan Khan";

        if (User::where('role', 'admin65')->count() < 5 && User::where('email', $adminEmail)->doesntExist()) {
            $password = '12345678'; // Ensure minimum 8 characters for password

            // Validate password length
            if (strlen($password) < 8) {
                $this->command->error('Password must be at least 8 characters long.');
                return;
            }

            // Generate a unique username
            $username = $this->generateUniqueUsername($name);

            User::create([
                'name' => $name,
                'email' => $adminEmail,
                'password' => Hash::make($password),
                'role' => 'admin65',
                'username' => $username,
            ]);

            $this->command->info('Admin user created successfully.');
        } else {
            $this->command->warn('Cannot create admin user. Either the email already exists or the admin limit has been reached.');
        }
    }

    /**
     * Generate a unique username.
     *
     * @param string $baseName
     * @return string
     */
    private function generateUniqueUsername(string $baseName): string
    {
        $baseName = Str::slug($baseName); // Convert base name to a URL-friendly slug
        $username = $baseName;
        $counter = 1;

        // Ensure the username is at least 5 characters long
        if (strlen($username) < 5) {
            $username = str_pad($username, 5, '0');
        }

        // Append numbers to the base name until a unique username is found
        while (User::where('username', $username)->exists()) {
            $username = $baseName . $counter;
            $counter++;
        }

        return $username;
    }
}
