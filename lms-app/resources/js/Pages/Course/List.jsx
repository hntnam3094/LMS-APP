import MainLayout from "@/Layouts/MainLayout";
import { Link, router } from "@inertiajs/react";
import { Badge, Button, Card, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function List({ data }) {
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const deleteCourse = () => {
        router.delete(
            route("course.destroy", {
                id: deleteId,
            })
        );
        setOpenModal(false);
    };
    return (
        <MainLayout>
            <div className="w-full">
                <div className="flex justify-between bg-slate-100 p-[10px] rounded-md">
                    <h1 className="text-slate-600 uppercase text-[30px] font-bold">
                        Course List
                    </h1>
                    <Link href={route("course.create")}>
                        <Button>ADD NEW</Button>
                    </Link>
                </div>
                <div className="mt-5 flex flex-row gap-[20px]">
                    {data.map((course) => (
                        <Card
                            className="max-w-sm"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={course?.banner}
                        >
                            <Badge
                                className="uppercase w-[80px] justify-center"
                                color={
                                    course?.status === 1 ? "success" : "failure"
                                }
                            >
                                {course?.status === 1 ? "active" : "pending"}
                            </Badge>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {course?.name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {course?.summary}
                            </p>

                            <div className="flex gap-[5px]">
                                <Link
                                    href={route("course.show", {
                                        id: course?.id,
                                    })}
                                >
                                    <Button color="success" size="sm">
                                        VIEW
                                    </Button>
                                </Link>
                                <Link
                                    href={route("course.edit", {
                                        id: course?.id,
                                    })}
                                >
                                    <Button color="warning" size="sm">
                                        EDIT
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => {
                                        setDeleteId(course?.id);
                                        setOpenModal(true);
                                    }}
                                    size="sm"
                                    color="failure"
                                >
                                    Delete
                                </Button>
                                <Modal
                                    show={openModal}
                                    size="md"
                                    onClose={() => setOpenModal(false)}
                                    popup
                                >
                                    <Modal.Header />
                                    <Modal.Body>
                                        <div className="text-center">
                                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                Are you sure you want to delete
                                                this product?
                                            </h3>
                                            <div className="flex justify-center gap-4">
                                                <Button
                                                    color="failure"
                                                    onClick={deleteCourse}
                                                >
                                                    {"Yes, I'm sure"}
                                                </Button>
                                                <Button
                                                    color="gray"
                                                    onClick={() =>
                                                        setOpenModal(false)
                                                    }
                                                >
                                                    No, cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
