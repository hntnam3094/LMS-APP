<?php

namespace App\Http\Requests\User;

use App\Repository\CustomerRepository;
use Illuminate\Foundation\Http\FormRequest;

class JoinCourseCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'phone_or_email' => [
                'required',
                function ($attribute, $value, $fail) {
                    $customerRepostory = new CustomerRepository();
                    $result = $customerRepostory->getExistCustomerByPhoneOrEmail($value);
                    if (empty($result)) {
                        return $fail('Your Phone or Email do not exist!!!');
                    }
                }
            ]
        ];
    }
}
