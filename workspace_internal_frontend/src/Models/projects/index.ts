export interface IProjectStatistics {
    projectName: string;
    totalHours: string;
    week1: string;
    week2: string;
    week3: string;
    week4: string;
    week5: string;
}

export interface IAllProject {
    id: string;
    projectName: string;
    startDate: string;
    endDate: string;
    projectManager: string;
    description: string;
    managerId: string;
}