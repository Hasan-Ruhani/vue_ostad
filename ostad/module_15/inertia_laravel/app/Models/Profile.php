<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    protected $fillable = [
        'designation',
        'description',
        'guideline',
        'image',
        'facebook',
        'github',
        'linkedin',
        'leetcode',
        'user_id'
    ];

    protected $casts = [
        'skill' => 'json',
    ];

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }

    // public function admin(): BelongsTo
    // {
    //     return $this->BelongsTo(Admin::class);
    // }

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function spcContact(): HasMany
    {
        return $this->hasMany(SpecificContact::class);
    }
}
