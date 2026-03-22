import { Button, IconButton, InputAdornment } from '@mui/material';
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from 'react';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IVerifyPasswordRequestModel } from '../../Models/account/accountM';
import { Routing } from '../../Routes/routing';
import accountService from "../../Services/account-service";
import FormikInput from '../../Shared/formik-fields/FormikInput';
import FormikInputOTP from "../../Shared/formik-fields/FormikInputOTP";
import { adminLogin } from "../../Store/slices/authSlice";
import { OtpVerificationValidationSchema, ResetPasswordValidationSchema } from "../../Validations/accountV";
import "./login.css";
import pragetx from '../../Assets/Images/pragetx.png'

const showHidePassword = (show: boolean, handleShowPassword: (show: boolean) => void) => (
    <IconButton
        title={show ? "Hide" : "Show"}
        aria-label="toggle password visibility"
        onClick={() => handleShowPassword(!show)}
        edge="end"
        style={{ color: "white" }}
    >
        {show ? <MdVisibilityOff /> : <MdVisibility />}
    </IconButton>
);

interface IPasswordVisibility {
    showPassword: boolean;
    showConfirmPassword: boolean;
}

const OtpVerification: React.FC = () => {
    const [verifiedOtp, setVerifiedOtp] = React.useState<boolean>(false);
    const [minutes, setMinutes] = React.useState<number>(1);
    const [seconds, setSeconds] = React.useState<number>(59);


    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    }, [seconds, minutes]);

    const dispatch = useDispatch();

    const [passwordVisibility, setPasswordVisibility] = React.useState<IPasswordVisibility>({
        showPassword: false,
        showConfirmPassword: false
    });

    const handleShowPassword = React.useCallback((show: boolean) => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            showPassword: show
        }));
    }, []);

    const handleShowConfirmPassword = React.useCallback((show: boolean) => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            showConfirmPassword: show
        }));
    }, []);

    const navigate = useNavigate();

    const OtpMutation = useMutation({
        mutationFn: async (requestBody: IVerifyPasswordRequestModel) => {
            if (verifiedOtp) {
                const res = {
                    password: requestBody.password,
                    confirmPassword: requestBody.confirmPassword,
                }
                const response = await accountService.verifyPassword(res);
                if (response?.data?.status) {
                    setVerifiedOtp(false);
                    toast.success(response?.data?.status?.message);
                    navigate(Routing?.Login);
                }
                return response.data;
            }
            else {
                const response = await accountService.verifyOtp(requestBody);
                if (response?.data?.status) {
                    setVerifiedOtp(true);
                    dispatch(adminLogin(response?.data?.data));
                    toast.success(response?.data?.status?.message);
                }
                return response.data;
            }
        },
    });

    const handleSubmit = (values) => OtpMutation.mutate(values);

    const handleResendOtp = async () => {
        setMinutes(1);
        setSeconds(59);

        const response = await accountService.resendOtp();
        if (response?.data?.status) {
            toast.success(response?.data?.status?.message);
        }
    }

    return (
        <>
            <section className="login-form-container">
                <div className="left-part">
                    <div className="pragetx-logo">
                        <img src={pragetx} alt="logo" />
                    </div>
                    <div className="left-part-bg"></div>
                    <div className="left-part-project-content">
                        <div className="project-name">
                            <p className="project-name-word">Human</p>
                            <p className="project-name-word">Resource</p>
                            <p className="project-name-word">Management</p>
                            <p className="project-name-word">System</p>
                        </div>
                        <p className="project-description">Streamlining HR, Empowering Teams!</p>
                    </div>
                </div>


                <div className="right-part">
                    <div className="login-form">
                        <h1 >
                            <span className="welcome">Change Password</span>
                        </h1>
                        {
                            verifiedOtp ? (
                                <Formik
                                    initialValues={{
                                        password: "",
                                        confirmPassword: ""
                                    }}
                                    onSubmit={handleSubmit}
                                    validationSchema={ResetPasswordValidationSchema}
                                >
                                    {({ handleSubmit }) => {
                                        return (
                                            <>
                                                <Form className="l-form" onSubmit={handleSubmit}>
                                                    {/* <label className="text-sm font-medium text-white tracking-wide">New Password</label> */}
                                                    <Field
                                                        placeholder="New Password"
                                                        name="password"
                                                        type={passwordVisibility?.showPassword ? "text" : "password"}
                                                        id="password"
                                                        component={FormikInput}
                                                        className="login-page-fields email-field"
                                                        endAdornment={
                                                            <InputAdornment position="end" >
                                                                {passwordVisibility?.showPassword
                                                                    ? showHidePassword(true, handleShowPassword)
                                                                    : showHidePassword(false, handleShowPassword)}
                                                            </InputAdornment>
                                                        }

                                                    />
                                                    {/* <label className="text-sm font-medium text-gray-700 tracking-wide">Confirm Password</label> */}
                                                    <Field
                                                        placeholder="Confirm Password"
                                                        type={passwordVisibility?.showConfirmPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        id="confirmPassword"
                                                        component={FormikInput}
                                                        endAdornment={
                                                            <InputAdornment position="end" >
                                                                {passwordVisibility?.showConfirmPassword
                                                                    ? showHidePassword(true, handleShowConfirmPassword)
                                                                    : showHidePassword(false, handleShowConfirmPassword)}
                                                            </InputAdornment>
                                                        }
                                                        className="login-page-fields email-field"

                                                    />
                                                    <div className="forgot-password">
                                                        <Link to={Routing?.Login} style={{ color: "white" }}><p style={{ color: "gray" }}> Back to login?</p></Link>
                                                    </div>
                                                    <Button
                                                        variant="contained"
                                                        disableElevation
                                                        type="submit"
                                                        className="login-button"
                                                        sx={{ width: "100%" }}
                                                        disabled={OtpMutation.isPending}

                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>

                                            </>

                                        );
                                    }}
                                </Formik>

                            ) :
                                (
                                    <>
                                        <Formik
                                            initialValues={{
                                                otp: "",
                                            }}
                                            onSubmit={handleSubmit}
                                            validationSchema={OtpVerificationValidationSchema}
                                        >
                                            {({ handleSubmit, setFieldValue, values }) => {
                                                return (
                                                    <Form className="l-form" onSubmit={handleSubmit}>
                                                        <div className="space-y-2">
                                                            <Field
                                                                name='otp'
                                                                numInputs={6}
                                                                value={values?.otp}
                                                                inputType="number"
                                                                onChange={(value) => {
                                                                    setFieldValue('otp', value);
                                                                }}
                                                                component={FormikInputOTP}
                                                            />
                                                        </div>

                                                        <Button
                                                            variant="contained"
                                                            disableElevation
                                                            type="submit"
                                                            className="login-button"
                                                            disabled={OtpMutation.isPending}
                                                            sx={{ width: "100%" }}

                                                        >
                                                            Submit
                                                        </Button>
                                                        <div className="timer mt-1 d-flex justify-between " style={{ color: "white" }}>
                                                            <div>
                                                                <Link to={Routing?.Login} style={{ color: "white" }}><p style={{ color: "gray" }}>Back to login?</p></Link>
                                                            </div>
                                                            <div>
                                                                {minutes}:{seconds < 10 ? `0${seconds}` : seconds} |
                                                                <button
                                                                    onClick={() => {
                                                                        handleResendOtp();
                                                                    }}
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        backgroundColor: "transparent",
                                                                        border: "none",
                                                                        color: "white",
                                                                        fontSize: "16px",
                                                                        marginLeft: '4px',
                                                                    }}
                                                                    className={`text-white ${seconds !== 0 ? "disabled" : ""}`}
                                                                >
                                                                    Resend OTP
                                                                </button>
                                                            </div>

                                                        </div>
                                                    </Form>
                                                );
                                            }}
                                        </Formik>
                                    </>


                                )
                        }

                    </div >
                </div>

            </section>
        </>

    )
}

export default OtpVerification;
