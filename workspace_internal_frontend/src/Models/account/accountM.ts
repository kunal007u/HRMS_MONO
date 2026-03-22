// Login Model
export interface ILoginResponseModel {
    id?: number
    email?: string
    name?: string
    phone?: string
    role?: string
    profilePicture?: string
    token?: string
}

export interface ILoginRequestModel {
    email: string;
    password: string;
}

// Forget Password Model
export interface IForgetPasswordRequestModel {
    email: string;
}

export interface IVerifyPasswordRequestModel {
    password?: string;
    confirmPassword?: string;
    otp?: string;
}

export interface IResetPasswordModel {
    currentPassword?: string;
    password?: string;
    confirmPassword?: string;
}
