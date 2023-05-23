<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Permission Types
         *
         */
        $Permissionitems = [
            [
                'name'        => 'Accès au Panel Admin',
                'slug'        => 'admin.access',
                'description' => 'Pouvoir accéder au panel admin depuis le site web',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Maintenance',
                'slug'        => 'admin.maintenance',
                'description' => 'Configurer la maintenance',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Bypass Maintenance',
                'slug'        => 'admin.maintenance.bypass',
                'description' => 'Accès au site pendant une maintenance',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Liste des joueurs',
                'slug'        => 'admin.users.list',
                'description' => 'Voir la liste des joueurs',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Rechercher un joueur',
                'slug'        => 'admin.users.search',
                'description' => 'Rechercher un joueur dans la liste',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Edition du joueur',
                'slug'        => 'admin.user.edit',
                'description' => 'Editer les infos d\'un joueur',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Bannir un joueur',
                'slug'        => 'admin.user.banned',
                'description' => 'Ajouter le tag bannis sur un joueur',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Supprimer un joueur',
                'slug'        => 'admin.user.deleted',
                'description' => 'Ajouter le tag supprimer sur un joueur',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Monnaie du joueur',
                'slug'        => 'admin.user.money',
                'description' => 'Changer le nombre de point boutique d\'un joueur',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Bannir un joueur',
                'slug'        => 'admin.user.ban',
                'description' => 'Bannir un joueur du site et l\'empêcher de se connecter à nouveau sur son compte',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Rôle(s) d\'un joueur',
                'slug'        => 'admin.user.role.edit',
                'description' => 'Editer les rôles d\'un joueur (Attacher/Détacher un rôle)',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Sessions actives du joueur',
                'slug'        => 'admin.user.session.view',
                'description' => 'Voir la liste des sessions actives du launcher concernant un utilisateur',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Révoquer une session active du joueur',
                'slug'        => 'admin.user.session.revoke',
                'description' => 'Révoquer une session active d\'un utilisateur',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Gérer une candidature',
                'slug'        => 'admin.candidate.manage',
                'description' => 'Pouvoir changer le status et clôturer une candidature',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Réorganiser un rôle',
                'slug'        => 'admin.role.swap',
                'description' => 'Pouvoir changer la hiérarchie des rôles',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Edition d\'un rôle',
                'slug'        => 'admin.role.edit',
                'description' => 'Pouvoir changer les infos et les permission d\'un rôle',
                'model'       => 'Permission',
            ],
            //FORUM
            [
                'name'        => 'Vérouiller un Thread',
                'slug'        => 'forum.thread.locked',
                'description' => 'Pouvoir créer un thread sur une catégorie Admin',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Epingler un Thread',
                'slug'        => 'forum.thread.pinned',
                'description' => 'Pouvoir épingler un thread',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Créer un code promo',
                'slug'        => 'admin.promocode.create',
                'description' => 'Pouvoir créer un code promo',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Editer un code promo',
                'slug'        => 'admin.promocode.edit',
                'description' => 'Pouvoir éditer un code promo',
                'model'       => 'Permission',
            ],
            [
                'name'        => 'Supprimer un code promo',
                'slug'        => 'admin.promocode.delete',
                'description' => 'Pouvoir supprimer un code promo',
                'model'       => 'Permission',
            ],
        ];

        /*
         * Add Permission Items
         *
         */
        foreach ($Permissionitems as $Permissionitem) {
            $newPermissionitem = config('roles.models.permission')::where('slug', '=', $Permissionitem['slug'])->first();
            if ($newPermissionitem === null) {
                $newPermissionitem = config('roles.models.permission')::create([
                    'name'          => $Permissionitem['name'],
                    'slug'          => $Permissionitem['slug'],
                    'description'   => $Permissionitem['description'],
                    'model'         => $Permissionitem['model'],
                ]);

                $roles = config('roles.models.role')::where('level', '>=', 5)->get();
                foreach($roles as $role){
                    $appendPermissionRole = config('roles.models.permissionRole')::create([
                        'permission_id' => $newPermissionitem->id,
                        'role_id' => $role->id
                    ]);
                }
                
            }
        }
    }
}
