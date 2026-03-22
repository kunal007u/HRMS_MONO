import { AxiosResponse } from 'axios';
import httpService from './http-service';
import { ApiResponseModel } from './api';
import { IRoutesModel } from '../Models/routes/routesM';

const endPointBaseURL = `route`;

const getAllRoutes = async (): Promise<AxiosResponse<ApiResponseModel<Array<IRoutesModel>>>> =>
    httpService.get<ApiResponseModel<Array<IRoutesModel>>>(`${endPointBaseURL}/getAllRoutes`);

export default {
    getAllRoutes
}