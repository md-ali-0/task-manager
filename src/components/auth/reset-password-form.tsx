"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Icons } from "../shared/icons";

interface FormValues {
    newPassword: string;
    confirmPassword: string;
}

interface ResetPasswordFormProps {
    token: string | null;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();
    const router = useRouter();
    const [resetPassword, { isSuccess, isLoading, isError, error }] =
        useResetPasswordMutation();

    React.useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something went wrong";
            toast.error(errorMessage);
        }
        if (isSuccess) {
            toast.success("Password reset successfully.");
            router.push("/auth/login");
        }
    }, [error, isError, isSuccess, router]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (!token) {
                toast.error("Invalid request. Missing id or token.");
                return;
            }
            if (data.newPassword !== data.confirmPassword) {
                toast.error("Confirm Password not matched");
            }
            await resetPassword({
                password: data.newPassword,
                token,
            }).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cn("grid gap-4 w-full max-w-sm")}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-1">
                    <Label className="text-sm text-gray-700">New Password</Label>
                    <Input
                        {...register("newPassword", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        type="password"
                        placeholder="Enter New Password"
                        disabled={isLoading}
                        className={cn("border-gray-300 rounded-md", errors.newPassword ? "border-red-500" : "")}
                    />
                    {errors.newPassword && (
                        <span className="text-red-500 text-sm">
                            {errors.newPassword.message}
                        </span>
                    )}
                </div>
                <div className="grid gap-1">
                    <Label className="text-sm text-gray-700">Confirm Password</Label>
                    <Input
                        {...register("confirmPassword", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        type="password"
                        placeholder="Enter Confirm Password"
                        disabled={isLoading}
                        className={cn("border-gray-300 rounded-md", errors.confirmPassword ? "border-red-500" : "")}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                    disabled={isLoading}
                >
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Reset Password
                </Button>
            </form>
        </div>
    );
}