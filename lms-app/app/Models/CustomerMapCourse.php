<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerMapCourse extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'customerId',
        'courseId'
    ];
}
