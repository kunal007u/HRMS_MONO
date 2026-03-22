/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from 'axios';
import httpService from './http-service';
import { ApiResponseModel } from './api';

const endPointBaseURL = `project`;

const getAllLogHours = async (values): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/getAllLogHours?month=${values.month}&year=${values.year}`);

const getAllProjects = async (): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.get<ApiResponseModel<any>>(`${endPointBaseURL}/getAll`);

const createOrUpdateProject = async (data: any): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.post<ApiResponseModel<any>>(`${endPointBaseURL}/createOrUpdate`, data);

const deleteProject = async (id: string): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.delete<ApiResponseModel<any>>(`${endPointBaseURL}/delete/${id}`);

export default {
    getAllLogHours,
    getAllProjects,
    createOrUpdateProject,
    deleteProject
}