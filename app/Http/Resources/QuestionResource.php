<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
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
            'question' => $this->question,
            'user_id' => $this->user_id,
            'answers' => $this->answers,
            'categories' => $this->categories,
            'subcategories' => $this->subcategories,
        ];

    }
}
