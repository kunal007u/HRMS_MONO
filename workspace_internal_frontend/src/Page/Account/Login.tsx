import { Button, IconButton, InputAdornment } from '@mui/material';
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from 'react';
import { BsEmojiSmileUpsideDown } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ILoginRequestModel } from "../../Models/account/accountM";
import { Routing } from "../../Routes/routing";
import accountService from "../../Services/account-service";
import FormikInput from "../../Shared/formik-fields/FormikInput";
import { adminLogin, updatePermission } from "../../Store/slices/authSlice";
import store from "../../Store/store";
import { LoginValidationSchema } from "../../Validations/accountV";
import "./login.css";
import { jwtDecode } from "jwt-decode";
import pragetx from '../../Assets/Images/pragetx.png'

const showHidePassword = (show: boolean, handleShowPassword: (show: boolean) => void) => (
    <IconButton
        title={show ? "Hide" : "Show"}
        aria-label="toggle password visibility"
        onClick={() => handleShowPassword(!show)}
        edge="end"
        style={{ color: "white" }}
    >
        {show ? <FaEye /> : <FaEyeSlash />}
    </IconButton>
);

const Login: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = React.useCallback((show: boolean) => {
        setShowPassword(show);
    }, []);

    store.subscribe(() => {
        const storeData = store.getState();
        if (storeData.UserData?.permissions!.length > 0) {
            navigate(storeData.UserData?.permissions![0].route);
        }
    });

    const loginMutation = useMutation({
        mutationFn: accountService.loginUser,
        onSuccess: (response) => {
            const decode = jwtDecode(response?.data?.data?.token);
            const newResponse = { ...decode, ...response?.data?.data }
            if (response?.data?.status?.code) {
                dispatch(adminLogin(newResponse));
                toast.success(response?.data?.status?.message);
                permissionMutation.mutate();
            }
        },
        onError: (error: Error) => { console.log(error?.message) },
    });

    const permissionMutation = useMutation({
        mutationFn: accountService.readPermission,
        onSuccess: (response) => {
            if (response?.data?.status) {
                dispatch(updatePermission(response?.data?.data));
            }
        },
        onError: (error: Error) => console.log(error?.message),
    });

    const loginUser = (values: ILoginRequestModel) => loginMutation.mutate(values);

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
                        <div className="right-part-bg" style={{color: "white"}}>
                            <p>
                                LOGIN CREDENTIALS: <br />
                                Email:john.doe@example.com <br />
                                Password: Test@123
                            </p>
                        </div>
                        <h1>
                            <span className="welcome">Welcome <BsEmojiSmileUpsideDown /></span>
                        </h1>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={(values) => loginUser(values)}
                            validationSchema={LoginValidationSchema}
                            validateOnBlur={false}
                            validateOnChange={true}
                            enableReinitialize={true}
                        >
                            {({ handleSubmit }) => {
                                return (
                                    <Form className="l-form" onSubmit={handleSubmit}>
                                        <Field
                                            placeholder="Email"
                                            type="string"
                                            name="email"
                                            id="userName"
                                            component={FormikInput}
                                            className="login-page-fields email-field"
                                        />
                                        <Field
                                            placeholder="Password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            endAdornment={
                                                <InputAdornment position="end" >
                                                    {showPassword
                                                        ? showHidePassword(true, handleShowPassword)
                                                        : showHidePassword(false, handleShowPassword)}
                                                </InputAdornment>
                                            }
                                            component={FormikInput}
                                            className="login-page-fields password-field"
                                        />
                                        <div className="forgot-password">
                                            <Link to={Routing?.ForgotPassword}>Forgot Your Password?</Link>
                                        </div>
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            type="submit"
                                            sx={{ width: "100%" }}
                                            disabled={loginMutation.isPending}
                                        >
                                            Sign In
                                        </Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div >
                </div>

            </section>
        </>

    )
}

export default Login
