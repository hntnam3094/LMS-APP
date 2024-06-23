import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Button,
    FileInput,
    Label,
    Textarea,
    TextInput,
    ToggleSwitch,
    Badge,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function DetailForm({ courseId, lesson }) {
    const { data, setData, post, errors } = useForm({
        courseId: courseId,
        name: lesson?.name ?? "",
        summary: lesson?.summary ?? "",
        content: lesson?.content ?? "",
        document: lesson?.document ?? "",
        status: lesson?.status ?? true,
    });

    return (
        <MainLayout>
            <div className="w-full">
                <div className="flex justify-between bg-slate-100 p-[10px] rounded-md">
                    <h1 className="text-slate-600 uppercase text-[30px] font-bold">
                        {lesson?.id ? `EDIT` : `ADD`} Lesson
                    </h1>
                </div>
                <div className="mt-5 p-[50px]">
                    <div className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Lesson name" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Laravel Lesson"
                                defaultValue={data?.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                disabled
                                color={errors?.name && "failure"}
                                helperText={errors?.name}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="summary"
                                    value="Lesson description"
                                />
                            </div>
                            <Textarea
                                id="summary"
                                placeholder="Lesson is a PHP Framework ...."
                                onChange={(e) =>
                                    setData("summary", e.target.value)
                                }
                                disabled
                                defaultValue={data?.summary}
                                color={errors?.summary && "failure"}
                                helperText={errors?.summary}
                            />
                        </div>
                        <div className=" h-auto w-full">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="summary"
                                    value="Lesson content"
                                />
                            </div>
                            <div
                                className="w-full"
                                dangerouslySetInnerHTML={{
                                    __html: data?.content,
                                }}
                            ></div>
                            {errors?.content && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {errors?.content}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="file-upload" value="Document" />
                            </div>
                            <Link
                                href={route("lesson.download", {
                                    courseId: courseId,
                                    id: lesson?.id,
                                })}
                            >
                                <Button
                                    color="success"
                                    className="flex items-center justify-center gap-[10px]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-cloud-arrow-down"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"
                                        />
                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <Badge
                                className="uppercase w-[80px] justify-center"
                                color={
                                    data?.status === 1 ? "success" : "failure"
                                }
                            >
                                {data?.status === 1 ? "active" : "pending"}
                            </Badge>
                        </div>

                        <Link
                            href={route("lesson.edit", {
                                courseId: courseId,
                                id: lesson?.id,
                            })}

                        >
                            <Button color="warning" className="w-full">Edit</Button>
                        </Link>
                        <Link
                            href={route("course.show", { id: courseId })}

                        >
                            <Button className="w-full">Back</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
