interface ITask {
    createdAt?: string;
    deadLine?: string | Date;
    id?: number | undefined;
    isActive?: boolean;
    status?: string;
    taskAssignedBy?: number;
    taskAssignedByName?: string;
    taskAssignedTo?: number;
    taskAssignedToName?: string;
    taskCompletedDate?: string | null;
    taskCreatedDate?: string;
    taskDescription?: string;
    taskName?: string;
    taskPriority?: string;
    taskPercentage?: string | null;
    updatedAt?: string;
    taskFiles: TaskFile[];
    
}
interface TaskFile {
    id: number;
    size: string;
    taskFiles: string;
}

interface ITaskResponse {
    taskAssignedBy: ITask[];
    taskAssignedTo: ITask[];
}

interface ITaskStatus {
    id: number;
    taskName: string;
    taskPrioty: string;
    status: string;
    deadLine: string;
    taskProgress: null;
}

interface ITaskStatusResponse {
    todo: ITaskStatus[];
    inProgress: ITaskStatus[];
    testing: ITaskStatus[];
    done: ITaskStatus[];
    reOpen: ITaskStatus[];
}

