import { Link, router } from "@inertiajs/react";
import { Badge, Button, Table, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function List({ courseId, lessons }) {
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const deleteLesson = () => {
        router.delete(
            route("lesson.destroy", {
                courseId: courseId,
                id: deleteId,
            })
        );
        setOpenModal(false);
    };
    return (
        <div className="overflow-x-auto mt-5">
            <div className="flex justify-end mb-5">
                <Link
                    href={route("lesson.create", {
                        courseId: courseId,
                    })}
                >
                    <Button>Add Lession</Button>
                </Link>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Summary</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {lessons?.map((lesson, key) => (
                        <Table.Row
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            key={key}
                        >
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {lesson?.name}
                            </Table.Cell>
                            <Table.Cell>{lesson?.summary}</Table.Cell>
                            <Table.Cell>
                                <Badge
                                    className="uppercase w-[80px] justify-center"
                                    color={
                                        lesson?.status === 1
                                            ? "success"
                                            : "failure"
                                    }
                                >
                                    {lesson?.status === 1
                                        ? "active"
                                        : "pending"}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex">
                                    <Link
                                        href={route("lesson.show", {
                                            courseId: courseId,
                                            id: lesson?.id,
                                        })}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-[5px]"
                                    >
                                        <Button size="sm" color="success">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={route("lesson.edit", {
                                            courseId: courseId,
                                            id: lesson?.id,
                                        })}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-[5px]"
                                    >
                                        <Button size="sm" color="warning">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            setDeleteId(lesson?.id)
                                            setOpenModal(true)
                                        }}
                                        size="sm"
                                        color="failure"
                                    >
                                        Delete
                                    </Button>
                                </div>
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
                                                    onClick={deleteLesson}
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
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
