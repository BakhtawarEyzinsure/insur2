<?php

namespace App\Http\Resources;

use App\Http\Resources\AgentLicenseTypesResource;
use Illuminate\Http\Resources\Json\JsonResource;

class AgencyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'mobile' => $this->mobile,
            'landline' => $this->landline,
            'user' => $this->user,
            'country' => $this->country,
            'state' => $this->state,
            'licenses' => AgentLicenseTypesResource::collection($this->licenses),
            'city' => $this->city,
            'homepage' => $this->homepage,
            'logo' => $this->logo,
        ];
    }
}
