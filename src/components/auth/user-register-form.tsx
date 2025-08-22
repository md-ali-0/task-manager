/* eslint-disable @typescript-eslint/no-empty-object-type */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSignUpUserMutation } from "@/redux/features/auth/authApi";
import { SignupSchema } from "@/schema/signup.schema";
import { ErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
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

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormValues = z.infer<typeof SignupSchema>;

export function UserRegisterForm({
    className,
    ...props
}: UserRegisterFormProps) {
    const [signupUser, { isLoading, isSuccess, isError, error }] =
        useSignUpUserMutation();
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    React.useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";
            toast.error(errorMessage);
        }
        if (isSuccess) {
            toast.success("User Created Successfully");
            router.push("/auth/login");
        }
    }, [error, isError, isSuccess, router]);

    async function onSubmit(data: FormValues) {
        await signupUser(data);
    }

    return (
        <div className={cn("grid gap-4 w-full max-w-sm", className)} {...props}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-gray-700">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your full name"
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-gray-700">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
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
                                            placeholder="Enter your password"
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
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    );
}