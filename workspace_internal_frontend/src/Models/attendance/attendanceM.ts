export interface IDailyLogResponseModal {
    date: string;
    firstIn: string;
    lastOut: string;
    totalOutTime: string;
    totalInTime: string;
    workLog: string;
    difference: string;
    workLogHours: string;
    tlwlDifference: string;
    inOut: IBreakDetails[]
    status: string;
}

export interface IBreakDetails {
    in: string;
    out: string;
    difference: string;
}

export interface IAvgLogResponseModal {
    absentDays: number;
    averageInTime: string;
    averageWorkLogHours: string | null;
    halfDays: number;
    presentDays: number;
    totalInTime: string;
    totalOutTime: string;
    averageTlwlDiff: string | null;
    lateDays: number;
}

export interface IAttendanceResponseModal {
    monthData: IAvgLogResponseModal;
    dailyLog: IDailyLogResponseModal[];
}

export interface IStatusCreateResponse {
    message: string;
    status: boolean;
    data: IAttendanceResponseModal;

}