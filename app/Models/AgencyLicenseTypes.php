<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgencyLicenseTypes extends Model
{
    use HasFactory;
    protected $fillable = [
        'state_id',
        'license_type_id',
        'agency_id',
        'license_no',
    ];

    public function agency()
    {
        return $this->belongsTo('App\Models\Agency');
    }
    public function state()
    {
        return $this->belongsTo('App\Models\State');
    }
    public function licenseType()
    {
        return $this->belongsTo('App\Models\LicenseType');
    }

}
