<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Image extends Model
{
    protected $fillable = [
        'portfolio_id', 
        'filename'
    ];
    protected $hidden = ['created_at', 'updated_at'];

    public function portfolio()
    {
        return $this->belongsTo(PortfolioDetail::class);
    }
}
