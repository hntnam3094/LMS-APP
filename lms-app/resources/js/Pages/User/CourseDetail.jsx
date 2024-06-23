import Layout from "./Layout";
import { Link, router } from "@inertiajs/react";
import { Badge, Button, Table, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function ({course, lessons}) {
    return (
        <Layout>
            <h1 className="text-[40px] uppercase font-bold">
                Course name: {course?.name}
            </h1>
            <p className="w-full h-auto bg-white rounded-md p-[20px]">{course?.summary}</p>
            <div className="mt-5">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Summary</Table.HeadCell>
                    <Table.HeadCell>Updated at</Table.HeadCell>
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
                                {lesson?.updated_at}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex">
                                    <Link
                                        href={route('lessonDetail', {id: lesson?.id})}
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-[5px]"
                                    >
                                        <Button size="sm" color="success">
                                            Learn
                                        </Button>
                                    </Link>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>˝
            </div>
        </Layout>
    );
}
