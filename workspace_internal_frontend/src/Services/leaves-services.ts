import type { AxiosResponse } from 'axios';
import type { ApiResponseModel } from './api';
import httpService from './http-service';
import { ILeaveBalanceModel, ILeaveRequestModel, ILeaveResponseModel, ISearchLeaveValues } from '../Models/Leaves/leavesM';

const endPointBaseURL = `leaveRequest`;

const addLeave = async (requestBody: ILeaveRequestModel): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/create`, requestBody);

const getEmployeeLeaves = async (offset: number, limit: number): Promise<AxiosResponse<ApiResponseModel<ILeaveResponseModel>>> =>
    httpService.get<ApiResponseModel<ILeaveResponseModel>>(`${endPointBaseURL}/employeeLeaves?offset=${offset}&limit=${limit}`);

const deleteLeave = async (id: string | number): Promise<AxiosResponse<ApiResponseModel<ILeaveResponseModel>>> =>
    httpService.delete<ApiResponseModel<ILeaveResponseModel>>(`${endPointBaseURL}/delete/${id}`);

const updateLeave = async (values: ILeaveRequestModel, id: string | number | undefined,): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/update/${id}`, values);

const changeLeaveStatus = async (id: string | number, values): Promise<AxiosResponse<ApiResponseModel<ILeaveResponseModel>>> =>
    httpService.put<ApiResponseModel<ILeaveResponseModel>>(`${endPointBaseURL}/updateStatus/${id}`, values);

const getAllEmployeesLeaves = async (values: ISearchLeaveValues, startDate, endDate, offset: number, limit: number, order: string, orderBy: string): Promise<AxiosResponse<ApiResponseModel<ILeaveResponseModel>>> => {
    return httpService.get<ApiResponseModel<ILeaveResponseModel>>(`${endPointBaseURL}/getAll?offset=${offset}&limit=${limit}&search=${values.employeeName}&status=${values.status}&startDate=${startDate}&endDate=${endDate}&order=${order}&orderBy=${orderBy}`);
}

const getAllLeaveBalance = async (): Promise<AxiosResponse<ApiResponseModel<ILeaveBalanceModel[]>>> =>
    httpService.get<ApiResponseModel<ILeaveBalanceModel[]>>(`leaveBalance/getAll`);

const updateLeaveBalance = async (id: string | number | undefined, values: ILeaveBalanceModel,): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`leaveBalance/update/${id}`, values);

const leaveAllocationMutation = async (id: string | number): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`employee/probation/completed/${id}`);

const getAllLeavesDays = async (values): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.post<ApiResponseModel<any>>(`leaveRequest/leave-type-summary`, values);

export default {
    addLeave,
    getEmployeeLeaves,
    getAllEmployeesLeaves,
    deleteLeave,
    updateLeave,
    changeLeaveStatus,
    getAllLeaveBalance,
    updateLeaveBalance,
    leaveAllocationMutation,
    getAllLeavesDays
};
