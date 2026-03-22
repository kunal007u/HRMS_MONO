import type { AxiosResponse } from 'axios';
import { IDepartmentModel } from '../Models/employee/employeeM';
import { IRoleModel } from '../Models/role';
import type { ApiResponseModel } from './api';
import httpService from './http-service';


const endPointBaseURL = `employee`;

const addEmployee = async (value): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/addEmployee`, value);

const getAllDepartment = async (): Promise<AxiosResponse<ApiResponseModel<Array<IDepartmentModel>>>> =>
    httpService.get<ApiResponseModel<Array<IDepartmentModel>>>(`department/getAllDepartment`);

const getAllDesignation = async (): Promise<AxiosResponse<ApiResponseModel<Array<any>>>> =>
    httpService.get<ApiResponseModel<Array<any>>>(`designation/getAllDesignation`);

const getAllRoles = async (): Promise<AxiosResponse<ApiResponseModel<Array<IRoleModel>>>> =>
    httpService.get<ApiResponseModel<Array<IRoleModel>>>(`role/getAllRoles`);

const updateEmployee = async (value: FormData, employeeId: string | undefined): Promise<AxiosResponse<ApiResponseModel<FormData>>> =>
    httpService.put<ApiResponseModel<FormData>>(`${endPointBaseURL}/updateSignUpDetails/${employeeId}`, value);

const adminLeaveSetting = async (body): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/leaveQuarterly`, body);

const deleteLeave = async (id: number): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.delete<ApiResponseModel<boolean>>(`${endPointBaseURL}/leave/delete/${id}`);

export default {
    adminLeaveSetting,
    getAllDepartment,
    getAllDesignation,
    getAllRoles,
    addEmployee,
    deleteLeave,
    updateEmployee
};
