<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{

    protected $fillable = ['name', 'username', 'email', 'password', 'status', 'otp', 'role'];
    protected $hidden = ['password', 'created_at', 'updated_at', 'otp'];
    protected $attributes = [
        'otp' => '0'
    ];

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function adminProfile(): HasOne
    {
        return $this->hasOne(AdminProfile::class);
    }

    public function review(): HasMany
    {
        return $this->hasMany(Review::class);
    }


    // public function contact(): HasMany
    // {
    //     return $this->hasMany(Contact::class);
    // }
}
