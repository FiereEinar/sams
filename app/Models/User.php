<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'tenant_id',
        'plan',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * @return BelongsToMany<Role, $this>
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    /**
     * Check if the user has a specific permission through any of their roles.
     */
    public function hasPermission(string $permission): bool
    {
        return $this->roles->contains(fn (Role $role) => $role->hasPermission($permission));
    }

    /**
     * Get all permissions from all assigned roles (merged, unique).
     *
     * @return list<string>
     */
    public function getAllPermissions(): array
    {
        return $this->roles
            ->flatMap(fn (Role $role) => $role->permissions ?? [])
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Check if the user is active based on plan matching.
     * Users created under premium are blocked if tenant downgrades to basic.
     */
    public function isActive(): bool
    {
        if ($this->plan !== 'premium') {
            return true;
        }

        // If user was created on premium, they're only active if tenant is still premium
        $tenant = tenant();

        if (! $tenant) {
            return true;
        }

        return ($tenant->plan ?? 'basic') === 'premium';
    }
}
