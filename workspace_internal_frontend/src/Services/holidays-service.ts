import type { AxiosResponse } from 'axios';
import type { ApiResponseModel } from './api';
import httpService from './http-service';

const endPointBaseURL = `holiday`;

const getHolidays = async (): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/getAllHolidays`);

const createHoliday = async (data: any): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.post<ApiResponseModel<any>>(`${endPointBaseURL}/addHoliday`, data);

const updateHoliday = async (id: number, data: any): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/updateHoliday/${id}`, data);

const deleteHoliday = async (id: number | string): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.delete<ApiResponseModel<any>>(`${endPointBaseURL}/deleteHoliday/${id}`);

export default {
    getHolidays,
    createHoliday,
    updateHoliday,
    deleteHoliday
};
