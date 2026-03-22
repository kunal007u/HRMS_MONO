import * as yup from 'yup';

export const addPoliciesSchema = yup.object().shape({
    name: yup.string().required('Policy Name is required')
        .min(2, "Policy Name must be at least 2 characters")
        .max(50, "Policy Name cannot exceed 50 characters")
        .matches(/^[a-zA-Z]+( [a-zA-Z]+)*$/, "Policy Name must contain only alphabets")
        .trim(),
    description: yup.string().required('Policy Description is required')
        .min(2, "Policy Description must be at least 2 characters")
        .max(5000, "Policy Description cannot exceed 5000 characters")
        .trim(),
    policyFile: yup.mixed().required('Policy File is required')
        .test(
            "fileSize",
            "File is too large, must be less than 2MB",
            value => {
                if (typeof value === 'string') {
                    return true;
                }
                return value && (value as File).size <= 2 * 1024 * 1024;
            }
        )
})
