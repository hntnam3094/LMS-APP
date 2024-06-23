<?php

namespace App\Http\Controllers;

use App\Http\Requests\Course\StoreCourseRequest;
use App\Repository\CourseRepository;
use App\Repository\LessonRepository;
use App\Services\ImagesService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    private $courseRepository;
    private $lessonRepository;
    private $imageService;

    public function __construct(
        CourseRepository $courseRepository,
        LessonRepository $lessonRepository,
        ImagesService $imagesService)
    {
        $this->courseRepository = $courseRepository;
        $this->lessonRepository = $lessonRepository;
        $this->imageService = $imagesService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = $this->courseRepository->getAll();

        return Inertia::render("Course/List",
            [
                "data" => $courses,
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Course/AddForm");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $storeData = $request->only(['name', 'summary', 'status']);

        if ($request->hasFile('banner')) {
            $storeData['banner'] = $this->imageService->automaticSaveImageFormReqest($request, 'banner');
        }
        $this->courseRepository->create($storeData);
        return redirect(route('course.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = $this->courseRepository->find($id);
        $lessons = $this->lessonRepository->getByCourseId($id);
        return Inertia::render("Course/DetailForm",
            [
                "course" => $course,
                'lessons' => $lessons
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $course = $this->courseRepository->find($id);
        return Inertia::render("Course/AddForm",
            [
                "course" => $course,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $updateData = $request->only(['name', 'summary', 'status']);

        if ($request->hasFile('banner')) {
            $updateData['banner'] = $this->imageService->automaticSaveImageFormReqest($request, 'banner');
        }

        $this->courseRepository->update($id, $updateData);
        return redirect()->route('course.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->courseRepository->delete($id);
        return redirect(route("course.index"));
    }
}
