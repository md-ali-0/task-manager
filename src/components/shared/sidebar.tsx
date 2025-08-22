import { cn } from "@/lib/utils";
import { useSession } from "@/provider/session-provider";
import { signout } from "@/service/auth";
import { LayoutDashboard, ListTodo, LogOut, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: ListTodo, label: "Tasks", href: "/tasks" },
    { icon: User, label: "Profile", href: "/profile" },
];

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const pathname = usePathname();
    const { setIsLoading } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            localStorage.removeItem("token");
            await signout();
            setIsLoading(false);
            toast.success("Logout Successfully");
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
                    <span className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Taskify
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {sidebarItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                                        pathname === item.href &&
                                            "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t dark:border-gray-700">
                    <Button onClick={handleLogout} variant="outline" className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </div>
        </aside>
    );
}
