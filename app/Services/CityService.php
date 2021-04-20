<?php

namespace App\Services;

use App\Http\Resources\CityResource;
use App\Models\City;

class CityService
{
    public function getAll()
    {
        return CityResource::collection(City::orderBy('name', 'ASC')->get());
    }

    public function create($data)
    {
        $city = City::create($data);
        return new CityResource($city);
    }

    public function update($data)
    {
        $name = $data['name'];

        $id = $data['id'];
        $city = City::find($id);

        $city->name = $name;

        $city->save();

        // $city = City::update($data);
        return new CityResource($city);

    }

    public function delete($data)
    {
        // $id = $data['id'];
        $city = City::find($data);
        $city->delete();
    }

    public function citiesByStateId($data)
    {
        if (gettype($data['id']) == 'integer') {

            $id = $data['id'];
            $cities = City::where('state_id', $id)->orderBy('name', 'ASC')->get();
            return CityResource::collection($cities);

        } else {
            $cities = City::orderBy('name', 'ASC')->get();
            return CityResource::collection($cities);
        }

        return null;

    }

}
