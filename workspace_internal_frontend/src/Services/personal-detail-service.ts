/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from 'axios';
import { AssetsDetails, BankDetail, IAllemployeeData, EmergencyContact, Employee, IReportingPersonModel, IEmployeeNameSearchModel } from '../Models/employee/employeeM';
import type { ApiResponseModel } from './api';
import httpService from './http-service';


const endPointBaseURL = `employee`;

const getAllEmployees = async (value: IEmployeeNameSearchModel): Promise<AxiosResponse<ApiResponseModel<IAllemployeeData>>> =>
    httpService.get<ApiResponseModel<IAllemployeeData>>(`${endPointBaseURL}/getAllEmployees?employeeName=${value.employeeName}&month=${value.month ? value.month : ''}&year=${value.year ? value.year : ''}`);

const getByIdEmployee = async (employeeId?: string | number): Promise<AxiosResponse<ApiResponseModel<IAllemployeeData>>> =>
    httpService.get<ApiResponseModel<IAllemployeeData>>(`${endPointBaseURL}/getByIdEmployee/${employeeId}`);

const getAllEmployeeDD = async (): Promise<AxiosResponse<ApiResponseModel<Array<IReportingPersonModel>>>> =>
    httpService.get<ApiResponseModel<Array<IReportingPersonModel>>>(`${endPointBaseURL}/getReportPerson`);

const deleteEmployee = async (employeeId: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.delete<ApiResponseModel<boolean>>(`${endPointBaseURL}/deleteEmployee/${employeeId}`);

const uploadDocuments = async (requestBody: FormData, id: string): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.post<ApiResponseModel<any>>(`document/add/${id}`, requestBody);

const uploadPersonalDetails = async (requestBody: Employee, employeeID: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/updatePersonalDetails/${employeeID}`, requestBody);

const uploadEmergencyDetails = async (requestBody: EmergencyContact, employeeID: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`emergencyContact/addEmergencyContact?employeeId=${employeeID}`, requestBody);

const uploadExperience = async (requestBody: any, employeeId: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`experienceDetails/addExperienceDetails?employeeId=${employeeId ? employeeId : ""}`, requestBody);

const uploadBankDetails = async (requestBody: BankDetail, employeeId: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`bank/uploadBankDetails?employeeId=${employeeId ? employeeId : ''}`, requestBody);

const deleteExperience = async (index: number, employeeId: string): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.delete<ApiResponseModel<boolean>>(`experienceDetails/deleteExperienceDetails?experienceId=${index}&employeeId=${employeeId ? employeeId : ""}`);

const getAllPersonalDetail = async (): Promise<AxiosResponse<ApiResponseModel<IAllemployeeData>>> =>
    httpService.get<ApiResponseModel<IAllemployeeData>>(`${endPointBaseURL}/personalDetails`);

const getPersonalDetailById = async (id: string | undefined): Promise<AxiosResponse<ApiResponseModel<IAllemployeeData>>> =>
    httpService.get<ApiResponseModel<IAllemployeeData>>(`${endPointBaseURL}/personalDetails/${id}`);

const AddAssetsDetailsByID = async (res: AssetsDetails, id: number | string): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.post<ApiResponseModel<any>>(`assets/addAssets?employeeId=${id}`, res);

const UpdateAssetsDetailsByID = async (res: AssetsDetails, id: number | string, assetsID: string): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.put<ApiResponseModel<any>>(`assets/updateAssets?employeeId=${id}&assetsId=${assetsID}`, res);

const DeleteAssetsDetailsByID = async (id: number): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.delete<ApiResponseModel<any>>(`assets/deleteAssets?assetsId=${id}`);

export default {
    getAllEmployees,
    getByIdEmployee,
    deleteEmployee,
    uploadDocuments,
    uploadPersonalDetails,
    uploadBankDetails,
    uploadEmergencyDetails,
    getAllPersonalDetail,
    uploadExperience,
    deleteExperience,
    getPersonalDetailById,
    getAllEmployeeDD,
    AddAssetsDetailsByID,
    DeleteAssetsDetailsByID,
    UpdateAssetsDetailsByID,
};
