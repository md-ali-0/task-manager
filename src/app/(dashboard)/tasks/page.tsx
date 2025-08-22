// @typescript-eslint/no-unused-vars

"use client";

import CreateTaskModal from "@/components/task-dashboard/create-task-modal";
import TaskCard from "@/components/task-dashboard/task-card";
import TaskCardSkeleton from "@/components/task-dashboard/task-card-skleton";
import { useGetAllTasksQuery } from "@/redux/features/task/taskApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TaskDashboardPage() {
    const [search] = useState<string | undefined>(undefined);
    const [page] = useState(1);
    const [limit] = useState(10);

    const { data, isError, isLoading, isSuccess, error } = useGetAllTasksQuery([
        {
            name: "limit",
            value: limit,
        },
        {
            name: "page",
            value: page,
        },
        {
            name: "searchTerm",
            value: search,
        },
    ]);

    useEffect(() => {
        if (isError) {
            toast.error("Something Went Wrong");
        }
    }, [isError, isSuccess, error]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Task Dashboard
                </h1>
                <CreateTaskModal />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                    ? Array(6).map((_, idx) => <TaskCardSkeleton key={idx} />)
                    : data?.data?.map((task) => (
                          <TaskCard key={task.id} task={task} />
                      ))}

                {data?.data && data?.data?.length <= 0 && (
                    <div className="flex items-center justify-center py-10">
                        <h3>No Task Available</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
