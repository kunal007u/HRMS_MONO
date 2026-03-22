
import { IAuthState } from "../state/app-state";
import { IRoutesModel } from "../../Models/routes/routesM";
import { ISidebarData, sidebarRoutes } from "../../Layout/Sidebar/sidebar-data";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    role: "",
    token: "",
    profilePicture: "",
    permissions: [],
    designation: "",
    reportingPerson: "",
    employee_code: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        adminLogin: (state, action: PayloadAction<IAuthState>) => {
            state.id = action.payload.id ?? '';
            state.name = action.payload.name ?? '';
            state.email = action.payload.email ?? '';
            state.phone = action.payload.phone ?? '';
            state.role = action.payload.role ?? '';
            state.token = action.payload.token ?? '';
            state.profilePicture = action.payload.profilePicture ?? '';
            state.designation = action.payload.designation ?? '';
            state.reportingPerson = action.payload.reportingPerson ?? '';
            state.employee_code = action.payload.employee_code ?? '';
        },

        adminLogout: () => initialState,

        updatePermission: (state, action: PayloadAction<IRoutesModel[]>) => {
            const permissions = action.payload?.sort((a, b) => (a?.priority > b?.priority ? 1 : -1));
            const newPermission: ISidebarData[] = permissions?.map((route) => {
                const module = sidebarRoutes?.find((x) => x?.module === route?.name);
                if (route?.childRoute && route?.childRoute?.length > 0) {
                    const childRoutes = route?.childRoute?.sort((a, b) => (a?.priority > b?.priority ? 1 : -1));
                    return {
                        ...module,
                        id: route?.id,
                        childs: childRoutes
                            ?.map((routeChild) => {
                                const child = sidebarRoutes?.find((x) => x?.module === routeChild?.name);
                                if (routeChild?.childRoute && routeChild?.childRoute?.length > 0) {
                                    const subChildRoutes = routeChild?.childRoute?.sort((a, b) => (a?.priority > b?.priority ? 1 : -1));
                                    return {
                                        ...child,
                                        id: routeChild?.id,
                                        childs: subChildRoutes
                                            ?.map((subRouteChild) => {
                                                const child = sidebarRoutes?.find((x) => x?.module === subRouteChild?.name);
                                                if (child?.name) {
                                                    return { ...child, id: subRouteChild?.id, };
                                                }
                                            })
                                            .filter((x) => !!x?.name),
                                    }
                                }
                                if (child?.name) {
                                    return { ...child, id: routeChild?.id, };
                                }
                            })
                            .filter((x) => !!x?.name),
                    };
                } else {
                    return { ...module, id: route?.id};
                }
            });
            state.permissions = newPermission?.filter((x) => !!x?.name) || [];
        },
    },
});

export const { adminLogin, adminLogout, updatePermission } = authSlice.actions;

export default authSlice.reducer;
