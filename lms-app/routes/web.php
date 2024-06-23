<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('/office')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('DashboardAdmin');
    });
    // Course Routers
    Route::get('/course', [CourseController::class, 'index'])->name('course.index');
    Route::get('/course/create', [CourseController::class, 'create'])->name('course.create');
    Route::post('/course/store', [CourseController::class,'store'])->name('course.store');
    Route::get('/course/edit/{id}', [CourseController::class, 'edit'])->name('course.edit');
    Route::get('/course/show/{id}', [CourseController::class, 'show'])->name('course.show');
    Route::post('/course/update/{id}', [CourseController::class, 'update'])->name('course.update');
    Route::delete('/course/destroy/{id}', [CourseController::class,'destroy'])->name('course.destroy');

    // Lesson Routers
    Route::prefix('/course/{courseId}')->group(function () {
        Route::get('/lesson/create', [LessonController::class, 'create'])->name('lesson.create');
        Route::post('/lesson/store', [LessonController::class,'store'])->name('lesson.store');
        Route::get('/lesson/edit/{id}', [LessonController::class, 'edit'])->name('lesson.edit');
        Route::get('/lesson/show/{id}', [LessonController::class, 'show'])->name('lesson.show');
        Route::post('/lesson/update/{id}', [LessonController::class, 'update'])->name('lesson.update');
        Route::delete('/lesson/destroy/{id}', [LessonController::class,'destroy'])->name('lesson.destroy');
    });

    // Customer Routers
    Route::get('/customer', [CustomerController::class, 'index'])->name('customer.index');
    Route::get('/customer/create', [CustomerController::class, 'create'])->name('customer.create');
    Route::post('/customer/store', [CustomerController::class,'store'])->name('customer.store');
    Route::get('/customer/edit/{id}', [CustomerController::class, 'edit'])->name('customer.edit');
    Route::get('/customer/show/{id}', [CustomerController::class, 'show'])->name('customer.show');
    Route::post('/customer/update/{id}', [CustomerController::class, 'update'])->name('customer.update');
    Route::delete('/customer/destroy/{id}', [CustomerController::class,'destroy'])->name('customer.destroy');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

Route::get('/', [UserController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [UserController::class, 'getJoinCourse'])->name('getJoinCourse');
Route::get('/course/{id}', [UserController::class, 'courseDetail'])->name('courseDetail');
Route::get('/lesson/{id}', [UserController::class, 'lessonDetail'])->name('lessonDetail');
Route::get('/lesson/download/{id}', [LessonController::class,'download'])->name('lesson.download');
Route::post('/postJoinCourse', [UserController::class, 'postJoinCourse'])->name('postJoinCourse');
Route::get('/logout', [UserController::class, 'logout'])->name('logoutCourse');

require __DIR__ . '/auth.php';
