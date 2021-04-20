<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VisitorRequest;
use App\Models\Visitor;
use App\Services\VisitorService;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(VisitorRequest $request, VisitorService $service)
    {
        $result = $service->getAll();
        return $result;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(VisitorRequest $request, VisitorService $service)
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
    public function store(VisitorRequest $request, VisitorService $service)
    {
        //
        return $service->create($request->validated());

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Visitor  $Visitor
     * @return \Illuminate\Http\Response
     */
    public function show(Visitor $visitor)
    {
        echo "I am in visitor show";exit();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Visitor  $Visitor
     * @return \Illuminate\Http\Response
     */
    public function edit(Visitor $Visitor)
    {
        echo "i am in edit";exit();
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Visitor  $Visitor
     * @return \Illuminate\Http\Response
     */
    public function update(VisitorRequest $request, VisitorService $service)
    {
        return $service->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Visitor  $Visitor
     * @return \Illuminate\Http\Response
     */
    public function destroy(VisitorRequest $request, $id, VisitorService $service)
    {
        return $service->delete($id);
    }

    public function visitorByUserId(VisitorRequest $request, VisitorService $service)
    {
        return $service->visitorByUserId($request->validated());
    }
}
