import { Button } from '@mui/material';
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from 'react';
import { MdSentimentSatisfiedAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { IForgetPasswordRequestModel } from "../../Models/account/accountM";
import { Routing } from '../../Routes/routing';
import accountService from "../../Services/account-service";
import FormikInput from "../../Shared/formik-fields/FormikInput";
import { adminLogin } from '../../Store/slices/authSlice';
import { ForgotPasswordValidationSchema } from "../../Validations/accountV";
import "./login.css";
import pragetx from '../../Assets/Images/pragetx.png'

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const forgotPasswordMutation = useMutation({
        mutationFn: accountService.forgotPassword,
        onSuccess: (response) => {
            dispatch(adminLogin(response?.data?.data));
            toast.success(response?.data?.status?.message);
            navigate(Routing?.OtpVerification);
        },
    });

    const handleSubmit = (values: IForgetPasswordRequestModel) => {
        forgotPasswordMutation.mutate(values);
    };

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
                        <h1>
                            <span className="welcome">Forgot Password<MdSentimentSatisfiedAlt /></span>
                        </h1>
                        <Formik
                            initialValues={{
                                email: "",
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={ForgotPasswordValidationSchema}
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

                                        <div className="forgot-password">
                                            <Link to={Routing?.Login} style={{ color: "white" }}><p style={{ color: "gray" }}> Back to login?</p></Link>
                                        </div>
                                        
                                        <Button
                                            variant="contained"
                                            disableElevation
                                            type="submit"
                                            className="login-button"
                                            sx={{ width: "100%" }}
                                            disabled={forgotPasswordMutation.isPending}
                                        >
                                            Submit
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

export default ForgotPassword;
