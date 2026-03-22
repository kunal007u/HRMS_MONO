/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from 'axios';
import type { IForgetPasswordRequestModel, ILoginRequestModel, ILoginResponseModel, IResetPasswordModel, IVerifyPasswordRequestModel } from '../Models/account/accountM';
import { IRoleRoutePermissionModel } from '../Models/role';
import type { IRoutesModel } from '../Models/routes/routesM';
import type { ApiResponseModel } from './api';
import httpService from './http-service';

const endPointBaseURL = `auth`;

const loginUser = async (requestBody: ILoginRequestModel): Promise<AxiosResponse<ApiResponseModel<ILoginResponseModel>>> =>
    httpService.post<ApiResponseModel<ILoginResponseModel>>(`${endPointBaseURL}/employeeLogin`, requestBody);

const readPermission = async (): Promise<AxiosResponse<ApiResponseModel<Array<IRoutesModel>>>> =>
    httpService.get<ApiResponseModel<Array<IRoutesModel>>>(`${endPointBaseURL}/readPermission`);

const routePermission = async (id: string | number): Promise<AxiosResponse<ApiResponseModel<Array<IRoleRoutePermissionModel>>>> =>
    httpService.get<ApiResponseModel<Array<IRoleRoutePermissionModel>>>(`${endPointBaseURL}/routePermission/${id}`);

const resetPassword = async (requestBody: IResetPasswordModel): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/resetPassword`, requestBody);

const forgotPassword = async (requestBody: IForgetPasswordRequestModel): Promise<AxiosResponse<ApiResponseModel<ILoginResponseModel>>> =>
    httpService.post<ApiResponseModel<ILoginResponseModel>>(`${endPointBaseURL}/forgot-password`, requestBody);

const verifyPassword = async (requestBody: IVerifyPasswordRequestModel): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/verify-password`, requestBody);

const verifyOtp = async (requestBody: IVerifyPasswordRequestModel): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/verifyOtp`, requestBody);

const resendOtp = async (): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/resendOtp`);

const logout = async (): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.get<ApiResponseModel<boolean>>(`${endPointBaseURL}/logOut`);

export default {
    loginUser,
    readPermission,
    routePermission,
    resetPassword,
    forgotPassword,
    verifyPassword,
    verifyOtp,
    resendOtp,
    logout,
};
