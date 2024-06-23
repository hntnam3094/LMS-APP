<?php

namespace App\Repository;

use App\Repository\Base\BaseRepository;

class CustomerRepository extends BaseRepository
{

    public function getModel()
    {
        return \App\Models\Customer::class;
    }

    public function getExistCustomerByPhoneOrEmail($value)
    {
        return $this->model->where('phone', $value)
            ->orWhere('email', $value)
            ->first();
    }
}
