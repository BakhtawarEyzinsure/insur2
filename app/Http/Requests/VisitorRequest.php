<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VisitorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'sometimes',
            'name' => 'sometimes',
            'address' => 'sometimes',
            'mobile' => 'sometimes',
            'landline' => 'sometimes',
            'user_id' => 'sometimes',
            'country_id' => 'sometimes',
            'state_id' => 'sometimes',
            'city_id' => 'sometimes',
        ];

    }
}
