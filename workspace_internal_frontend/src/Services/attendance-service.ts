import type { AxiosResponse } from 'axios';
import type { IAttendanceResponseModal } from '../Models/attendance/attendanceM';
import type { ApiResponseModel } from './api';
import httpService from './http-service';

const endPointBaseURL = `attendance`;

const dailyLog = async (month: string | number, year: string, employeeId: string | number | undefined): Promise<AxiosResponse<ApiResponseModel<IAttendanceResponseModal>>> =>
    httpService.get<ApiResponseModel<IAttendanceResponseModal>>(`${endPointBaseURL}/getByEmployeeCode?employee_code=${employeeId}&month=${month}&year=${year}`);

const deleteEmployeeLog = async (log): Promise<AxiosResponse<ApiResponseModel<IAttendanceResponseModal>>> =>
    httpService.put<ApiResponseModel<IAttendanceResponseModal>>(`${endPointBaseURL}/deleteEmployeeLog`, log);

const addEmpLogManually = async (log): Promise<AxiosResponse<ApiResponseModel<IAttendanceResponseModal>>> =>
    httpService.post<ApiResponseModel<IAttendanceResponseModal>>(`${endPointBaseURL}/addEmpLogManually`, log);

export default {
    dailyLog,
    deleteEmployeeLog,
    addEmpLogManually
};
