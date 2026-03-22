/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from 'axios';
import type { ApiResponseModel } from './api';
import httpService from './http-service';
import { CalculateMonthlySalaryModel, EmployeeMonthlySalaryModel, EmployeeSalaryModel } from '../Models/employee/employeeM';

const endPointBaseURL = `salary`;

const getAllEmployeesSalary = async (search): Promise<AxiosResponse<ApiResponseModel<Array<EmployeeSalaryModel>>>> =>
    httpService.get<ApiResponseModel<Array<EmployeeSalaryModel>>>(`${endPointBaseURL}/getAll?search=${search ?? ''}`);

const addUpdateSalary = async (value): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.post<ApiResponseModel<any>>(`${endPointBaseURL}/add`, value);

const deleteEmployeesSalary = async (id: number): Promise<AxiosResponse<ApiResponseModel<any>>> =>
    httpService.delete<ApiResponseModel<any>>(`${endPointBaseURL}/delete/byId/${id}`);

const createMonthlyEmployeesSalary = async (requestBody: CalculateMonthlySalaryModel): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.post<ApiResponseModel<boolean>>(`${endPointBaseURL}/monthly/create`, requestBody);

const getAllMonthlyEmployeesSalary = async (year: number, month: number): Promise<AxiosResponse<ApiResponseModel<Array<EmployeeMonthlySalaryModel>>>> =>
    httpService.get<ApiResponseModel<Array<EmployeeMonthlySalaryModel>>>(`${endPointBaseURL}/monthly/allEmployees?${year ? `year=${year}` : ''}${month ? `&month=${month}` : ''}`);

const getAllSalaryByEmployee = async (year: number): Promise<AxiosResponse<ApiResponseModel<Array<EmployeeMonthlySalaryModel>>>> =>
    httpService.get<ApiResponseModel<Array<EmployeeMonthlySalaryModel>>>(`${endPointBaseURL}/allSalaryByEmployee?year=${year}`);

const updatePaidSalary = async (id: string, requestBody): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/monthly/paid/${id}`, requestBody);

const updateSalaryStatus = async (requestBody): Promise<AxiosResponse<ApiResponseModel<boolean>>> =>
    httpService.put<ApiResponseModel<boolean>>(`${endPointBaseURL}/verifySalary`, requestBody);

export default {
    getAllEmployeesSalary,
    addUpdateSalary,
    deleteEmployeesSalary,
    createMonthlyEmployeesSalary,
    getAllMonthlyEmployeesSalary,
    getAllSalaryByEmployee,
    updatePaidSalary,
    updateSalaryStatus
};
