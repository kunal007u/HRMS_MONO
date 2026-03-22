import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface EmployeeDetailsState {
    employee: any;
    documents: any;
    bankDetail: any;

}

const initialState: EmployeeDetailsState = {
    employee: {},
    documents: {},
    bankDetail: {},

};

const employeeDetailsSlice = createSlice({
    name: 'employeeDetails',
    initialState,
    reducers: {
        setEmployeeDetails: (state, action) => {
            state.employee = action.payload.employee;
            state.documents = action.payload.documents;
            state.bankDetail = action.payload.bankDetail;
        },
    },

});

export const { setEmployeeDetails } = employeeDetailsSlice.actions;
export default employeeDetailsSlice.reducer;
