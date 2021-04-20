<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id')->withDefault();
    }

    public function country()
    {
        return $this->belongsTo('App\Models\Country', 'country_id', 'id')->withDefault();
    }

    public function state()
    {
        return $this->belongsTo('App\Models\State', 'state_id', 'id')->withDefault();
    }

    public function city()
    {
        return $this->belongsTo('App\Models\City', 'city_id', 'id')->withDefault();
    }
}
