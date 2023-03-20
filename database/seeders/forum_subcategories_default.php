<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Forum\ForumSubcategories;

class forum_subcategories_default extends Seeder
{
    public function run()
    {
        $ForumSubCategoriesItems = [
            [
                'name' => 'Nouveautés',
                'position' => 0,
                'parent_id' => 1
            ],
            [
                'name' => 'Règles',
                'position' => 0,
                'parent_id' => 1
            ],
            [
                'name' => 'Taverne',
                'position' => 0,
                'parent_id' => 2
            ],
            [
                'name' => 'Recrutement Faction',
                'position' => 0,
                'parent_id' => 2
            ],
            [
                'name' => 'Reporter un Bug',
                'position' => 0,
                'parent_id' => 3
            ],
            [
                'name' => 'Demande de débannissement',
                'position' => 0,
                'parent_id' => 3
            ],
        ];

        foreach ($ForumSubCategoriesItems as $ForumSubCategoryItem) {
            $newForumSubCategory = ForumSubCategories::where('name', '=', $ForumSubCategoryItem['name'])->first();
            if ($newForumSubCategory === null) {
                $newForumSubCategory = ForumSubCategories::insert([
                    'name'          => $ForumSubCategoryItem['name'],
                    'position'      => $ForumSubCategoryItem['position'],
                    'parent_id'     => $ForumSubCategoryItem['parent_id']
                ]);
            }
        }
    }
}
