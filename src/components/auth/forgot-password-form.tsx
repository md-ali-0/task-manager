/* eslint-disable @typescript-eslint/no-empty-object-type */

"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { ErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedError } from "@reduxjs/toolkit";
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

interface ForgotPasswordFormProps
    extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export function ForgotPasswordForm({
    className,
    ...props
}: ForgotPasswordFormProps) {
    const [forgetPassword, { isSuccess, isLoading, isError, error }] =
        useForgetPasswordMutation();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    React.useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something went wrong";
            toast.error(errorMessage);
        }
        if (isSuccess) {
            toast.success("Password reset email sent successfully.");
        }
    }, [error, isError, isSuccess]);

    const onSubmit = async (data: FormValues) => {
        const sendingToast = toast.loading("Sending Password Reset Email.");
        try {
            await forgetPassword(data).unwrap();
            toast.dismiss(sendingToast);
        } catch (error) {
            console.error(error);
            toast.dismiss(sendingToast);
        }
    };

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
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send Reset Link
                    </Button>
                </form>
            </Form>
        </div>
    );
}