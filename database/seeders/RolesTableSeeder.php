<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Role Types
         *
         */
        $RoleItems = [
            [
                'name'        => 'Admin',
                'slug'        => 'admin',
                'description' => 'Admin Role',
                'color'       => '#fff',
                'level'       => 5,
            ],
            [
                'name'        => 'Responsable',
                'slug'        => 'responsable',
                'description' => 'Responsable Role',
                'color'       => '#fff',
                'level'       => 1,
            ],
            [
                'name'        => 'Développeur',
                'slug'        => 'developer',
                'description' => 'Développeur Role',
                'color'       => '#fff',
                'level'       => 1,
            ],
            [
                'name'        => 'User',
                'slug'        => 'user',
                'description' => 'User Role',
                'color'       => '#fff',
                'level'       => 1,
            ],
        ];

        /*
         * Add Role Items
         *
         */
        foreach ($RoleItems as $RoleItem) {
            $newRoleItem = config('roles.models.role')::where('slug', '=', $RoleItem['slug'])->first();
            if ($newRoleItem === null) {
                $newRoleItem = config('roles.models.role')::create([
                    'name'          => $RoleItem['name'],
                    'slug'          => $RoleItem['slug'],
                    'description'   => $RoleItem['description'],
                    'color'         => $RoleItem['color'],
                    'level'         => $RoleItem['level'],
                ]);
            }
        }
    }
}
