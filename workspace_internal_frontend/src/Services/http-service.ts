/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import messages from "../Shared/constants/messages";
import { HttpStatusCode } from "../Shared/enums/https-status-code";
import { IApplicationState } from "../Store/state/app-state";
import store from "../Store/store";
import { camelizeKeys, getBaseURL } from "../utils/commanFunctions";
import { adminLogout } from "../Store/slices/authSlice";


axios.interceptors.request.use(
    (config: any) => {

        const storeData: IApplicationState = store?.getState();

        if (config.url) {
            config.url = getBaseURL(import.meta.env.VITE_BASE_URL) + config.url;
        }
        config.headers = {
            ...config.headers,
            'x-access-token': storeData?.UserData?.token,
        };

        return config;
    },
    (error: AxiosError) => {
        switch (error?.response?.status) {
            case HttpStatusCode.BadRequest:
            case HttpStatusCode.ConflictError:
            case HttpStatusCode.InternalServerError:
                toast.error(messages.InternalServerError);
                return;
        }
        return Promise.reject(messages.SomethingWentWrong);
    },
);

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        return camelizeKeys(response);
    },
    (error: AxiosError | any) => {
        toast.error(error?.response?.data?.status?.message);
        switch (error.response?.status) {
            case HttpStatusCode.BadRequest:
            case HttpStatusCode.ConflictError:
            case HttpStatusCode.InternalServerError:
            case HttpStatusCode.Forbidden:
            case HttpStatusCode.NotFound:
                if ((error.response!.data as { message: string }).message) {
                    toast.error((error.response!.data as { message: string }).message);
                }
                return;
            case HttpStatusCode.Unauthorized:
                store.dispatch(adminLogout());
                return;
        }

        return Promise.reject(messages.SomethingWentWrong);
    },
);

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
};