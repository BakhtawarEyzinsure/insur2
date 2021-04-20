<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgentLicenseTypesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // $metaFalse = $request->get('meta') == 'false' ? true : false;
        // $isAdmin = Auth::check() ? Auth::guard('api')->user()->is_admin : false;

        return [
            'state' => $this->state,
            'licenseType' => $this->licenseType,
            'license_no' => $this->license_no,
        ];

    }
}
