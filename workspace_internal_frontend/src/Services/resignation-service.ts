import { AxiosResponse } from 'axios';
import httpService from './http-service';
import { ApiResponseModel } from './api';
import { EmployeeResignationModel } from '../Models/employee/employeeM';

const endPointBaseURL = `resignation`;

const getAllResignations = async (): Promise<AxiosResponse<ApiResponseModel<Array<EmployeeResignationModel>>>> =>
    httpService.get<ApiResponseModel<Array<EmployeeResignationModel>>>(`${endPointBaseURL}/getAllResignation`);

const getResignations = async (): Promise<AxiosResponse<ApiResponseModel<Array<EmployeeResignationModel>>>> =>
    httpService.get<ApiResponseModel<Array<EmployeeResignationModel>>>(`${endPointBaseURL}/getResignationById`);

const createResignation = async (values: EmployeeResignationModel): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/addResignation`, values);

const updateResignation = async (values: EmployeeResignationModel, id: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/updateResignation/${id ? id : ""}`, values);

const deleteResignation = async (id: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.delete<ApiResponseModel<boolean>>(`${endPointBaseURL}/deleteResignation/${id}`);

const changeLeaveStatus = async (id, requestBody): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/updateStatus/${id ? id : ""}`, requestBody);

export default {
    getAllResignations,
    getResignations,
    createResignation,
    updateResignation,
    deleteResignation,
    changeLeaveStatus,
}