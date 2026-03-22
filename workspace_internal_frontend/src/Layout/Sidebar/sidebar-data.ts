/* eslint-disable @typescript-eslint/no-explicit-any */
import dashboard from "../../Assets/Images/dashboardImg.svg";
import employee from "../../Assets/Images/employeeImg.svg";
import rocket from "../../Assets/Images/projectImg.svg";
import admin from "../../Assets/Images/adminImg.svg";
import performance from "../../Assets/Images/performanceImg.svg";
import { Routing } from "../../Routes/routing";
import { Modules } from "../../Shared/enums/modules";

export interface ISidebarData {
    id: number;
    module: string;
    route: string;
    name: string;
    icon?: any;
    childs?: ISidebarData[];
}


export const sidebarRoutes: ISidebarData[] = [
    {
        id: 1,
        icon: dashboard,
        module: Modules.AdminDashboard,
        name: "Admin Dashboard",
        route: Routing.AdminDashboard,
    },
    {
        id: 2,
        icon: dashboard,
        module: Modules.EmployeeDashboard,
        name: "Emloyee Dashboard",
        route: Routing.EmployeeDashboard,
    },
    {
        id: 3,
        icon: employee,
        module: Modules.Employee,
        name: "Employee",
        route: Routing.Employee,
    },
    {
        id: 4,
        module: Modules.PersonalDetail,
        name: "Personal Details",
        route: Routing.PersonalDetails,
    },
    {
        id: 5,
        module: Modules.AllEmployees,
        name: "All Employees",
        route: Routing.AllEmployees,
    },
    {
        id: 6,
        module: Modules.Attendance,
        name: "Attendance",
        route: Routing.Attendance,
    },
    {
        id: 7,
        module: Modules.MyLeaves,
        name: "My Leaves",
        route: Routing.MyLeaves,
    },

    {
        id: 8,
        module: Modules.PaySlip,
        name: "Pay Slip",
        route: Routing.PaySlipTable,

    },

    {
        id: 9,
        module: Modules.WorkLog,
        name: "Work Log",
        route: Routing.WorkLog,

    },
    {
        id: 10,
        module: Modules.Holidays,
        name: "Holidays",
        route: Routing.Holidays,

    },
    {
        id: 35,
        module: Modules.EmployeeResignation,
        name: 'Resignation',
        route: Routing.ResignationEmployee,
    },

    {
        id: 11,
        icon: rocket,
        module: Modules.Projects,
        name: "Projects",
        route: Routing.Projects,

    },

    {
        id: 12,
        module: Modules.AllProjects,
        name: "All Projects",
        route: Routing.AllProjects,

    },
    {
        id: 13,
        module: Modules.Tasks,
        name: "Tasks",
        route: Routing.Tasks,

    },
    {
        id:38,
        module: Modules.ProjectStatistics,
        name: "Project Statistics",
        route: Routing.ProjectStatistics
        
    },
    {
        id: 14,
        icon: admin,
        module: Modules.HR,
        name: "HR/Admin",
        route: Routing.HR,
    },
    {
        id: 15,
        module: Modules.Policies,
        name: "Policies",
        route: Routing.Policies,

    },
    {
        id: 16,
        module: Modules.Inventory,
        name: "Inventory",
        route: Routing.Inventory,
    },

    {
        id: 17,
        module: Modules.OfficeAssetes,
        name: "Office Assets",
        route: Routing.OfficeAssetes,

    },
    {
        id: 18,
        module: Modules.KitchenAssetes,
        name: "Kitchen",
        route: Routing.KitchenAssetes,
    },
    {
        id: 37,
        module: Modules.AllWorkLogs,
        name: "All Worklogs",
        route: Routing.AllWorkLogs,
    },
    {
        id: 19,
        module: Modules.Reports,
        name: "Reports",
        route: Routing.Reports,

    },
    {
        id: 20,
        module: Modules.AttendanceReport,
        name: "Attendance Report",
        route: Routing.AttendanceReport,

    },
    {
        id: 21,
        module: Modules.LeaveReport,
        name: "Leave Report",
        route: Routing.LeaveReport,

    },
    {
        id: 22,
        module: Modules.WorkReport,
        name: "Work Report",
        route: Routing.WorkReport,

    },
    {
        id: 23,
        module: Modules.ResignationHR,
        name: "Resignation",
        route: Routing.ResignationHR,

    },
    {
        id: 24,
        module: Modules.Annoncements,
        name: "Annoncements",
        route: Routing.Annoncements,

    },
    {
        id: 25,
        module: Modules.EmployeeSalary,
        name: "Employee Salary Master",
        route: Routing.EmployeeSalary,

    },
    {
        id: 26,
        module: Modules.Role,
        name: "Route Permission",
        route: Routing.Roles,

    },
    {
        id: 27,
        module: Modules.AllAttendance,
        name: "All Attendance",
        route: Routing.AllAttendance,
    },
    {
        id: 28,
        module: Modules.AllLeaves,
        name: "All Leaves",
        route: Routing.AllLeaves,
    },
    {
        id: 28,
        module: Modules.MonthlySalary,
        name: "Monthly Salary",
        route: Routing.MonthlySalary,
    },
    {
        id: 35,
        module: Modules.LeaveBalance,
        name: "Leave Balance",
        route: Routing.LeaveBalance,

    },
    {
        id: 36,
        module: Modules.LeaveMaster,
        name: "Leave Master",
        route: Routing.LeaveMaster,
    },
    {
        id: 29,
        icon: performance,
        module: Modules.Performance,
        name: "Performance",
        route: Routing.Performance,
    },
    {
        id: 30,
        module: Modules.Reviews,
        name: "Reviews",
        route: Routing.Reviews,

    },
    {
        id: 31,
        module: Modules.Assessment,
        name: "Assessment",
        route: Routing.Assessment,

    },
    {
        id: 32,
        module: Modules.EmployeeAssessment,
        name: "Employee Assessment",
        route: Routing.EmployeeAssessment,

    },
    {
        id: 33,
        module: Modules.AdminAssessment,
        name: "Admin Assessment",
        route: Routing.AdminAssessment,

    },
    {
        id: 34,
        module: Modules.Goals,
        name: "Goals",
        route: Routing.Goals,

    },

]