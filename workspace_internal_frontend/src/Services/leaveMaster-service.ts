import type { AxiosResponse } from 'axios';
import type { ApiResponseModel } from './api';
import httpService from './http-service';

const endPointBaseURL = `leaveMaster`;

const getAllLeaveMaster = async (): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/getAll`);

const updateLeaveMaster = async (id: string | number, data): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/update/${id}`, data);

export default {
    getAllLeaveMaster,
    updateLeaveMaster
};
