<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LicenseTypeRequest;
use App\Models\LicenseType;
use App\Services\LicenseTypeService;
use Illuminate\Http\Request;

class LicenseTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(LicenseTypeRequest $request, LicenseTypeService $service)
    {
        $result = $service->getAll();
        return $result;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(LicenseTypeRequest $request, LicenseTypeService $service)
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
    public function store(LicenseTypeRequest $request, LicenseTypeService $service)
    {
        //
        return $service->create($request->validated());

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LicenseType  $LicenseType
     * @return \Illuminate\Http\Response
     */
    public function show(LicenseType $LicenseType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LicenseType  $LicenseType
     * @return \Illuminate\Http\Response
     */
    public function edit(LicenseType $LicenseType)
    {
        echo "i am in edit";exit();
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LicenseType  $LicenseType
     * @return \Illuminate\Http\Response
     */
    public function update(LicenseTypeRequest $request, LicenseTypeService $service)
    {
        return $service->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LicenseType  $LicenseType
     * @return \Illuminate\Http\Response
     */
    public function destroy(LicenseTypeRequest $request, $id, LicenseTypeService $service)
    {
        return $service->delete($id);
    }
}
