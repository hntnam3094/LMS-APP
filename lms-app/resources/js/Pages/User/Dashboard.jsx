import Layout from "./Layout";
import { Link } from "@inertiajs/react";
import { Badge, Card } from "flowbite-react";

export default function Dashboard({ courses }) {
    return (
        <Layout>
            <div className="flex flex-row gap-[20px]">
                {courses.map((course) => (
                    <Link href={route('courseDetail', {id: course?.id})}>
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
                        </Card>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}
