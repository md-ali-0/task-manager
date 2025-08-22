"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task, TaskPriority, TaskStatus } from "@/types";
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";
import { useState } from "react";
import { DeleteTaskAlert } from "./delete-task-alert";
import { EditTaskDialog } from "./edit-task-dialog";
import { ViewDetailsDialog } from "./view-details-dialog";

export default function TaskCard({ task }: { task: Task }) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

    const getPriorityColor = (priority: TaskPriority) => {
        switch (priority.toString()) {
            case "HIGH":
                return "bg-red-500";
            case "MEDIUM":
                return "bg-yellow-500";
            case "LOW":
                return "bg-green-500";
            default:
                return "bg-blue-500";
        }
    };

    const getStatusIcon = (status: TaskStatus) => {
        switch (status.toString()) {
            case "DONE":
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case "InPROGRESS":
                return <Clock className="h-5 w-5 text-yellow-500" />;
            default:
                return <AlertCircle className="h-5 w-5 text-red-500" />;
        }
    };

    return (
        <>
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {task.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                        <Badge
                            className={`${getPriorityColor(
                                task.priority
                            )} text-white`}
                        >
                            {task.priority}
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => setIsEditDialogOpen(true)}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setIsDeleteAlertOpen(true)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {getStatusIcon(task.status)}
                        <span>{task.status}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                        Due: {new Date(task.date).toLocaleDateString()}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsViewDetailsOpen(true)}
                    >
                        View Details
                    </Button>
                </CardFooter>
            </Card>

            <EditTaskDialog
                task={task}
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
            />

            <DeleteTaskAlert
                task={task}
                isOpen={isDeleteAlertOpen}
                onClose={() => setIsDeleteAlertOpen(false)}
            />
            <ViewDetailsDialog
                task={task}
                isOpen={isViewDetailsOpen}
                onClose={() => setIsViewDetailsOpen(false)}
            />
        </>
    );
}
