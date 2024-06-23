<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\JoinCourseCustomerRequest;
use App\Repository\CourseRepository;
use App\Repository\CustomerMapCourseRepository;
use App\Repository\CustomerRepository;
use App\Repository\LessonRepository;
use Inertia\Inertia;

class UserController extends Controller
{
    private $customerRepository;
    private $courseRepository;
    private $customerMapCourseRepository;
    private $lessonRepository;

    public function __construct(
        CustomerRepository $customerRepository,
        CourseRepository $courseRepository,
        CustomerMapCourseRepository $customerMapCourseRepository,
        LessonRepository $lessonRepository
    ) {
        $this->customerRepository = $customerRepository;
        $this->courseRepository = $courseRepository;
        $this->customerMapCourseRepository = $customerMapCourseRepository;
        $this->lessonRepository = $lessonRepository;
    }

    public function index() {
        $userId = $this->getUserIdFromSession();

        if (empty($userId)) {
            return Inertia::render('Welcome');
        }


        if (!empty($userId)) {
            return redirect(route("getJoinCourse"));
        }

        return Inertia::render("Welcome");
    }

    public function getJoinCourse()
    {
        $userId = $this->getUserIdFromSession();

        if (empty($userId)) {
            return Inertia::render('Welcome');
        }


        $result = $this->customerRepository->find($userId);

        if (!empty($result)) {
            $courseIds = $this->customerMapCourseRepository->getCourseIdsByCustomerId($result->id);
            $courses = $this->courseRepository->getByCourseIds($courseIds);

            return Inertia::render('User/Dashboard', ['courses' => $courses]);
        }
    }
    public function postJoinCourse(JoinCourseCustomerRequest $request)
    {
        $result = $this->customerRepository->getExistCustomerByPhoneOrEmail($request->get('phone_or_email'));

        if (!empty($result)) {
            session(["userId" => $result->id]);
            $courseIds = $this->customerMapCourseRepository->getCourseIdsByCustomerId($result->id);
            $courses = $this->courseRepository->getByCourseIds($courseIds);

            return Inertia::render("User/Dashboard",
                [
                    'courses' => $courses,
                ]
            );
        }
    }

    public function courseDetail ($id) {
        $userId = $this->getUserIdFromSession();

        if (empty($userId)) {
            return Inertia::render('Welcome');
        }

        $course = $this->courseRepository->find($id);
        $lessons = $this->lessonRepository->getByCourseId($id);

        return Inertia::render("User/CourseDetail",
                [
                    'course' => $course,
                    'lessons' => $lessons
                ]
            );
    }

    public function lessonDetail ($id) {
        $userId = $this->getUserIdFromSession();

        if (empty($userId)) {
            return Inertia::render('Welcome');
        }

        $lesson = $this->lessonRepository->find($id);

        return Inertia::render("User/LessonDetail",
                [
                    'lesson' => $lesson
                ]
            );
    }

    private function getUserIdFromSession()
    {
        return session()->has("userId") ? session()->get("userId") : null;
    }


    public function logout () {
        session(["userId" => null]);

        return Inertia::render("Welcome");
    }
}
