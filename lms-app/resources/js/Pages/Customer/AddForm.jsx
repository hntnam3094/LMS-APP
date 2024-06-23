import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Button,
    Checkbox,
    FileInput,
    Label,
    Textarea,
    TextInput,
    ToggleSwitch,
} from "flowbite-react";
import { useEffect, useState } from "react";

export default function AddForm({ customer, courses, courseIds }) {
    const { data, setData, post, errors } = useForm({
        name: customer?.name ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        status: customer?.status ?? true,
        courseIds: courseIds ?? []
    });

    const [chooseCourse, setChooseCourse] = useState(courseIds);
    useEffect(() => {
        setData('courseIds', chooseCourse)
    }, [chooseCourse])

    function submit(e) {
        e.preventDefault();
        if (customer?.id) {
            post(route("customer.update", { id: customer?.id }));
            return;
        }
        post(route("customer.store"));
    }

    return (
        <MainLayout>
            <div className="w-full">
                <div className="flex justify-between bg-slate-100 p-[10px] rounded-md">
                    <h1 className="text-slate-600 uppercase text-[30px] font-bold">
                        {customer?.id ? `EDIT` : `ADD`} Customer
                    </h1>
                </div>
                <div className="w-full flex">
                    <div className="w-1/2">
                        <div className="mt-5 p-[50px]">
                            <form
                                onSubmit={submit}
                                className="flex max-w-md flex-col gap-4"
                            >
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="name"
                                            value="Customer name"
                                        />
                                    </div>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        placeholder="Harry Potter"
                                        defaultValue={data?.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        color={errors?.name && "failure"}
                                        helperText={errors?.name}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email"
                                            value="Customer email"
                                        />
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        placeholder="customer@gmail.com"
                                        defaultValue={data?.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        color={errors?.email && "failure"}
                                        helperText={errors?.email}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="name"
                                            value="Customer phone"
                                        />
                                    </div>
                                    <TextInput
                                        id="phone"
                                        type="text"
                                        placeholder="0123456789"
                                        defaultValue={data?.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        color={errors?.phone && "failure"}
                                        helperText={errors?.phone}
                                    />
                                </div>
                                <div>
                                    <ToggleSwitch
                                        checked={data.status}
                                        label="Status"
                                        onChange={(e) => setData("status", e)}
                                    />
                                </div>

                                <Button type="submit" color="warning">
                                    Submit
                                </Button>
                                <Link href={route("customer.index")}>
                                    <Button className="w-full">Back</Button>
                                </Link>
                            </form>
                        </div>
                    </div>
                    <div className="w-1/2 mt-[50px]">
                        <div className="mb-2 block">
                            <Label value="Course" />
                        </div>
                        {courses?.map((course, key) => (
                            <div
                                className="flex max-w-md flex-col gap-4"
                                id="checkbox"
                                key={key}
                            >
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id={`accept-${course.id}`}
                                        defaultChecked={chooseCourse?.includes(course.id) ?? false}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setChooseCourse((prev) => [...prev, course.id]);
                                            } else {
                                                setChooseCourse((prev) => prev.filter((id) => id !== course.id));
                                            }
                                        }}
                                    />
                                    <Label htmlFor="accept" className="flex">
                                        {course?.name}
                                    </Label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
