import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Badge,
    Button,
    Checkbox,
    FileInput,
    Label,
    Textarea,
    TextInput,
    ToggleSwitch,
} from "flowbite-react";

export default function AddForm({ customer, courses, courseIds }) {
    const { data, setData, post, errors } = useForm({
        name: customer?.name ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        status: customer?.status ?? true,
    });
    console.log(customer);
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
                            <div className="flex max-w-md flex-col gap-4">
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
                                        disabled
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
                                        disabled
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
                                        disabled
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        color={errors?.phone && "failure"}
                                        helperText={errors?.phone}
                                    />
                                </div>
                                <div>
                                    <Badge
                                        className="uppercase w-[80px] justify-center"
                                        color={
                                            data?.status === 1
                                                ? "success"
                                                : "failure"
                                        }
                                    >
                                        {data?.status === 1
                                            ? "active"
                                            : "pending"}
                                    </Badge>
                                </div>

                                <Link
                                    href={route("customer.edit", {
                                        id: customer?.id,
                                    })}
                                >
                                    <Button color="warning" className="w-full">
                                        Edit
                                    </Button>
                                </Link>
                                <Link href={route("customer.index")}>
                                    <Button className="w-full">Back</Button>
                                </Link>
                            </div>
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
                                        defaultChecked={courseIds.includes(
                                            course.id
                                        )}
                                        disabled
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
