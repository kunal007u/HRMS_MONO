
// Quarters Model
interface IQuarter {
    id: number;
    name: string;
    leaves: number;
}

export interface ILeaveQuarterResponseModel {
    quarters: IQuarter[];
    secondMonthLeavePercentage: number;
    thirdMonthLeavePercentage: number;
    totalLeaves: number;
}

// leave model

export interface ILeaveRequestModel {
    endDate: string;
    halfDate: string;
    halfDayShift: number;
    isHalfDay: boolean;
    numberOfDays: number;
    reason: string;
    startDate: string;
    title: string;
}

interface ILeaveDashboardModel {
    id: string;
    balance: string;
    employeeId: string;
    paidLeave: string;
    lossOfPay: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    totalLossOfPay: number | string;
    totalPaidLeave: number | string;
}
export interface ILeaveInfo {
    id: string;
    date: string;
    selectedDuration: string;
    leaveId: string;
}

export interface ILeaveModel {
    id: number;
    startDate: string;
    endDate: string;
    numberOfDays: number;
    reason: string;
    halfLeaveDays: string;
    isHalfDay: boolean;
    status: string;
    remark: string | null;
    title: string;
    paid: string | null;
    unpaid: string | null;
    approvedBy: string;
    approverFullName: string;
    leaveInfos: ILeaveInfo[];
}

interface IAllLeavesDashboard {
    todayPresents: number;
    totalEmployees: number;
    pendingLeaves: number;
}

export interface ILeaveResponseModel {
    count: number;
    leaveDashboard?: ILeaveDashboardModel;
    allLeavesDashBoard?: IAllLeavesDashboard
    todayPresents: string,
    totalPendingLeaves: number,
    rows: ILeaveModel[];
}

export interface ISearchLeaveValues {
    employeeName: string;
    leaveType: string;
    status: string;
}

interface IQuarter {
    id: number;
    quarter: string;
    leaves: number;
}


export interface LeaveMasterModel {
    id: string;
    month: string;
    leaves: number;
}

export interface ILeaveBalanceModel {
    id: string;
    fullName: string;
    balance: string;
    employeeId: string;
    paidLeave: string;
    lossOfPay: string;
    designation: string;
}