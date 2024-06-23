import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-[80px] px-[200px] flex items-center justify-between">
                <Link href={route('getJoinCourse')} className="text-[20px] font-bold text-slate-500">Dashboard</Link>
                <Link href={route('logoutCourse')} className="text-[15px] font-bold text-slate-500">Logout</Link>
            </div>
            <div className="bg-slate-200 h-screen px-[200px] pt-[100px]">{children}</div>
        </div>
    );
}
