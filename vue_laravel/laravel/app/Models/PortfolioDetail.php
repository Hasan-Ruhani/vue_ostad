<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PortfolioDetail extends Model
{
    protected $fillable = [
        'category_id',
        'head_line',
        'description',
        'client',
        'duration',
        'project_url',
        'problem',
        'result',
        'status'
    ];

    protected $casts = [
        'name' => 'json',
    ];

    public function solutions()
    {
        return $this->belongsToMany(Solution::class, 'portfolio_solutions', 'portfolio_id', 'solution_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'portfolio_tags', 'portfolio_id', 'tag_id');
    }
    


    public function category(): BelongsTo   // This means many portfolio falls under one category.
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class, 'portfolio_id');
    }

}
