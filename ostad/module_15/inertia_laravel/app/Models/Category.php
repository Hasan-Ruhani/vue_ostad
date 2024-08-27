<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['name', 'status'];
    protected $hidden = ['created_at', 'updated_at'];

    public function portfolio(): HasMany   // This means many portfolio falls under one category.
    {
        return $this->hasMany(PortfolioDetail::class);
    }

}
