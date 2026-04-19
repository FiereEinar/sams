<?php

namespace App\Enums;

class Permission
{
    // Dashboard
    public const DashboardView = 'DASHBOARD_VIEW';

    // Events
    public const EventsView = 'EVENTS_VIEW';

    public const EventsCreate = 'EVENTS_CREATE';

    public const EventsUpdate = 'EVENTS_UPDATE';

    public const EventsDelete = 'EVENTS_DELETE';

    // Attendance
    public const AttendanceView = 'ATTENDANCE_VIEW';

    public const AttendanceRecord = 'ATTENDANCE_RECORD';

    // Masterlist
    public const MasterlistView = 'MASTERLIST_VIEW';

    public const MasterlistCreate = 'MASTERLIST_CREATE';

    public const MasterlistUpdate = 'MASTERLIST_UPDATE';

    public const MasterlistDelete = 'MASTERLIST_DELETE';

    public const MasterlistImport = 'MASTERLIST_IMPORT';

    // Settings
    public const SettingsView = 'SETTINGS_VIEW';

    public const SettingsAppearanceUpdate = 'SETTINGS_APPEARANCE_UPDATE';

    public const SettingsLayoutUpdate = 'SETTINGS_LAYOUT_UPDATE';

    public const SettingsBrandingUpdate = 'SETTINGS_BRANDING_UPDATE';

    // Users
    public const UsersView = 'USERS_VIEW';

    public const UsersCreate = 'USERS_CREATE';

    public const UsersUpdate = 'USERS_UPDATE';

    public const UsersDelete = 'USERS_DELETE';

    // Roles
    public const RolesView = 'ROLES_VIEW';

    public const RolesCreate = 'ROLES_CREATE';

    public const RolesUpdate = 'ROLES_UPDATE';

    public const RolesDelete = 'ROLES_DELETE';

    // Support
    public const SupportView = 'SUPPORT_VIEW';

    public const SupportCreate = 'SUPPORT_CREATE';

    // System Updates
    public const SystemUpdateView = 'SYSTEM_UPDATE_VIEW';

    public const SystemUpdateApply = 'SYSTEM_UPDATE_APPLY';

    /**
     * Get all permissions as a flat array.
     *
     * @return list<string>
     */
    public static function all(): array
    {
        return array_merge(...array_values(self::grouped()));
    }

    /**
     * Get permissions grouped by module for the checklist UI.
     *
     * @return array<string, list<string>>
     */
    public static function grouped(): array
    {
        return [
            'Dashboard' => [
                self::DashboardView,
            ],
            'Events' => [
                self::EventsView,
                self::EventsCreate,
                self::EventsUpdate,
                self::EventsDelete,
            ],
            'Attendance' => [
                self::AttendanceView,
                self::AttendanceRecord,
            ],
            'Masterlist' => [
                self::MasterlistView,
                self::MasterlistCreate,
                self::MasterlistUpdate,
                self::MasterlistDelete,
                self::MasterlistImport,
            ],
            'Settings' => [
                self::SettingsView,
                self::SettingsAppearanceUpdate,
                self::SettingsLayoutUpdate,
                self::SettingsBrandingUpdate,
            ],
            'Users' => [
                self::UsersView,
                self::UsersCreate,
                self::UsersUpdate,
                self::UsersDelete,
            ],
            'Roles' => [
                self::RolesView,
                self::RolesCreate,
                self::RolesUpdate,
                self::RolesDelete,
            ],
            'Support' => [
                self::SupportView,
                self::SupportCreate,
            ],
            'System' => [
                self::SystemUpdateView,
                self::SystemUpdateApply,
            ],
        ];
    }
}
