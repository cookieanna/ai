import { Navbar } from "@/components/nav-bar"
import Sidebar from "@/components/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className=" flex">
            <div className="hidden md:flex flex-col w-72 
    bg-gray-800 fixed inset-y-0 z-[80]">
        <Sidebar/>
               
            </div>
            <main className="w-full md:pl-72 bg-red-200">
                <Navbar />
                {children}
            </main>
        </div>
    )
}
