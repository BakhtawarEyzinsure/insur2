<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AgencyRequest;
use App\Models\Agency;
use App\Services\AgencyService;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AgencyRequest $request, AgencyService $service)
    {
        $result = $service->getAll();
        return $result;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(AgencyRequest $request, AgencyService $service)
    {
        // echo $request->input();
        // echo "<pre>";
        // print_r($request);
        // echo "</pre>";
        // exit();

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AgencyRequest $request, AgencyService $service)
    {
        //
        return $service->create($request->validated());

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Agency  $Agency
     * @return \Illuminate\Http\Response
     */
    public function show(Agency $Agency)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Agency  $Agency
     * @return \Illuminate\Http\Response
     */
    public function edit(Agency $Agency)
    {
        echo "i am in edit";exit();
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Agency  $Agency
     * @return \Illuminate\Http\Response
     */
    public function update(AgencyRequest $request, AgencyService $service)
    {
        return $service->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Agency  $Agency
     * @return \Illuminate\Http\Response
     */
    public function destroy(AgencyRequest $request, $id, AgencyService $service)
    {
        return $service->delete($id);
    }

    public function agencyByUserId(AgencyRequest $request, AgencyService $service)
    {
        return $service->agencyByUserId($request->validated());
    }

    public function updateAgencyLicenses(Request $request, AgencyService $service)
    {
        return $service->updateAgencyLicenses($request);
    }
}
