<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    protected $fillable = [
        'client_name', 
        'client_email', 
        'whatsapp', 
        'skype', 
        'message',
        'user_id'
    ];

    // public function user(): BelongsTo
    // {
    //     return $this->BelongsTo(User::class);
    // }
}
