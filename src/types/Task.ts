export type Task = {
    id: string;
    title: string;
    status: TaskStatus;
    date: Date;
    priority: TaskPriority;
    createdAt: Date;
    updatedAt: Date;
};

export enum TaskStatus {
    TODO,
    InPROGRESS,
    DONE,
}

export enum TaskPriority {
    LOW,
    MEDIUM,
    HIGH,
}
