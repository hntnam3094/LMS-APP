<?php

namespace App\Repository;

use App\Repository\Base\BaseRepository;

class CourseRepository extends BaseRepository
{
    public function getModel()
    {
        return \App\Models\Course::class;
    }

    public function getByCourseIds($ids) {
        return $this->model->whereIn("id", $ids)->get();
    }
}
