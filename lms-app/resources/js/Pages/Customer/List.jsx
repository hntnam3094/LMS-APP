import MainLayout from "@/Layouts/MainLayout";
import { Link, router } from "@inertiajs/react";
import { Badge, Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function List({ data }) {
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const deleteLesson = () => {
        router.delete(
            route("customer.destroy", {
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
                        Customer List
                    </h1>
                    <Link href={route("customer.create")}>
                        <Button>ADD NEW</Button>
                    </Link>
                </div>
                <div className="mt-5 flex flex-row gap-[20px] w-full">
                    <Table hoverable className="w-full">
                        <Table.Head>
                            <Table.HeadCell>STT</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Phone</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data?.map((item, key) => (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={key}
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {key+1}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {item?.name}
                                    </Table.Cell>
                                    <Table.Cell>{item?.email}</Table.Cell>
                                    <Table.Cell>{item?.phone}</Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            className="uppercase w-[80px] justify-center"
                                            color={
                                                item?.status === 1
                                                    ? "success"
                                                    : "failure"
                                            }
                                        >
                                            {item?.status === 1
                                                ? "active"
                                                : "pending"}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex">
                                            <Link
                                                href={route("customer.show", {
                                                    id: item?.id,
                                                })}
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-[5px]"
                                            >
                                                <Button
                                                    size="sm"
                                                    color="success"
                                                >
                                                    View
                                                </Button>
                                            </Link>
                                            <Link
                                                href={route("customer.edit", {
                                                    id: item?.id,
                                                })}
                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-[5px]"
                                            >
                                                <Button
                                                    size="sm"
                                                    color="warning"
                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => {
                                                    setDeleteId(item?.id);
                                                    setOpenModal(true);
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
                                                        Are you sure you want to
                                                        delete this product?
                                                    </h3>
                                                    <div className="flex justify-center gap-4">
                                                        <Button
                                                            color="failure"
                                                            onClick={
                                                                deleteLesson
                                                            }
                                                        >
                                                            {"Yes, I'm sure"}
                                                        </Button>
                                                        <Button
                                                            color="gray"
                                                            onClick={() =>
                                                                setOpenModal(
                                                                    false
                                                                )
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
            </div>
        </MainLayout>
    );
}
