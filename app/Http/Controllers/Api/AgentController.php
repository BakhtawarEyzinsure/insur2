<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AgentRequest;
use App\Models\Agent;
use App\Services\AgentService;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AgentRequest $request, AgentService $service)
    {
        $result = $service->getAll();
        return $result;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(AgentRequest $request, AgentService $service)
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
    public function store(AgentRequest $request, AgentService $service)
    {
        return $service->create($request->validated());

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Agent  $Agent
     * @return \Illuminate\Http\Response
     */
    public function show(Agent $Agent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Agent  $Agent
     * @return \Illuminate\Http\Response
     */
    public function edit(Agent $Agent)
    {
        echo "i am in edit";exit();
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Agent  $Agent
     * @return \Illuminate\Http\Response
     */
    public function update(AgentRequest $request, AgentService $service)
    {
        return $service->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Agent  $Agent
     * @return \Illuminate\Http\Response
     */
    public function destroy(AgentRequest $request, $id, AgentService $service)
    {
        return $service->delete($id);
    }

    public function agentByUserId(AgentRequest $request, AgentService $service)
    {
        $return = $service->agentByUserId($request->validated());
        return $return;
    }
}
