/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBaseCreateRequest {
    createdBy?: number;
    createdAt?: Date;
}

export interface IBaseUpdateRequest {
    updatedBy?: number;
    updatedAt?: Date;
}

export interface IColumn {
    name?: string;
    data?: string | any;
    orderable?: boolean;
    searchable?: boolean;
    search?: string;
    width?: number;
    className?: string;
    datas?: string;
    dataset?: string;
}