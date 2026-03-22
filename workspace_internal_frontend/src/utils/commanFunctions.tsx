/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton, TableCell, TableRow } from '@mui/material';
import { camelCase } from 'lodash';
import { toast } from 'react-toastify';
import { Routing } from '../Routes/routing';
import accountService from '../Services/account-service';
import messages from '../Shared/constants/messages';
import { adminLogout } from '../Store/slices/authSlice';
import { IApplicationState } from '../Store/state/app-state';
import store from '../Store/store';
import moment from 'moment';

export const getBaseURL = (url: string) => {
    return url + "/";
};
export const camelizeKeys = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map((v) => camelizeKeys(v));
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [camelCase(key)]: camelizeKeys(obj[key]),
            }),
            {},
        );
    }
    return obj;
};

export function formatTitle(title: string): string {
    const words = title.split(/[\s-]+/);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}


//ANCHOR - For Year Dropdown [usage - Attendance]
const currentYear = moment().year();

export const years: { title: number; value: number }[] = [];

for (let year = 2020; year <= currentYear; year++) {
    years.push({
        title: year,
        value: year
    });
}

export const TableRowsLoader = ({ rowsNum = 5, columnsNum = 1 }) => {
    const renderSkeletonCells = () => {
        const skeletonCells: JSX.Element[] = [];
        for (let i = 1; i < columnsNum; i++) {
            skeletonCells.push(
                <TableCell key={i}>
                    <Skeleton animation="wave" variant="text" />
                </TableCell>
            );
        }
        return skeletonCells;
    };

    return (
        <>
            {[...Array(rowsNum)].map((row, index) => (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        <Skeleton animation="wave" variant="text" />
                    </TableCell>
                    {renderSkeletonCells()}
                </TableRow>
            ))}
        </>
    );
};

export const getModulePermission = async (moduleName: string) => {
    const dispatch = store.dispatch
    const storeData: IApplicationState = store.getState();

    let route = storeData?.UserData?.permissions?.find((x) => {
        if (x?.childs && x?.childs?.length > 0) {
            const childRoute = x?.childs?.find((x) => x.module === moduleName);
            if (childRoute?.id) {
                return true;
            } else return false;
        } else return x.module === moduleName
    });

    if (route?.id && (route?.childs?.length ?? 0) > 0) route = route?.childs?.find((x) => x.module === moduleName);
    if (route?.id) {
        const response: any = await accountService.routePermission(route?.id);
        if (!response?.data?.data?.canRead) {
            window.open(Routing.Login, '_self');
            toast.error(messages.AccessDenied);
            dispatch(adminLogout())
            return null;
        } else {
            return response?.data?.data;
        }
    } else return null;
};


export async function downloadFile(url: string) {
    const response = await fetch(url);
    const data = await response.arrayBuffer();

    const blob = new Blob([data], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    const path = url.split('uploads')[1];
    link.download = path;
    link.click();
    URL.revokeObjectURL(blobUrl);
}