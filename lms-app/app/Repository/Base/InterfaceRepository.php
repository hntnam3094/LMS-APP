<?php

namespace App\Repository\Base;

interface InterfaceRepository
{
    public function getAll();
    public function find($id);
    public function create($params);
    public function update($id, $params);
    public function delete($id);
}
