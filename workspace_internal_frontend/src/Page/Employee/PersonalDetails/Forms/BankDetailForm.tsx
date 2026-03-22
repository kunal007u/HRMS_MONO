import { useQueryClient } from "@tanstack/react-query";
import personalDetailService from "../../../../Services/personal-detail-service";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import FormikInput from "../../../../Shared/formik-fields/FormikInput";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { employeeBankSchema } from "../../../../Validations/employeeV";
import { BankDetail } from "../../../../Models/employee/employeeM";

interface IAllemployeeData {
    bankDetails: BankDetail;
    setOpenDialog: (value: boolean) => void;
}

const BankDetailForm = ({ bankDetails, setOpenDialog }: IAllemployeeData) => {
    const queryClient = useQueryClient()
    const { id } = useParams()

    const handleSubmit = async (values: BankDetail) => {
        await personalDetailService
            .uploadBankDetails(values, id ? id : "")
            .then((res) => {
                if (res?.data?.status) {
                    queryClient.invalidateQueries({ queryKey: ['employeeDetail'] })
                    setOpenDialog(false)
                    toast.success(res?.data?.status?.message)
                }
            }
            ).catch((err) => {
                console.log(err);
            })
    }

    return (
        <section className="bank-detail-form">
            <Formik
                initialValues={{
                    bankName: bankDetails?.bankName ? bankDetails?.bankName : "",
                    branchName: bankDetails?.branchName ? bankDetails?.branchName : "",
                    accountNo: bankDetails?.accountNo ? bankDetails?.accountNo.toString() : "",
                    IFSC: bankDetails?.ifsc ? bankDetails?.ifsc : "",
                    isActive: bankDetails?.isActive ? bankDetails?.isActive : true,
                    employeeId: bankDetails?.employeeId ? bankDetails?.employeeId : "",
                }}
                onSubmit={handleSubmit}
                validationSchema={employeeBankSchema}
            >
                {({ values, setFieldValue }) => {
                    return (
                        <Form className="personal-detail-form-container">
                            <div className="personal-detail-form-content">
                                <div className="bank-name content-box">
                                    <label htmlFor="bankName" className='form-label'>Bank Name</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="bankName"
                                        name="bankName"
                                        value={values?.bankName}
                                        component={FormikInput}
                                        onChange={(e) => setFieldValue("bankName", e.target.value)}
                                    />
                                </div>
                                <div className="branch-name content-box">
                                    <label htmlFor="branchName" className='form-label'>Branch Name</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="branchName"
                                        name="branchName"
                                        value={values?.branchName}
                                        component={FormikInput}
                                        onChange={(e) => setFieldValue("branchName", e.target.value)}
                                    />
                                </div>
                                <div className="account-number content-box">
                                    <label htmlFor="accountNo" className='form-label'>Account Number</label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="accountNo"
                                        name="accountNo"
                                        value={values?.accountNo}
                                        component={FormikInput}
                                        onChange={(e) => setFieldValue("accountNo", e.target.value)}
                                    />
                                </div>
                                <div className="ifsc-code content-box">
                                    <label htmlFor="IFSC" className='form-label'>IFSC Code</label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="IFSC"
                                        name="IFSC"
                                        value={values?.IFSC}
                                        component={FormikInput}
                                        onChange={(e) => setFieldValue("IFSC", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="submit-btn">
                                <Button type="submit" className="btn btn-primary">
                                    <span>Submit</span>
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik >
        </section>
    )
}

export default BankDetailForm