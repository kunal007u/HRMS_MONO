/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from 'axios';
import httpService from './http-service';
import { ApiResponseModel } from './api';


const endPointBaseURL = `api/task`;

const createTask = async (task: any): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.post<ApiResponseModel<any>>(`${endPointBaseURL}/create`, task);

const getTasks = async (): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/all`);

const getTaskStatus = async (): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/task-Status`);

const updateTaskStatus = async (id: string|number|undefined, status: any): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.put<ApiResponseModel<any>>(`${endPointBaseURL}/update-status/${id}`, status);

const deleteTask = async (id: string): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.delete<ApiResponseModel<any>>(`${endPointBaseURL}/delete/${id}`);

export default {
    createTask,
    getTasks,
    getTaskStatus,
    updateTaskStatus,
    deleteTask,
    
}