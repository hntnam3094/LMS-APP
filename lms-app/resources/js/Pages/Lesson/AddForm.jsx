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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function AddForm({ courseId, lesson }) {
    const { data, setData, post, errors } = useForm({
        courseId: courseId,
        name: lesson?.name ?? "",
        summary: lesson?.summary ?? "",
        content: lesson?.content ?? "",
        document: lesson?.document ?? "",
        status: lesson?.status ?? true,
    });
    function submit(e) {
        e.preventDefault();
        if (lesson?.id) {
            post(
                route("lesson.update", { courseId: courseId, id: lesson?.id })
            );
            return;
        }
        post(route("lesson.store", { courseId: courseId }));
    }

    return (
        <MainLayout>
            <div className="w-full">
                <div className="flex justify-between bg-slate-100 p-[10px] rounded-md">
                    <h1 className="text-slate-600 uppercase text-[30px] font-bold">
                        {lesson?.id ? `EDIT` : `ADD`} Lesson
                    </h1>
                </div>
                <div className="mt-5 p-[50px]">
                    <form
                        onSubmit={submit}
                        className="flex max-w-md flex-col gap-4"
                    >
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
                                defaultValue={data?.summary}
                                color={errors?.summary && "failure"}
                                helperText={errors?.summary}
                            />
                        </div>
                        <div className="h-[300px] w-full">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="summary"
                                    value="Lesson content"
                                />
                            </div>
                            <div className="w-full h-[70%]">
                                <ReactQuill
                                    className="w-full h-full"
                                    theme="snow"
                                    value={data?.content}
                                    onChange={(e) => setData("content", e)}
                                />
                            </div>
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
                            <FileInput
                                id="file-upload"
                                onChange={(e) =>
                                    setData("document", e.target.files)
                                }
                                color={errors?.document && "failure"}
                                helperText={errors?.document}
                                accept=".pdf"
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

                        <Link href={route("course.show", { id: courseId })}>
                            <Button className="w-full">Back</Button>
                        </Link>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
