<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpecificContact extends Model
{
    protected $fillable = [
        'profile_id', 
        'user_email', 
        'client_name', 
        'client_email', 
        'whatsapp', 
        'skype', 
        'message'
    ];

    public function user(): BelongsTo
    {
        return $this->BelongsTo(Profile::class);
    }
}
