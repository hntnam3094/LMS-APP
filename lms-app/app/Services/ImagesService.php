<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ImagesService
{
    public function automaticSaveImageFormReqest($request, $key)
    {
        if (!$request->hasFile($key)) {
            return '';
        }

        return $this->getPathAndSave($request->file($key));
    }

    public function getPathAndSave($value)
    {
        $path = '';
        if ($value && $value[0] && gettype($value[0]) != 'string') {
            $image = $value[0];
            $imgName = time() . time() . rand(100, 999) . '.' . $image->getClientOriginalExtension();
            $path = 'public/course/' . Carbon::now()->format('Ymd') . '/' . $imgName;
            Storage::disk(config('disks.public'))->put($path, file_get_contents($image));
        }
        return Storage::url($path);
    }

    public function automaticSaveFileFormReqest($request, $key)
    {
        if (!$request->hasFile($key)) {
            return '';
        }

        return $this->getPathAndSaveForFile($request->file($key));
    }

    public function getPathAndSaveForFile($value)
    {
        $path = '';
        if ($value && $value[0] && gettype($value[0]) != 'string') {
            $file = $value[0];
            $fileName = time() . pathinfo($file, PATHINFO_FILENAME) . '.' . $file->getClientOriginalExtension();
            $path = 'public/lesson/' . Carbon::now()->format('Ymd') . '/' . $fileName;
            Storage::disk(config('disks.public'))->put($path, file_get_contents($file));
        }
        return Storage::url($path);
    }
}
