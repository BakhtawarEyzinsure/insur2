<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnswerRequest;
use App\Models\Answer;
use App\Services\AnswerService;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(AnswerRequest $request, AnswerService $service)
    {
        $result = $service->getAll();
        return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(AnswerRequest $request, AnswerService $service)
    {
        // echo "Bakhtawar";exit();

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
    public function store(AnswerRequest $request, AnswerService $service)
    {
        return $service->create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Answer  $Answer
     * @return \Illuminate\Http\Response
     */
    public function show(Answer $Answer)
    {
        echo "bakhtawar123";exit();
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Answer  $Answer
     * @return \Illuminate\Http\Response
     */
    public function edit(Answer $Answer)
    {
        echo "i am in edit";exit();
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Answer  $Answer
     * @return \Illuminate\Http\Response
     */
    public function update(AnswerRequest $request, AnswerService $service)
    {
        return $service->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Answer  $Answer
     * @return \Illuminate\Http\Response
     */
    public function destroy(AnswerRequest $request, $id, AnswerService $service)
    {
        return $service->delete($id);
    }
}
