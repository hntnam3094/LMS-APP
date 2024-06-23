<?php

namespace App\Repository\Base;

use App\Repository\Base\InterfaceRepository;

abstract class BaseRepository implements InterfaceRepository
{
    protected $model;

    public function __construct()
    {
        $this->setModel();
    }

    abstract public function getModel();

    public function setModel()
    {
        return $this->model = app()->make($this->getModel());
    }

    public function getAll()
    {
        return $this->model->all();
    }
    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create($params)
    {
        return $this->model->create($params);
    }

    public function update($id, $params)
    {
        $result = $this->model->find($id);

        if (!empty($result)) {
            $this->model->where('id', $id)
                        ->update($params);
            return true;
        }

        return false;
    }

    public function delete($id)
    {
        $result = $this->model->find($id);
        if (!empty($result)) {
            $result->delete();
            return true;
        }

        return false;
    }

}
