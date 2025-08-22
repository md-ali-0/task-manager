import type { Metadata } from "next";
import Link from "next/link";

import { UserLoginForm } from "@/components/auth/user-login-form";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your Task Manager account",
};

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-6xl overflow-hidden rounded-lg shadow-lg">
                {/* Login Form Section */}
                <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col items-center">
                    <div className="mb-6">
                        <div className="w-fit h-12 bg-gray-200 rounded flex items-center justify-center text-blue-600 font-bold px-2">
                            Task Manager
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">Sign in to Task Manager</h2>
                    <UserLoginForm />
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Don’t have an account?{" "}
                        <Link href="/auth/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>

                {/* Community Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-bold mb-4">Join Our Task Manager</h2>
                    <p className="text-sm mb-6">Boost your productivity with task management tools and connect with a global network of organizers.</p>
                </div>
            </div>
        </div>
    );
}