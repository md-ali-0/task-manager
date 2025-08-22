"use client"
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        notFound();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-6xl overflow-hidden rounded-lg shadow-lg">
                {/* Reset Password Form Section */}
                <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col items-center">
                    <div className="mb-6">
                        <div className="w-fit h-12 bg-gray-200 rounded flex items-center justify-center text-blue-600 font-bold px-2">
                            Task Manager
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">Reset Password</h2>
                    <ResetPasswordForm token={token} />
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Remember your password?{" "}
                        <Link href="/auth/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

                {/* Community Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-bold mb-4">Secure Your Account</h2>
                    <p className="text-sm mb-6">Create a strong password to protect your tasks and stay in control.</p>
                </div>
            </div>
        </div>
    );
}