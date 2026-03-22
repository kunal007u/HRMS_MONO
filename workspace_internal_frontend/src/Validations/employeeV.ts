/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf', 'file/pdf'];


const labels = [
    { id: 'tenMarksheet', text: '10th Marksheet' },
    { id: 'twelveMarksheet', text: '12th Marksheet' },
    { id: 'degreeMarksheet', text: 'Degree Certificate' },
    { id: 'adharCard', text: 'Adhar card' },
    { id: 'panCard', text: 'Pan Card' },
    { id: 'salarySlip1', text: 'Salary Slips1' },
    { id: 'salarySlip2', text: 'Salary Slips2' },
    { id: 'salarySlip3', text: 'Salary Slips3' },
    { id: 'probationComplitionLetter', text: 'Relieving latter' },
    { id: 'appointmentLetter', text: 'Appointment Letter' },
    { id: "passbook", text: "Passbook" }
];

export const PersonalDetailSchema = yup.object().shape({
    currentAddress: yup.string().required('Current address is required'),
    permanentAddress: yup.string().required('Permanent address is required'),
    emergencyContact: yup.string().required('Emergency contact is required').matches(/^\+91\d{10}$/, 'Emergency contact must be a valid Indian mobile number'),
    gender: yup.string().required('Gender is required'),
    dob: yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
    experience: yup.number().required('Experience is required').min(0, 'Experience must be greater than 0'),
    skills: yup.array()
        .of(yup.string())
        .required('At least one skill is required')
        .min(1, 'At least one skill is required'),

    qualifications: yup.string().required('Qualifications are required')
});

// export const personalDetailFileSchema = yup.object().shape({
//     tenMarksheet: yup.mixed()
//         .test('fileSize', 'File too large', (value) => {
//             if (!value || typeof value !== 'object' || !('size' in value)) return false;
//             return ((value as File).size <= 2 * 1024 * 1024); // 2 MB
//         })

//         .test('fileFormat', 'Invalid format', (value) => {
//             if (!value || typeof value !== 'object' || !('type' in value)) return false;
//             return SUPPORTED_FORMATS.includes((value as File).type);
//         }),

//     twelveMarksheet: yup.mixed()
//         .test('fileSize', 'File too large', (value) => {
//             if (!value || typeof value !== 'object' || !('size' in value)) return false;
//             return ((value as File).size <= 5 * 1024 * 1024);
//         })

//         .test('fileFormat', 'Invalid format', (value) => {
//             if (!value || typeof value !== 'object' || !('type' in value)) return false;
//             return SUPPORTED_FORMATS.includes((value as File).type);
//         }),

//     degreeMarksheet: yup.mixed()

//         .test('fileSize', 'File too large', (value) => {
//             if (!value || typeof value !== 'object' || !('size' in value)) return false;
//             return ((value as File).size <= 5 * 1024 * 1024);
//         })

//         .test('fileFormat', 'Invalid format', (value) => {
//             if (!value || typeof value !== 'object' || !('type' in value)) return false;
//             return SUPPORTED_FORMATS.includes((value as File).type);
//         }),

//     adharCard: yup.mixed()

//         .test('fileSize', 'File too large', (value) => {
//             if (!value || typeof value !== 'object' || !('size' in value)) return false;
//             return ((value as File).size <= 5 * 1024 * 1024);
//         })

//         .test('fileFormat', 'Invalid format', (value) => {
//             if (!value || typeof value !== 'object' || !('type' in value)) return false;
//             return SUPPORTED_FORMATS.includes((value as File).type);
//         }),

//     panCard: yup.mixed()

//         .test('fileSize', 'File too large', (value) => {
//             if (!value || typeof value !== 'object' || !('size' in value)) return false;
//             return ((value as File).size <= 5 * 1024 * 1024);
//         })

//         .test('fileFormat', 'Invalid format', (value) => {
//             if (!value || typeof value !== 'object' || !('type' in value)) return false;
//             return SUPPORTED_FORMATS.includes((value as File).type);
//         }),

//     salarySlip1: yup.mixed()

//         .test('fileSize', 'File too large', (value) => {
//             if (!value || typeof value !== 'object' || !('size' in value)) return false;
//             return ((value as File).size <= 5 * 1024 * 1024);
//         })

//         .test('fileFormat', 'Invalid format', (value) => {
//             if (!value || typeof value !== 'object' || !('type' in value)) return false;
//             return SUPPORTED_FORMATS.includes((value as File).type);
//         }),

//     salarySlip2: yup.mixed()

//         .test('fileSize', 'File too large', (value) => {
//             if (!value || typeof value !== 'object' || !('size' in value)) return false;
//             return ((value as File).size <= 5 * 1024 * 1024);
//         })

//         .test('fileFormat', 'Invalid format', (value) => {
//             if (!value || typeof value !== 'object' || !('type' in value)) return false;
//             return SUPPORTED_FORMATS.includes((value as File).type);
//         }),

//     salarySlip3: yup.mixed()

//         .test('fileSize', 'File too large', (value) => {
//             if (!value || typeof value !== 'object' || !('size' in value)) return false;
//             return ((value as File).size <= 5 * 1024 * 1024);
//         })

//         .test('fileFormat', 'Invalid format', (value) => {
//             if (!value || typeof value !== 'object' || !('type' in value)) return false;
//             return SUPPORTED_FORMATS.includes((value as File).type);
//         }),
// })

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 5 MB

const createFileSchema = (labels) => {
    return labels.reduce((schema, label) => {
        schema[label.id] = yup.mixed()
            .test('fileSize', 'File too large', (value) => {
                if (!value) return true; // Allow empty fields
                if (value instanceof File) {
                    return value.size <= MAX_FILE_SIZE;
                }
                return false;
            })
            .test('fileFormat', 'Invalid format', (value) => {
                if (!value) return true; // Allow empty fields
                if (value instanceof File) {
                    return SUPPORTED_FORMATS.includes(value.type);
                }
                return false;
            });
        return schema;
    }, {});
};

export const finalSchema = yup.object().shape(createFileSchema(labels));

export const PersonalBankDetailSchema = yup.object().shape({
    bankName: yup.string().required('Bank Name is required'),
    accountNo: yup
        .string()
        .matches(/^\d{9,18}$/, 'Account number must be 9-18 digits')
        .required('Account number is required'),
    ifscCode: yup.string()
        .matches(/^[A-Z]{4}[0-9]{7}$/, 'Invalid IFSC Code')
        .required('IFSC Code is required'),
    branchName: yup.string().required('Branch Name is required'),
});

export const AddEmployeeSchema = yup.object().shape({
    // profilePicture: yup.mixed().required('Profile picture is required').test('fileSize', 'File size too large', (value) => {
    //     if (!value?.size ) return true;
    //     return (value as File)?.size <= 2000000; // 2 MB
    // }).test('fileType', 'Only image allowed', (value) => {
    //     if (!value?.type) return true;
    //     return ['application/image', 'image/jpeg', 'image/png', 'image/avif'].includes((value as File)?.type); // Only image allowed
    // }),
    firstName: yup.string()
        .required("First Name is required")
        .min(2, "First Name must be at least 2 characters")
        .max(50, "First Name cannot exceed 50 characters")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid name'),
    lastName: yup.string()
        .required("Last Name is required")
        .min(2, "Last Name must be at least 2 characters")
        .max(50, "Last Name cannot exceed 50 characters")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid name'),

    pancardNo: yup.string().length(10, "Pan card number must be 10 digits").required("Pan card number is required").matches((/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/), 'Invalid Pan card number'),
    aadharNo: yup.string().length(12, "Aadhar number must be 12 digits").required("Aadhar number is required"),
    email: yup.string().email("Invalid email address").required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    dateOfJoining: yup.date().required("Joining date is required"),
    gender: yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
    // phoneNumber: yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required("Phone number is required"),
    departmentId: yup.string().required("Department is required"),
    designationId: yup.string().required("Designation is required"),
    roleId: yup.string().required("Role is required"),
    reportTo: yup.string().required("Reporting person is required"),
    workLocation: yup.string()
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid work location')
        .required("Work location is required"),
    profilePicture: yup.mixed()
        .test('fileSize', 'File size too large', (value: any) => {
            if (!value?.size) return true;
            return (value as File)?.size <=  8388608; // 8 MB
        })
        .test('fileType', 'Only image allowed', (value: any) => {
            if (!value?.type) return true;
            return ['application/image', 'image/jpeg', 'image/png', 'image/avif'].includes((value as File)?.type); // Only image allowed
        }),
    employeeCode: yup.string().required("Employee code is required"),
})

export const personalInfoSchema = yup.object().shape({
    currentAddress: yup.string()
        .required('Current address is required')
        .trim(),

    permanentAddress: yup.string()
        .required('Permanent address is required')
        .trim(),

    // pincode: yup.string()
    //     .matches(/^[0-9]+$/, 'Pin code must be numbers only')
    //     .min(6, 'Pin code must be 5 digits')
    //     .max(6, 'Pin code must be 5 digits')
    //     .required('Pin code is required'),

    // city: yup.string()
    //     .min(2, 'City must be at least 2 characters')
    //     .max(50, 'City must be at most 50 characters')
    //     .required('City is required')
    //     .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid city name'),

    // state: yup.string()
    //     .max(50, 'State must be at most 50 characters')
    //     .required('State is required')
    //     .min(2, 'State must be at least 2 characters')
    //     .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid state name'),

    dateOfBirth: yup.string()
        .required('Birthday is required')
        .test('is-greater', 'birth date must be less than or equal to current date', function (value) {
            const dateOfBirth = new Date(value); // Convert string to Date object
            return dateOfBirth <= new Date();
        })
        .test('is-lesser', 'birth year cannot be less then 1900', function (value) {
            const dateOfBirth = new Date(value); // Convert string to Date object
            return dateOfBirth.getFullYear() >= 1900;
        }),

    qualification: yup.string()
        .max(255, 'Qualifications must be at most 255 characters')
        .required('Qualifications are required'),

    nationality: yup.string()
        .max(50, 'Nationality must be at most 50 characters')
        .required('Nationality is required'),

    passportNumber: yup.string()
        .nullable()
        .matches(/^[a-zA-Z0-9]+$/, 'Passport number must be alphanumeric')
        .max(10, 'Passport number must be at most 10 characters'),

    fatherName: yup.string()
        .max(50, "Father's full name must be at most 50 characters")
        .required("Father's full name is required")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid father name')
        .min(2, "Father's full name must be at least 2 characters"),

    motherName: yup.string()
        .max(50, "Mother's full name must be at most 50 characters")
        .required("Mother's full name is required")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid mother name')
        .min(2, "Father's full name must be at least 2 characters"),

})

export const employeeContactSchema = yup.object().shape({
    primaryName: yup.string()
        .required('Primary Name is required')
        .min(2, "Primary Name must be at least 2 characters")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid name'),
    primaryRelationship: yup.string()
        .required('Relationship is required')
        .min(2, "Relationship must be at least 2 characters")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid relationship'),
    primaryPhoneNo: yup.string()
        .required('Phone is required').matches(/^[0-9]{10}$/, "Invalid phone number"),
    secondaryName: yup.string()
        .required('Secondary Name is required')
        .min(2, "Secondary Name must be at least 2 characters")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid name'),
    secondRelationship: yup.string()
        .required('Relationship is required')
        .min(2, "Relationship must be at least 2 characters")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid relationship'),
    secondaryPhoneNo: yup.string()
        .required('Phone is required').matches(/^[0-9]{10}$/, "Invalid phone number"),
})

export const employeeBankSchema = yup.object().shape({
    bankName: yup.string()
        .required('Bank Name is required')
        .min(2, "Bank name must be at least 2 characters")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid bank name'),

    accountNo: yup.string()
        .required('Account Number is required')
        .min(11, "Account number must be at least 11 characters")
        .max(17, "Account number cannot exceed 17 characters")
        .matches(/^[0-9]+$/, 'Account number must be numbers only'),

    IFSC: yup.string()
        .required('IFSC Code is required')
        .min(11, "IFSC code must be at least 11 characters")
        .max(11, "IFSC code cannot exceed 11 characters")
        .matches(/^[A-Z]{4}[0-9]{7}$/, 'Invalid IFSC Code'),

    branchName: yup.string()
        .required('Branch Name is required')
        .min(2, "Branch name must be at least 2 characters")
        .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, 'Please enter valid branch name'),

})

export const employeeExperienceSchema = yup.object().shape({
    companyName: yup.string()
        .required('Company Name is required'),
    designation: yup.string()
        .required('Designation is required'),
    startDate: yup.date()
        .required('Start Date is required'),
    endDate: yup.date()
        .required('End Date is required'),
    experience: yup.number()
        .required('Experience is required'),
})

export const addAssetValidationSchema = yup.object().shape({
    assetsName: yup.string().required('Asset name is required').trim(),
    quantity: yup.number().required('Quantity is required').integer('Quantity must be an integer').min(1, 'Quantity must be greater than 0'),
    assignedDate: yup.date().required('Assigned date is required'),
    description: yup.string().required('Description is required').trim()
})