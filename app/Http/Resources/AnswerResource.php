<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
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
            'id' => $this->id,
            'question_id' => $this->question_id,
            'user' => $this->user,
            'answer' => $this->answer,
        ];

    }
}
