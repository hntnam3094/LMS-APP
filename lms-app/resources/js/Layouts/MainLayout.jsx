import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "flowbite-react";

export default function MainLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex min-h-screen">
                            <div className="w-1/6 px-[10px] pb-[10px]">
                                <div className="p-[30px] bg-slate-100 rounded-md h-full">
                                    <div className="flex flex-col gap-[10px]">
                                        <Link
                                            href="/office/course"
                                            as="button"
                                            type="button"
                                        >
                                            <Button
                                                color="blue"
                                                className="w-full"
                                            >
                                                Couse
                                            </Button>
                                        </Link>
                                        <Link
                                            href="/office/customer"
                                            as="button"
                                            type="button"
                                        >
                                            <Button
                                                color="blue"
                                                className="w-full"
                                            >
                                                Customer
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="w-5/6">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
