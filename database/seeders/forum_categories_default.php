<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Forum\ForumCategories;

class forum_categories_default extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ForumCategoriesItems = [
            [
                'name' => 'Communications Officielles',
                'position' => 0
            ],
            [
                'name' => 'Communauté',
                'position' => 0
            ],
            [
                'name' => 'Contacter le Staff',
                'position' => 0
            ],
        ];

        foreach ($ForumCategoriesItems as $ForumCategoryItem) {
            $newForumCategoryItem = ForumCategories::where('name', '=', $ForumCategoryItem['name'])->first();
            if ($newForumCategoryItem === null) {
                $newForumCategory = ForumCategories::create([
                    'name'          => $ForumCategoryItem['name'],
                    'position'      => $ForumCategoryItem['position']
                ]);
            }
        }
    }
}
