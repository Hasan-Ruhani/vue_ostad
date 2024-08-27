<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    protected $fillable = ['name'];
    protected $hidden = ['created_at', 'updated_at'];

    public function portfolioDetails()
    {
        return $this->belongsToMany(PortfolioDetail::class, 'portfolio_solutions', 'solution_id', 'portfolio_id');
    }
}
