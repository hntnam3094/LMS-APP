import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Button,
    FileInput,
    Label,
    Textarea,
    TextInput,
    ToggleSwitch,
} from "flowbite-react";
import { useEffect, useState } from "react";

export default function AddForm({ course }) {
    const { data, setData, post, errors } = useForm({
        name: course?.name ?? "",
        summary: course?.summary ?? "",
        banner: course?.banner ?? "",
        status: course?.status ?? true,
    });

    const [imageTmp, setImageTmp] = useState(data?.banner);

    function submit(e) {
        e.preventDefault();
        if (course?.id) {
            post(route("course.update", { id: course?.id }));
            return;
        }
        post(route("course.store"));
    }

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
                        {course?.id ? `EDIT` : `ADD`} Course
                    </h1>
                </div>
                <div className="mt-5 p-[50px]">
                    <form
                        onSubmit={submit}
                        className="flex max-w-md flex-col gap-4"
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Course name" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Laravel Course"
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
                                defaultValue={data?.summary}
                                color={errors?.summary && "failure"}
                                helperText={errors?.summary}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="file-upload" value="Banner" />
                            </div>
                            <FileInput
                                id="file-upload"
                                onChange={(e) =>
                                    setData("banner", e.target.files)
                                }
                                color={errors?.banner && "failure"}
                                helperText={errors?.banner}
                                accept="image/*"
                            />

                            {imageTmp && (
                                <div className="mt-[10px]">
                                    <img src={imageTmp} />
                                </div>
                            )}
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
                        <Link href={route("course.index")}>
                            <Button className="w-full">Back</Button>
                        </Link>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
