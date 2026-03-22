import { IBaseCreateRequest, IBaseUpdateRequest } from "../base-type";

export interface IRoleModel extends IBaseCreateRequest, IBaseUpdateRequest {
    id?: number;
    name: string;
    isActive?: boolean;
    permissions?: Array<IRolePermissionModel>;
    routes?: Array<IRoleRouteModel>;
}
export interface IRolePermissionModel {
    routeId: number;
    name?: string;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean;
}
export interface IRoleRouteModel {
    id: number;
    name?: string;
    permissions?: IRoleRoutePermissionModel | undefined | null;
}
export interface IRoleRoutePermissionModel {
    id?: 1;
    routeName?: string;
    canCreate?: boolean;
    canRead?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
}
