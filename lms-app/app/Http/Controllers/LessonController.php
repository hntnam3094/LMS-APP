<?php

namespace App\Http\Controllers;

use App\Http\Requests\Lesson\StoreLessonRequest;
use App\Repository\LessonRepository;
use App\Services\ImagesService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class LessonController extends Controller
{

    private $lessonRepository;
    private $imageService;

    public function __construct(
        LessonRepository $lessonRepository,
        ImagesService $imageService
    ) {
        $this->lessonRepository = $lessonRepository;
        $this->imageService = $imageService;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($courseId)
    {
        return Inertia::render("Lesson/AddForm", ['courseId' => $courseId]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        $storeData = $request->only(['courseId', 'name', 'summary', 'content', 'status']);

        if ($request->hasFile('document')) {
            $storeData['document'] = $this->imageService->automaticSaveFileFormReqest($request, 'document');
        }

        $this->lessonRepository->create($storeData);
        return redirect(route('course.show', [
            'id' => $request->get('courseId'),
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show($courseId, $id)
    {
        $lesson = $this->lessonRepository->find($id);
        return Inertia::render("Lesson/DetailForm", [
            'courseId' => $courseId,
            'lesson' => $lesson,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($courseId, $id)
    {
        $lesson = $this->lessonRepository->find($id);
        return Inertia::render("Lesson/AddForm", [
            'courseId' => $courseId,
            'lesson' => $lesson,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $courseId, $id)
    {
        $updateData = $request->only(['courseId', 'name', 'summary', 'content', 'status']);

        if ($request->hasFile('document')) {
            $updateData['document'] = $this->imageService->automaticSaveImageFormReqest($request, 'document');
        }

        $this->lessonRepository->update($id, $updateData);
        return redirect()->route('course.show', ['id' => $courseId]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($courseId, $id)
    {
        $this->lessonRepository->delete($id);
        return redirect()->route('course.show', ['id' => $courseId]);
    }

    public function download($courseId, $id)
    {
        $lesson = $this->lessonRepository->find($id);
        if (empty($lesson->document)) {
            return response()->json(['error' => 'Document not found.'], 404);
        }
        $file = public_path($lesson->document);

        if (!file_exists($file)) {
            return response()->json(['error' => 'File does not exist.'], 404);
        }
        $headers = [
            'Content-Type' => 'application/pdf',
        ];

        return response()->download($file, basename($file), $headers);
    }

}
