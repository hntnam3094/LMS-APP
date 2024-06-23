import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import { Badge, Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import List from "../Lesson/List";

export default function DetailForm({ course, lessons }) {
    const { data, setData, post, errors } = useForm({
        name: course?.name,
        summary: course?.summary,
        banner: course?.banner,
        status: course?.status,
    });

    const [imageTmp, setImageTmp] = useState(data?.banner);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    useEffect(() => {
        async function convertFileToBase64() {
            if (data?.banner?.[0]) {
                try {
                    const base64 = await toBase64(data.banner[0]);
                    setImageTmp(base64);
                } catch (error) {
                    console.error("Error converting file to base64:", error);
                }
            } else {
                console.log("No file found in banner");
            }
        }

        convertFileToBase64();
    }, [data?.banner]);

    return (
        <MainLayout>
            <div className="w-full">
                <div className="flex justify-between bg-slate-100 p-[10px] rounded-md">
                    <h1 className="text-slate-600 uppercase text-[30px] font-bold">
                        Detail Course
                    </h1>
                </div>
                <div className="w-full flex">
                    <div className="w-1/3">
                        <div className="mt-5 p-[50px]">
                            <div className="flex max-w-md flex-col gap-4">
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="name"
                                            value="Course name"
                                        />
                                    </div>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        placeholder="Laravel Course"
                                        defaultValue={data?.name}
                                        disabled={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        color={errors?.summary && "failure"}
                                        helperText={errors?.name}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="summary"
                                            value="Course description"
                                        />
                                    </div>
                                    <Textarea
                                        id="summary"
                                        placeholder="Laravel is a PHP Framework ...."
                                        onChange={(e) =>
                                            setData("summary", e.target.value)
                                        }
                                        disabled={true}
                                        defaultValue={data?.summary}
                                        color={errors?.summary && "failure"}
                                        helperText={errors?.summary}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="file-upload"
                                            value="Banner"
                                        />
                                    </div>
                                    {imageTmp && (
                                        <div className="mt-[10px]">
                                            <img src={imageTmp} />
                                        </div>
                                    )}
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
                                    href={route("course.edit", {
                                        id: course?.id,
                                    })}
                                >
                                    <Button color="warning" className="w-full">
                                        Edit
                                    </Button>
                                </Link>
                                <Link href={route("course.index")}>
                                    <Button className="w-full">Back</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3">
                        <List courseId={course?.id} lessons={lessons} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
