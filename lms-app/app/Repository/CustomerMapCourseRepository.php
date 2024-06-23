<?php

namespace App\Repository;

use App\Repository\Base\BaseRepository;

class CustomerMapCourseRepository extends BaseRepository
{

    public function getModel()
    {
        return \App\Models\CustomerMapCourse::class;
    }

    public function getCourseIdsByCustomerId($customerId)
    {
        return $this->model->where("customerId", $customerId)
            ->pluck('courseId');
    }

    public function deleteByCustomerId($customerId)
    {
        $records = $this->model->where('customerId', $customerId);

        if ($records->exists()) {
            $records->delete();
        }
    }
}
