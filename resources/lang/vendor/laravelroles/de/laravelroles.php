<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel Roles Language Lines - laravelroles
    |--------------------------------------------------------------------------
    */

    'date-format' => 'G:i d.m.Y',

    'titles' => [
        'dashboard'                 => 'Rollenübersicht',
        'show-role'                 => 'Detailansicht Rolle: <strong>:name</strong>',
        'show-permission'           => 'Detailansicht Berechtigung: <strong>:name</strong>',
        'roles-table'               => 'Aktive Rollen',
        'roles-card'                => 'Rollen',
        'role-card'                 => 'Rolle: ',
        'permissions-card'          => 'Rechte',
        'permissions-table'         => 'Aktive Rechte',
        'dropdown-menu-alt'         => 'Zeige Rollen Dropdown Menü',
        'create-role'               => 'Neue Rolle erstellen',
        'edit-role'                 => 'Rolle bearbeiten: <strong>:name</strong>',
        'create-permission'         => 'Neue Berechtigung erstellen',
        'edit-permission'           => 'Berechtigung bearbeiten: <strong>:name</strong>',
        'roles-deleted-table'       => 'Gelöschte Rollen',
        'show-role-deleted'         => 'Detailansicht gelöschter Rolle: <strong>:name</strong>',
        'permissions-deleted-table' => 'Gelöschte Berechtigungen',
        'show-permission-deleted'   => 'Detailansicht gelöschte Berechtigung: <strong>:name</strong>',
    ],

    'cards' => [
        'users-count'       => '{1} :count Benutzer|[2,*] :count Benutzer',
        'permissions-count' => '{1} :count Berechtigung|[2,*] :count Berechtigungen',
        'roles-count'       => '{1} :count Rolle|[2,*] :count Rollen',
        'none-count'        => 'Keine',
        'level'             => 'Level :level',
        'role-card'         => [
            'user-id'                   => 'Benutzer Id',
            'user-name'                 => 'Benutzername',
            'user-email'                => 'Benutzer E-Mail',
            'permissions-id'            => 'Berechtigungs Id',
            'permissions-name'          => 'Berechtigungsname',
            'table-users-caption'       => 'Benutzer mit Rolle: <strong><em>:role</em></strong>',
            'table-permissions-caption' => 'Berechtigung mit Rolle: <strong><em>:role</em></strong>',
        ],
        'permissions-card' => [
            'role-id'                           => 'Rollen Id',
            'role-name'                         => 'Rollenname',
            'permissions-table-roles-caption'   => 'Rollen mit Berechtigung: <strong><em>:permission</em></strong>',
            'permissions-table-users-caption'   => 'Benutzer mit Berechtigung: <strong><em>:permission</em></strong>',
        ],
        'role-info-card' => [
            'role-id'           => 'Rollen Id',
            'role-name'         => 'Rollenname',
            'role-desc'         => 'Rollenbeschreibung',
            'role-level'        => 'Rollenlevel',
            'role-users'        => 'Rollenbenutzer',
            'role-permissions'  => 'Rollenberechtigungen',
            'created'           => 'Erstellt am',
            'updated'           => 'Aktualisiert am',
            'deleted'           => 'Gelöscht am',
            'none'              => 'Keine',
        ],
        'permission-info-card' => [
            'permission-id'     => 'Berechtigungs Id',
            'permission-name'   => 'Berechtigungsname',
            'permission-slug'   => 'Berechtigungs-Slug',
            'permission-model'  => 'Berechtigungsmodell',
            'permission-desc'   => 'Berechtigungsbeschreibung',
            'permission-roles'  => 'Berechtigung in Rollen',
            'permission-users'  => 'Berechtigung der Benutzer',
            'created'           => 'Erstellt am',
            'updated'           => 'Aktualisiert am',
            'deleted'           => 'Gelöscht am',
            'none'              => 'Keine',
        ],

    ],

    'roles-table' => [
        'caption'       => '{1} :count Rolle (Gesamt)|[2,*] :count Rollen (Gesamt)',
        'id'            => 'ID',
        'name'          => 'Name',
        'desc'          => 'Beschreibung',
        'level'         => 'Level',
        'permissons'    => 'Berechtigungen',
        'createdAt'     => 'Erstellt',
        'updatedAt'     => 'Aktualisiert',
        'deletedAt'     => 'Gelöscht',
        'actions'       => 'Aktionen',
        'none'          => 'Keine Rollen Einträge',
    ],

    'roles-deleted-table' => [
        'caption'       => '{1} :count gelöschte Rolle (Gesamt)|[2,*] :count gelöschte Rollen (Gesamt)',
    ],

    'permissions-table' => [
        'caption'       => '{1} :count Berechtigung (Gesamt)|[2,*] :count Berechtigungen (Gesamt)',
        'id'            => 'ID',
        'name'          => 'Name',
        'slug'          => 'Slug',
        'desc'          => 'Beschreibung',
        'roles'         => 'Rollen',
        'createdAt'     => 'Erstellt',
        'updatedAt'     => 'Aktualisiert',
        'deletedAt'     => 'Gelöscht',
        'actions'       => 'Aktionen',
        'none'          => 'Keine Berechtigungs Einträge',
    ],

    'permissions-deleted-table' => [
        'caption'       => '{1} :count gelöschte Berechtigung (Gesamt)|[2,*] :count gelöschte Berechtigungen (Gesamt)',
    ],

    'buttons' => [
        'create-new-role'               => 'Neue Rolle erstellen',
        'show-deleted-roles'            => 'Gelöschte Rollen',
        'show-deleted-permissions'      => 'Gelöschte Berechtigungen',
        'show'                          => '<span class="hidden-xs hidden-sm">Anzeigen </span><i class="fa fa-eye fa-fw" aria-hidden="true"></i>',
        'edit'                          => '<span class="hidden-xs hidden-sm">Bearbeiten </span><i class="fa fa-pencil fa-fw" aria-hidden="true"></i>',
        'edit-larger'                   => 'Bearbeiten <i class="fa fa-pencil fa-fw" aria-hidden="true"></i>',
        'delete'                        => '<span class="hidden-xs hidden-sm">Löschen </span><i class="fa fa-trash-o fa-fw" aria-hidden="true"></i>',
        'delete-large'                  => 'Löschen <i class="fa fa-trash-o fa-fw" aria-hidden="true"></i>',
        'destroy'                       => '<span class="hidden-xs hidden-sm">Endgültig löschen </span>',
        'destroy-large'                 => '<span class="hidden-xs">Rolle</span> Endgültig löschen',
        'create-new-permission'         => 'Neue Berechtigung erstellen',
        'back-to-roles'                 => '<span class="hidden-xs">Zurück</span> <span class="hidden-xs hidden-sm">zu Rollen</span>',
        'back-to-roles-deleted'         => '<span class="hidden-xs">Zurück</span> <span class="hidden-xs hidden-sm">zu gelöschten Rollen</span>',
        'back-to-permissions'           => '<span class="hidden-xs">Zurück</span> <span class="hidden-xs hidden-sm">zur Rollenübersicht</span>',
        'back-to-permissions-deleted'   => '<span class="hidden-xs">Zurück</span> <span class="hidden-xs hidden-sm">zur gelöschten Rollenübersicht</span>',
        'back-to-roles-dashboard'       => 'Zurück zur Rollen Übersicht',
        'destroy-all-roles'             => 'Alle gelöschten Rollen endgültig löschen',
        'restore-all-roles'             => 'Alle gelöschten Rollen wiederherstellen',
        'restore-role'                  => '<span class="hidden-xs hidden-sm">Wiederherstellen </span>',
        'restore-role-large'            => '<span class="hidden-xs">Rolle</span> Wiederherstellen ',
        'show-deleted-role'             => '<span class="hidden-xs hidden-sm">Anzeigen </span>',
        'restore-permission'            => '<span class="hidden-xs hidden-sm">Wiederherstellen </span>',
        'restore-permission-large'      => '<span class="hidden-xs">Permission</span> Wiederherstellen',
        'show-deleted-permission'       => '<span class="hidden-xs hidden-sm">Anzeigen </span>',
        'restore-all-permissions'       => 'Alle gelöschten Berechtigungen wiederherstellen',
        'destroy-all-permissions'       => 'Alle gelöschten Berechtigungen endgültig löschen',
    ],

    'tooltips' => [
        'view-user'                 => 'Benutzer anzeigen',
        'delete-role'               => 'Rolle löschen',
        'destroy-role'              => 'Rolle endgültig löschen',
        'delete-permission'         => 'Berechtigung löschen',
        'show-role'                 => 'Rolle anzeigen',
        'show-permission'           => 'Berechtigung anzeigen',
        'edit-role'                 => 'Rolle bearbeiten',
        'edit-permission'           => 'Berechtigung bearbeiten',
        'show-hide'                 => 'Mehr/weniger anzeigen',
        'back-roles-deleted'        => 'Zurück zur gelöschten Übersicht',
        'back-roles'                => 'Zurück zur Übersicht',
        'back-permissions-deleted'  => 'Zurück zur gelöschten Übersicht',
        'back-permissions'          => 'Zurück zur Übersicht',
        'save-role'                 => 'Neue Rolle speichern',
        'update-role'               => 'Änderungen speichern',
        'save-permission'           => 'Neue Berechtigung speichern',
        'update-permission'         => 'Änderungen speichern',
        'restore-role'              => 'Rolle wiederherstellen',
        'destroy-permission'        => 'Berechtigung endgültig löschen',
        'restore-permission'        => 'Berechtigung wiederherstellen',
        'show-deleted-role'         => 'Rolle anzeigen',
        'show-deleted-permission'   => 'Berechtigung anzeigen',
    ],

    'modals' => [
        'delete_modal_title'            => 'Lösche :type :item',
        'destroy_modal_title'           => 'Lösche endgültig :type :item',
        'delete_modal_message'          => 'Bist du dir sicher :type: :item zu löschen?',
        'destroy_modal_message'         => 'Bist du dir sicher :item endgültig zu löschen?',
        'delete_role_btn_cancel'        => 'Abbrechen',
        'delete_role_btn_confirm'       => 'Löschen bestätigen',
        'destroy_all_role_title'        => 'Lösche engültig ALLE :type :items',
        'destroy_all_role_message'      => 'Bist du dir sicher alle Rollen endgültig zu löschen?',
        'btnConfirm'                    => 'Bestätigen',
        'btnCancel'                     => 'Abbrechen',
        'restoreAllRolesTitle'          => 'ALLE gelöschten Rollen wiederherstellen',
        'restoreAllRolesMessage'        => 'Bist du dir sicher ALLE gelöschten Rollen WIEDERHERZUSTELLEN?',
        'destroyAllRolesTitle'          => 'ALLE gelöschten Rollen endgültig löschen',
        'destroyAllRolesMessage'        => 'Bist du dir sicher ALLE gelöschten Rollen ENDGÜLTIG ZU LÖSCHEN?',
        'restore_modal_title'           => 'Wiederherstellen der :type :item',
        'restore_modal_message'         => 'Bist du dir sicher restore :type: :item?',
        'restoreAllPermissionsTitle'    => 'ALLE gelöschten Berechtigungen wiederherstellen',
        'restoreAllPermissionsMessage'  => 'Bist du dir sicher ALLE gelöschten Berechtigungen WIEDERHERZUSTELLEN?',
        'destroyAllPermissionsTitle'    => 'ALLE gelöschten Berechtigungen endgültig löschen',
        'destroyAllPermissionsMessage'  => 'Bist du dir sicher ALLE gelöschten Berechtigungen ENDGÜLTIG ZU LÖSCHEN?',
    ],

    'flash-messages' => [
        'close'                             => 'Schließen',
        'success'                           => 'Erfolg',
        'error'                             => 'Error',
        'whoops'                            => 'Hoppla! ',
        'someProblems'                      => 'Es gab einige Probleme mit deiner Eingabe.',
        'successDeletedItem'                => 'Erfolgreich :type: :item gelöscht',
        'role-create'                       => 'Erfolgreich neue Rolle erstellt: :role',
        'role-updated'                      => 'Erfolgreich Rolle aktualisiert: :role',
        'permission-create'                 => 'Erfolgreich neue Berechtigung erstellt: :permission',
        'permission-updated'                => 'Erfolgreich Berechtigung aktualisiert: :permission',
        'successRestoredAllRoles'           => '{1} Erfolgreich :count Rolle wiederhergestellt|[2,*] Erfolgreich :count Rollen wiederhergestellt',
        'errorRestoringAllRoles'            => 'Error bei der Wiederherstellung gelöschter Rollen',
        'successDestroyedAllRoles'          => '{1} Erfolgreich :count Rolle endgültig gelöscht|[2,*] Erfolgreich :count Rollen endgültig gelöscht',
        'successDestroyedRole'              => 'Erfolgreich Rolle endgültig gelöscht: :role',
        'successRestoredRole'               => 'Erfolgreich Rolle wiederhergestellt: :role',
        'errorDestroyingAllRoles'           => 'Error bei der endgültigen Löschung gelöschter Rollen',
        'errorDeletedRoleNotFound'          => 'Gelöschte Rolle nicht gefunden',
        'errorDeletedPermissionNotFound'    => 'Gelöschte Berechtigung nicht gefunden',
        'successRestoredAllPermissions'     => '{1} Erfolgreich :count Berechtigung wiederhergestellt|[2,*] Erfolgreich :count Berechtigungen wiederhergestellt',
        'errorRestoringAllPermissions'      => 'Error bei der Wiederherstellung gelöschter Berechtigungen',
        'successDestroyedAllPermissions'    => '{1} Erfolgreich :count Berechtigung endgültig gelöscht|[2,*] Erfolgreich :count Berechtigungen endgültig gelöscht',
        'successDestroyedPermission'        => 'Erfolgreich Berechtigung endgültig gelöscht: :permission',
        'errorDestroyingAllPermissions'     => 'Error bei der endgültigen Löschung gelöschter Berechtigungen',
        'successRestoredPermission'         => 'Erfolgreich Berechtigung wiederhergestellt: :permission',
    ],

    'forms' => [
        'roles-form' => [
            'role-name' => [
                'label'         => 'Rollenname',
                'placeholder'   => 'Rollenname eingeben',
            ],
            'role-slug' => [
                'label'         => 'Rollen Slug',
                'placeholder'   => 'Rollen Slug eingeben',
            ],
            'role-desc' => [
                'label'         => 'Rollenbeschreibung',
                'placeholder'   => 'Rollenbeschreibung eingeben',
            ],
            'role-level' => [
                'label'         => 'Rollenlevel',
                'placeholder'   => 'Rollenlevel eingeben',
            ],
            'role-permissions' => [
                'label'         => 'Rollenberechtigungen',
                'placeholder'   => 'Wähle eine Berechtigung aus',
            ],
            'buttons' => [
                'save-role'     => [
                    'name'      => 'Rolle speichern',
                    'sr-icon'   => 'Rolle speichern Icon',
                ],
                'update-role'     => [
                    'name'      => 'Änderungen speichern',
                    'sr-icon'   => 'Rollen Änderungen speichern Icon',
                ],
            ],
        ],
        'permissions-form' => [
            'permission-name' => [
                'label'         => 'Berechtigungsname',
                'placeholder'   => 'Berechtigungsname eingeben',
            ],
            'permission-slug' => [
                'label'         => 'Berechtigungs Slug',
                'placeholder'   => 'Berechtigungs Slug eingeben',
            ],
            'permission-desc' => [
                'label'         => 'Berechtigungsbeschreibung',
                'placeholder'   => 'Berechtigungsbeschreibung eingeben',
            ],
            'permission-model' => [
                'label'         => 'Berechtigungsmodell',
                'placeholder'   => 'Wähle ein Berechtigungsmodell aus',
            ],
            'buttons' => [
                'save-permission'     => [
                    'name'      => 'Berechtigung speichern',
                    'sr-icon'   => 'Berechtigung speichern Icon',
                ],
                'update-permission'     => [
                    'name'      => 'Änderungen speichern',
                    'sr-icon'   => 'Änderungen der Berechtigung speichern Icon',
                ],
            ],
        ],
    ],
];
