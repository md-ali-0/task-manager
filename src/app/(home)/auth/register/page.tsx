import { UserRegisterForm } from "@/components/auth/user-register-form";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Sign Up to your Task Manager account",
};

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-6xl overflow-hidden rounded-lg shadow-lg">
                {/* Community Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 flex-col items-center justify-center text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Join Our Task Manager
                    </h2>
                    <p className="text-sm mb-6">
                        Boost your productivity with task management tools and
                        connect with a global network of organizers.
                    </p>
                </div>

                {/* Register Form Section */}
                <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col items-center">
                    <div className="mb-6">
                        <div className="w-fit h-12 bg-gray-200 rounded flex items-center justify-center text-blue-600 font-bold px-2">
                            Task Manager
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
                        SignUp in to Task Manager
                    </h2>
                    <UserRegisterForm />
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
