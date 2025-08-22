/* eslint-disable @typescript-eslint/no-empty-object-type */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSession } from "@/provider/session-provider";
import { signInSchema } from "@/schema/signin.schema";
import { signin } from "@/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Icons } from "../shared/icons";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormValues = z.infer<typeof signInSchema>;

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isLoading, setIsLoading } = useSession();
    const [showPassword, setShowPassword] = React.useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { setValue } = form;

    const handleQuickSetCredentials = (email: string, password: string) => {
        setValue("email", email);
        setValue("password", password);
        toast.success(`Credentials set for ${email}`);
    };

    async function onSubmit(data: FormValues) {
        setIsLoading(true);
        const response = await signin(data);

        if (response.success) {
            localStorage.setItem("token", response?.data?.accessToken);
            const destination = searchParams.get("redirect") || "/";
            router.replace(decodeURIComponent(destination));
            toast.success("User Logged In Successfully");
        } else {
            toast.error(response?.errors);
        }
        setIsLoading(false);
    }

    return (
        <div className={cn("grid gap-4 w-full max-w-sm", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-gray-700">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Type your email"
                                        className="border-gray-300 rounded-md"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-gray-700">Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Type your password"
                                            className="border-gray-300 rounded-md"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-500" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="rememberMe" className="text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Login
                    </Button>
                </form>
            </Form>
            {/* Quick login credentials */}
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between bg-blue-100 p-3 rounded-md">
                    <span className="text-blue-800 text-sm">
                        Admin: ali@gmail.com / 123456
                    </span>
                    <Button
                        onClick={() => handleQuickSetCredentials("ali@gmail.com", "123456")}
                        className="bg-blue-600 text-white text-sm"
                        size="sm"
                    >
                        Copy User
                    </Button>
                </div>
            </div>
        </div>
    );
}