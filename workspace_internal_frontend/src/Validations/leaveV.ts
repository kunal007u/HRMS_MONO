import * as yup from 'yup';

export const allLeaveRemarksValidationSchema = yup.object().shape({
    remarks: yup.string().required('Remark is required')
        .min(2, "Remark must be at least 2 characters")
        .max(500, "Remark cannot exceed 500 characters")
        .trim(),
})

export const updateLeaveMasterVlidationSchema = yup.object().shape({
    month: yup.string().required('Month is required'),
    leaves: yup.number().required('Leaves is required')
        .min(1, "Leaves must be at least 1")
        .max(50, "Leaves cannot exceed 50")
        .integer("Leaves must be an integer")
})

export const leaveBalanceValidationSchema = yup.object().shape({
    balance: yup.number().required('Balance is required')
        .min(1, "Balance must be at least 1")
        .max(50, "Balance cannot exceed 50")
        .integer("Balance must be an integer"),
})