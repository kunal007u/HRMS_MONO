import { ISidebarData } from "../../Layout/Sidebar/sidebar-data";

export interface IApplicationState {
    UserData?: IAuthState;
}

export interface IAuthState {
    id?: string | number
    email?: string
    name?: string
    phone?: string
    role?: string
    token?: string
    profilePicture?: string
    permissions?: ISidebarData[];
    designation?: string;
    reportingPerson?: string;
    employee_code?: string;
}
