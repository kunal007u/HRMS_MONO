import * as Yup from 'yup';
export const LoginValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string().required('Email is required!').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
        password: Yup.string().min(5, 'Password must be 5 character length!').required('Password is required!'),
    });
};

export const ForgotPasswordValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string().required('Email is required!').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format').trim()
    });
}

export const OtpVerificationValidationSchema = () => {
    return Yup.object().shape({
        otp: Yup.string().required('OTP is required!'),
    });
}

export const ResetPasswordValidationSchema = () => {
    return Yup.object().shape({
        currentPassword: Yup.string().min(6, 'Password must be 6 character length!'),
        password: Yup.string().min(6, 'Password must be 6 character length!').notOneOf([Yup.ref('currentPassword')], 'New password can\'t be the same as current password').required('Password is required!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('New Password is required'),
    });
}