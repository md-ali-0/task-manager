import Link from "next/link";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-6xl overflow-hidden rounded-lg shadow-lg">
                {/* Forgot Password Form Section */}
                <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col items-center">
                    <div className="mb-6">
                        <div className="w-fit h-12 bg-gray-200 rounded flex items-center justify-center text-blue-600 font-bold px-2">
                            Task Manager
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">Forgot Password</h2>
                    <ForgotPasswordForm />
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Remember your password?{" "}
                        <Link href="/auth/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

                {/* Community Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-bold mb-4">Reset Made Easy</h2>
                    <p className="text-sm mb-6">We’re here to help you regain access to your tasks quickly and securely.</p>
                </div>
            </div>
        </div>
    );
}