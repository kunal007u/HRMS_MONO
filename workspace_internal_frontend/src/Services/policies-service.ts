import { AxiosResponse } from 'axios';
import httpService from './http-service';
import { ApiResponseModel } from './api';
import { PoliciesModel } from '../Models/employee/employeeM';

const endPointBaseURL = `policy`;

const getAllPolicies = async (): Promise<AxiosResponse<ApiResponseModel<Array<PoliciesModel>>>> =>
    httpService.get<ApiResponseModel<Array<PoliciesModel>>>(`${endPointBaseURL}/getAllPolicies`);

const createPolicy = async (values: FormData): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/addPolicy`, values);

const updatePolicy = async (values: FormData, id: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/updatePolicy/${id}`, values);

const deletePolicy = async (id: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.delete<ApiResponseModel<boolean>>(`${endPointBaseURL}/deletePolicy/${id}`);

export default {
    getAllPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy,
}