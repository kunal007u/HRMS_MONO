/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from 'axios';
import httpService from './http-service';
import { ApiResponseModel } from './api';


const endPointBaseURL = `worklog`;

const createWorklog = async (value: any): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.post<ApiResponseModel<any>>(`${endPointBaseURL}/create`, value);

const updateWorklog = async (value: any): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/updateLog`, value);

const deleteWorklog = async (id: number | string): Promise<AxiosResponse<ApiResponseModel<any>>> => {
    return httpService.delete<ApiResponseModel<any>>(`${endPointBaseURL}/deleteLog/${id}`);
}

const getAll = async (values, id): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/getAll/${id ? id : ""}?month=${values.month}&year=${values.year}`);

export default {
    createWorklog,
    getAll,
    updateWorklog,
    deleteWorklog
}