<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $fillable = [
        'question',
        'user_id',
    ];

    public function categories()
    {
        return $this->belongsToMany('App\Models\Category')->withTimestamps();
    }

    public function subcategories()
    {
        return $this->belongsToMany('App\Models\Subcategory')->withTimestamps();
    }

    public function answers()
    {
        return $this->belongsToMany('App\Models\Answer')->withTimestamps();
    }

}
