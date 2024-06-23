<?php

namespace App\Repository;

use App\Repository\Base\BaseRepository;

class LessonRepository extends BaseRepository
{
    public function getModel()
    {
        return \App\Models\Lesson::class;
    }

    public function getByCourseId($courseId) {
        return $this->model->where('courseId', $courseId)->get();
    }
}
