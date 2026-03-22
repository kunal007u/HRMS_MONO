import { AxiosResponse } from 'axios';
import httpService from './http-service';
import { ApiResponseModel } from './api';
import { IRoleModel } from '../Models/role';

const endPointBaseURL = `role`;

const getAllRole = async (): Promise<AxiosResponse<ApiResponseModel<Array<IRoleModel>>>> =>
    httpService.get<ApiResponseModel<Array<IRoleModel>>>(`${endPointBaseURL}/getAllRoles`);

const getRolePermissionsByID = async (roleId: number | string): Promise<AxiosResponse<ApiResponseModel<IRoleModel>>> =>
    httpService.get<ApiResponseModel<IRoleModel>>(`${endPointBaseURL}/getRole/${roleId}`);


const createRole = async (requestBody: IRoleModel): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/createRole`, requestBody);

const updateRole = async (requestBody: IRoleModel): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/updateRole`, requestBody);

const deleteRole = async (roleId: number | string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/deleteRole/${roleId}`);

export default {
    getAllRole,
    getRolePermissionsByID,
    createRole,
    updateRole,
    deleteRole

}