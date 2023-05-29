<?php

namespace Database\Seeders;

use App\Models\Config;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfigTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ConfigItems = [
            [
                'key'        => 'maintenance.state',
                'value'      => true
            ],
            [
                'key'        => 'maintenance.message',
                'value'      => 'Tm91cyByZXZlbm9ucyB0csOocyB2aXRlIGJhbmRlIGRlIG1hcmdvdWxpbnMgIQ=='
            ],
            [
                'key'        => 'role.default',
                'value'      => 1
            ]
        ];

        /*
         * Add Config Items
         *
         */
        foreach ($ConfigItems as $ConfigItem) {
            $newConfigItem = Config::where('key', '=', $ConfigItem['key'])->first();
            if ($newConfigItem === null) {
                $newConfigItem = Config::create([
                    'key'          => $ConfigItem['key'],
                    'value'          => $ConfigItem['value'],
                ]);
            }
        }
    }
}
