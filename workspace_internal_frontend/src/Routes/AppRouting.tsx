import { lazy } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import PublicLayout from '../Layout/PublicLayout/PublicLayout';
import { Routing } from "./routing";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../Page/Account/Login"));
const ForgotPassword = lazy(() => import("../Page/Account/ForgotPassword"));
const OtpVerification = lazy(() => import("../Page/Account/OtpVerification"));
const EmployeeDashboard = lazy(() => import("../Page/Dashboard/EmployeeDashboard"));
const AdminDashboard = lazy(() => import("../Page/Dashboard/AdminDashboard"));
const PersonalDetails = lazy(() => import("../Page/Employee/PersonalDetails/PersonalDetails"));
const Attendance = lazy(() => import("../Page/Employee/Attendance/Attendance"));
const Holidays = lazy(() => import("../Page/Employee/Holidays/Holidays"));
const MyLeaves = lazy(() => import("../Page/Employee/Leaves/MyLeaves/MyLeaves"));
const AllEmployees = lazy(() => import("../Page/Employee/AllEmployees/AllEmployees"));
const AllLeaves = lazy(() => import("../Page/HR/Leaves/AllLeaves/AllLeaves"));
const LeaveMaster = lazy(() => import("../Page/HR/Leaves/LeaveMaster/LeaveMaster"));
const LeaveBalance = lazy(() => import("../Page/HR/Leaves/LeavesBalance/LeaveBalance"));
const AllProjects = lazy(() => import("../Page/Projects/AllProjects/AllProjects"));
const SingleProject = lazy(() => import("../Page/Projects/AllProjects/SingleProject"));
const Tasks = lazy(() => import("../Page/Projects/Tasks/TasksStatus"));
const ProjectStatistics = lazy(() => import("../Page/Projects/ProjectStatistics/ProjectStatistics"));
const EmployeeSalary = lazy(() => import("../Page/HR/Salary/EmployeeSalaryMaster"));
const MonthlySalary = lazy(() => import("../Page/HR/Salary/MonthlySalary"));
const PaySlipTable = lazy(() => import("../Page/Employee/Salary/PaySlipTable"));
const PaySlip = lazy(() => import("../Page/Employee/Salary/PaySlip"));
const WorkLog = lazy(() => import("../Page/Employee/WorkLog/WorkLog"));
const Policies = lazy(() => import("../Page/HR/Policies/Policies"));
const OfficeAssetes = lazy(() => import("../Page/HR/Inventory/OfficeAssetes/OfficeAssetes"));
const KitchenAssetes = lazy(() => import("../Page/HR/Inventory/KitchenAssets/KitchenAssets"));
const LeaveReport = lazy(() => import("../Page/HR/Reports/LeaveReport"));
const AttendanceReport = lazy(() => import("../Page/HR/Reports/AttendanceReport"));
const WorkReport = lazy(() => import("../Page/HR/Reports/WorkReport"));
const WorkReportById = lazy(() => import("../Page/HR/Reports/WorkReportById"));
const ResignationEmployee = lazy(() => import("../Page/Employee/EmployeeResignation/Resignation"));
const Goals = lazy(() => import("../Page/Performance/Goals/Goals"));
const Reviews = lazy(() => import("../Page/Performance/Reviews/Reviews"));
const Annoncements = lazy(() => import("../Page/HR/Annoncements/Annoncements"));
const EmployeeAssessment = lazy(() => import("../Page/Performance/Assessment/EmployeeAssessment"));
const AdminAssessment = lazy(() => import("../Page/Performance/Assessment/AdminAssessment"));
const RoutePermission = lazy(() => import("../Page/HR/RoutePermission/RoutePermission"));
const Roles = lazy(() => import("../Page/HR/RoutePermission/Roles"));
const AllAttendance = lazy(() => import("../Page/HR/AllAttendance/AllAttendance"));
const AllWorkLogs = lazy(() => import("../Page/HR/AllWorkLogs/AllWorkLogs"));
const ResignationHR = lazy(() => import("../Page/HR/Resignation/Resignation"));


const privateRoute = (Element, props?) => {
    return <ProtectedRoute element={props ? <Element {...props} /> : <Element />} />;
};

const routesConfig = [
    { path: "/", element: <Navigate to={Routing.Login} /> },
    { path: Routing.Login, element: <PublicLayout><Login /></PublicLayout> },
    { path: Routing.ForgotPassword, element: <PublicLayout><ForgotPassword /></PublicLayout> },
    { path: Routing.OtpVerification, element: <PublicLayout><OtpVerification /></PublicLayout> },
    { path: Routing.EmployeeDashboard, element: <MainLayout>{privateRoute(EmployeeDashboard)}</MainLayout> },
    { path: Routing.AdminDashboard, element: <MainLayout>{privateRoute(AdminDashboard)}</MainLayout> },
    { path: Routing.PersonalDetails, element: <MainLayout>{privateRoute(PersonalDetails)}</MainLayout> },
    { path: Routing.AllEmployees, element: <MainLayout>{privateRoute(AllEmployees)}</MainLayout> },
    { path: Routing.Holidays, element: <MainLayout>{privateRoute(Holidays)}</MainLayout> },
    { path: Routing.Attendance, element: <MainLayout>{privateRoute(Attendance)}</MainLayout> },
    { path: Routing.WorkLog, element: <MainLayout>{privateRoute(WorkLog)}</MainLayout> },
    { path: Routing.Holidays, element: <MainLayout>{privateRoute(Holidays)}</MainLayout> },
    { path: Routing.SingleEmployee, element: <MainLayout>{privateRoute(PersonalDetails)}</MainLayout> },
    { path: Routing.MyLeaves, element: <MainLayout>{privateRoute(MyLeaves)}</MainLayout> },
    { path: Routing.AllLeaves, element: <MainLayout>{privateRoute(AllLeaves)}</MainLayout> },
    { path: Routing.LeaveBalance, element: <MainLayout>{privateRoute(LeaveBalance)}</MainLayout> },
    { path: Routing.LeaveMaster, element: <MainLayout>{privateRoute(LeaveMaster)}</MainLayout> },
    { path: Routing.AllProjects, element: <MainLayout>{privateRoute(AllProjects)}</MainLayout> },
    { path: Routing.SingleProject, element: <MainLayout>{privateRoute(SingleProject)}</MainLayout> },
    { path: Routing.Tasks, element: <MainLayout>{privateRoute(Tasks)}</MainLayout> },
    { path: Routing.ProjectStatistics, element: <MainLayout>{privateRoute(ProjectStatistics)}</MainLayout> },
    { path: Routing.PaySlipTable, element: <MainLayout>{privateRoute(PaySlipTable)}</MainLayout> },
    { path: Routing.EmployeePaySlip, element: <MainLayout>{privateRoute(PaySlip)}</MainLayout> },
    { path: Routing.EmployeeSalary, element: <MainLayout>{privateRoute(EmployeeSalary)}</MainLayout> },
    { path: Routing.MonthlySalary, element: <MainLayout>{privateRoute(MonthlySalary)}</MainLayout> },
    { path: Routing.Policies, element: <MainLayout>{privateRoute(Policies)}</MainLayout> },
    { path: Routing.OfficeAssetes, element: <MainLayout>{privateRoute(OfficeAssetes)}</MainLayout> },
    { path: Routing.KitchenAssetes, element: <MainLayout>{privateRoute(KitchenAssetes)}</MainLayout> },
    { path: Routing.LeaveReport, element: <MainLayout>{privateRoute(LeaveReport)}</MainLayout> },
    { path: Routing.AttendanceReport, element: <MainLayout>{privateRoute(AttendanceReport)}</MainLayout> },
    { path: Routing.WorkReport, element: <MainLayout>{privateRoute(WorkReport)}</MainLayout> },
    { path: Routing.WorkReportById, element: <MainLayout>{privateRoute(WorkReportById)}</MainLayout> },
    { path: Routing.ResignationHR, element: <MainLayout>{privateRoute(ResignationHR)}</MainLayout> },
    { path: Routing.AllWorkLogs, element: <MainLayout>{privateRoute(AllWorkLogs)}</MainLayout> },
    { path: Routing.WorkLogById, element: <MainLayout>{privateRoute(WorkLog)}</MainLayout> },
    { path: Routing.Goals, element: <MainLayout>{privateRoute(Goals)}</MainLayout> },
    { path: Routing.Reviews, element: <MainLayout>{privateRoute(Reviews)}</MainLayout> },
    { path: Routing.Annoncements, element: <MainLayout>{privateRoute(Annoncements)}</MainLayout> },
    { path: Routing.EmployeeAssessment, element: <MainLayout>{privateRoute(EmployeeAssessment)}</MainLayout> },
    { path: Routing.AdminAssessment, element: <MainLayout>{privateRoute(AdminAssessment)}</MainLayout> },
    { path: Routing.EmployeeAssessmentById, element: <MainLayout>{privateRoute(EmployeeAssessment)}</MainLayout> },
    { path: Routing.RoutePermission, element: <MainLayout>{privateRoute(RoutePermission)}</MainLayout> },
    { path: Routing.AddRoutePermissions, element: <MainLayout>{privateRoute(RoutePermission)}</MainLayout> },
    { path: Routing.Roles, element: <MainLayout>{privateRoute(Roles)}</MainLayout> },
    { path: Routing.AllAttendance, element: <MainLayout>{privateRoute(AllAttendance)}</MainLayout> },
    { path: Routing.AttendanceById, element: <MainLayout>{privateRoute(Attendance)}</MainLayout> },
    { path: Routing.ResignationEmployee, element: <MainLayout>{privateRoute(ResignationEmployee)}</MainLayout> },
];

const routes = createBrowserRouter(routesConfig);

const AppRouting = () => {
    return <RouterProvider router={routes} />;
};

export default AppRouting;