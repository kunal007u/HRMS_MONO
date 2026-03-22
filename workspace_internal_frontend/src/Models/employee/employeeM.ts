import { IBaseCreateRequest, IBaseUpdateRequest } from "../base-type";

export interface Role {
    id: string;
    name: string;
}

export interface IDepartmentModel {
    id: string;
    name: string;
}

export interface IDesignation {
    id: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IReportingPersonModel {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    pancardNo: string;
    middleName: string;
    aadharNo: string;
    uanNo: string | null;
    workLocation: string;
    pfNo: string | null;
    email: string;
    dateOfJoining: string;
    gender: string;
    phoneNumber: string;
    departmentId: string;
    designationId: string;
    profilePicture: string;
    currentAddress: string | null;
    permanentAddress: string | null;
    roleId: string;
    isActive: boolean;
    emergencyContact: string | null;
    city: string | null;
    state: string | null;
    pincode: string | null;
    passportNumber: string | null;
    fatherName: string | null;
    motherName: string | null;
    dateOfBirth: string | null;
    nationality: string | null;
    experience: string | null;
    qualification: string | null;
    reportTo: string;
    reportToId: string;
    designationName: string;
    departmentName: string;
    employeeCode: string;
    employeeType: string;
    endingDate: string | null;
    occupation: string | null;
    employees: string;
    department: IDepartmentModel;
    reportToPerson: IReportingPersonModel;
    employee_code: string;
    presentDays: string;
    leaveDays: string;
    totalPaidLeave: string;
}

export interface IAllemployeeData {
    employee: Employee;
    documents: Record<string, unknown>;
    bankDetails: BankDetail;
    emergencyContacts: EmergencyContact;
    experienceDetails: ExperienceDetail[];
    assets: AssetsDetails[];
    allEmployees: Employee[];
    totalWorkingDays: number;
}

export interface Status {
    message: string;
    code: number;
    type: string;
}

export interface RootObject {
    status: Status;
    data: IAllemployeeData;
}

export interface AssetsDetails {
    assetsName: string;
    assignedDate: string;
    quantity: number;
    description: string;
    assetsID: string;
    employeeId: string;
}

export interface ExperienceDetail {
    companyName: string;
    designation: string;
    location: string;
    periodFrom: string;
    periodTo: string;
    experienceId: number;
    employeeId: string;
}

export interface EmergencyContact {
    primaryName: string;
    primaryRelationship: string;
    primaryPhoneNo: string;
    primaryAddress: string;
    secondaryName: string;
    secondRelationship: string;
    secondaryPhoneNo: string;
    secondaryAddress: string;
    employeeId: string;
}

export interface BankDetail {
    bankName: string;
    accountNo: string;
    IFSC?: string;
    ifsc?: string;
    branchName: string;
    isActive?: boolean;
    employeeId?: string;
}

export interface EmployeeSalaryModel extends IBaseCreateRequest, IBaseUpdateRequest {
    employeeId: string,
    basic: number,
    milestone: number,
    bonus: number,
    fromDate: string,
    toDate?: string,
    pf: number,
    pt: number,
    totalSalary?: number,
    employee?: {
        id: string;
        email: string,
        firstName: string,
        lastName: string,
        employeeCode: string,
    },
    id: string
}

export interface EmployeeMonthlySalaryModel extends IBaseCreateRequest, IBaseUpdateRequest {
    id?: string,
    employeeId?: string,
    month?: string,
    year?: string,
    totalWorkingDays?: number,
    leaveDays?: number,
    presentDays?: number,
    totalSalary?: number,
    paidSalary?: number,
    salaryPaidAt?: string,
    deletedAt?: string,
    employee?: {
        id?: string;
        email?: string,
        firstName?: string,
        lastName?: string,
    }
}

export interface CalculateMonthlySalaryModel {
    month?: string,
    year?: string,
    salary?: [
        {
            employeeId?: string;
            bonus?: string,
        }
    ]
}

export interface EmployeeResignationModel extends IBaseCreateRequest {
    id?: string
    description?: string,
    status?: string,
    employeeFullName?: string,
    modifierFullName?: string
    remark?: string
}

export interface PoliciesModel extends IBaseCreateRequest {
    id?: string
    name?: string,
    description?: string,
    policyFile?: string | Blob,
}

export interface IEmployeeNameSearchModel {
    employeeName?: string;
    month?: string | number;
    year?: number;
}