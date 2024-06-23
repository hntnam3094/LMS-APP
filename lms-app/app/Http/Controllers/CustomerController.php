<?php

namespace App\Http\Controllers;

use App\Http\Requests\Customer\StoreCustomerRequest;
use App\Repository\CourseRepository;
use App\Repository\CustomerMapCourseRepository;
use App\Repository\CustomerRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{

    private $customerRepository;
    private $courseRepository;
    private $customerMapCourseRepository;

    public function __construct(
        CustomerRepository $customerRepository,
        CourseRepository $courseRepository,
        CustomerMapCourseRepository $customerMapCourseRepository
    ) {
        $this->customerRepository = $customerRepository;
        $this->courseRepository = $courseRepository;
        $this->customerMapCourseRepository = $customerMapCourseRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customer = $this->customerRepository->getAll();
        return Inertia::render("Customer/List",
            [
                "data" => $customer,
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $courses = $this->courseRepository->getAll();
        return Inertia::render("Customer/AddForm",
            [
                'courses' => $courses,
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $storeData = $request->only(['name', 'email', 'phone', 'status']);
        $courseIds = $request->get('courseIds');
        $customerData = $this->customerRepository->create($storeData);

        foreach ($courseIds as $courseId) {
            $this->customerMapCourseRepository->create([
                'customerId' => $customerData->id,
                'courseId' => $courseId,
            ]);
        }

        return redirect()->route('customer.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $customer = $this->customerRepository->find($id);
        $courses = $this->courseRepository->getAll();
        $courseIds = $this->customerMapCourseRepository->getCourseIdsByCustomerId($id);
        return Inertia::render("Customer/DetailForm",
            [
                'customer' => $customer,
                'courses' => $courses,
                'courseIds' => $courseIds,
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $customer = $this->customerRepository->find($id);
        $courses = $this->courseRepository->getAll();
        $courseIds = $this->customerMapCourseRepository->getCourseIdsByCustomerId($id);
        return Inertia::render("Customer/AddForm",
            [
                'customer' => $customer,
                'courses' => $courses,
                'courseIds' => $courseIds,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $updateData = $request->only(['name', 'email', 'phone', 'status']);
        $courseIds = $request->get('courseIds');

        $this->customerRepository->update($id, $updateData);

        $this->customerMapCourseRepository->deleteByCustomerId($id);
        foreach ($courseIds as $courseId) {
            $this->customerMapCourseRepository->create([
                'customerId' => $id,
                'courseId' => $courseId,
            ]);
        }
        return redirect()->route('customer.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->customerRepository->delete($id);
        return redirect()->route('customer.index');
    }
}
