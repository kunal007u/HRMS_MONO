import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import personalDetailService from "../../../../Services/personal-detail-service";
import { countryList } from "../../../../Shared/constants/commonConstants";
import FormikInput from "../../../../Shared/formik-fields/FormikInput";
import FormikSelect from "../../../../Shared/formik-fields/FormikSelect";
import { personalInfoSchema } from "../../../../Validations/employeeV";
import FormikDatePicker from "../../../../Shared/formik-fields/FormikDatePicker";
import moment from "moment";
import { Employee } from "../../../../Models/employee/employeeM";

const techQualifications = [
    { value: 'No formal degree', label: 'No formal degree' },
    { value: 'B.Sc', label: 'B.Sc' },
    { value: 'M.Sc', label: "M.Sc" },
    { value: 'B.Tech/B.E.', label: "B.Tech/B.E." },
    { value: 'M.Tech/M.E.', label: 'M.Tech/M.E.' },
    { value: 'BBA', label: "BBA" },
    { value: 'MBA', label: "MBA" },
    { value: 'BCA', label: "BCA" },
    { value: 'MCA', label: "MCA" },
    { value: 'Diploma', label: "Diploma" },
    { value: 'Phd', label: "Phd" },
    { value: 'BA', label: "BA" },
    { value: 'MA', label: "MA" },
    { value: 'Other', label: "Other" },
];

interface AllEmployeeDetails {
    employee: Employee;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const PersonalInfoBox1Form = ({ employee, setOpenDialog }: AllEmployeeDetails) => {
    const queryClient = useQueryClient();

    const uploadPersonalDetailsMutation = useMutation({
        mutationFn: (values: Employee) => personalDetailService.uploadPersonalDetails(values, employee?.id),
        onSuccess: (res) => {
            if (res?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['employeeDetail'] });
                setOpenDialog(false);
                toast.success(res?.data?.status?.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    const handleSubmit = React.useCallback(async (values: Employee) => {
        uploadPersonalDetailsMutation.mutate(values);
    }, [queryClient, setOpenDialog]);

    return (
        <section className='personal-detail-form'>
            <Formik
                initialValues={{
                    ...employee,
                    currentAddress: employee?.currentAddress ? employee?.currentAddress : '',
                    permanentAddress: employee?.permanentAddress ? employee?.permanentAddress : '',
                    dateOfBirth: employee?.dateOfBirth ? employee?.dateOfBirth : "",
                    qualification: employee?.qualification ? employee?.qualification : '',
                    nationality: employee?.nationality ? employee?.nationality : "",
                    passportNumber: employee?.passportNumber ? employee?.passportNumber : null,
                    fatherName: employee?.fatherName ? employee?.fatherName : '',
                    motherName: employee?.motherName ? employee?.motherName : '',
                }}
                validationSchema={personalInfoSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => {
                    return (
                        <>
                            <Form className="personal-detail-form-container">
                                <div className="personal-detail-form-content">
                                    <div className="parent-name content-box">
                                        <label htmlFor="fatherName" className='form-label'>Father's Name</label>
                                        <Field
                                            type="text"
                                            className="input-field"
                                            name="fatherName"
                                            id="fatherName"
                                            value={values.fatherName}
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("fatherName", e.target.value)}
                                        />
                                    </div>
                                    <div className="parent-name content-box">
                                        <label htmlFor="motherName" className='form-label'>Mother's Name</label>
                                        <Field
                                            type="text"
                                            className="input-field"
                                            name="motherName"
                                            id="motherName"
                                            value={values.motherName}
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("motherName", e.target.value)}
                                        />
                                    </div>
                                    <div className="current-address content-box" >
                                        <label htmlFor="currentAddress" className='form-label'>Current Address</label>
                                        <Field
                                            type="text"
                                            className="input-field"
                                            placeholder="You must enter your current address with pincode, city and state."
                                            name="currentAddress"
                                            id="currentAddress"
                                            multiline
                                            rows={4}
                                            maxLength={5000}
                                            value={values.currentAddress}
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("currentAddress", e.target.value)}
                                        />
                                    </div>
                                    <div className="permanent-address content-box">
                                        <label htmlFor="permanentAddress" className='form-label'>Permanent Address</label>
                                        <Field
                                            type="text"
                                            className="input-field"
                                            name="permanentAddress"
                                            placeholder="You must enter your permanent address with pincode, city and state."
                                            id="permanentAddress"
                                            multiline
                                            rows={4}
                                            maxLength={5000}
                                            value={values.permanentAddress}
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("permanentAddress", e.target.value)}
                                        />
                                    </div>
                                    <div className="birthday content-box">
                                        <label htmlFor="dateOfBirth" className='form-label'>Birthday</label>
                                        <Field
                                            type="date"
                                            name="dateOfBirth"
                                            id="dateOfBirth"
                                            placeholder="Enter Birthday"
                                            onChange={(e) => {
                                                setFieldValue('dateOfBirth', e.target.value)
                                            }}
                                            component={FormikDatePicker}
                                            maxDate={moment()}
                                            onKeyDown={(e) => e.preventDefault()}
                                        />
                                    </div>
                                    <div className="qualifications content-box">
                                        <label htmlFor="qualification" className='form-label'>Qualification</label>
                                        <Field
                                            type="text"
                                            className="input-field"
                                            name="qualification"
                                            id="qualification"
                                            value={values.qualification}
                                            component={FormikSelect}
                                            options={techQualifications?.map((qualifications) => ({
                                                title: qualifications?.label,
                                                value: qualifications?.value,
                                            }))}
                                            onChange={(e) => setFieldValue("qualification", e.target.value)}
                                        />
                                    </div>
                                    <div className="nationality content-box">
                                        <label htmlFor="nationality" className='form-label'>Nationality</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="nationality"
                                            id="Nationality"
                                            value={values.nationality}
                                            options={countryList}
                                            component={FormikSelect}
                                            onChange={(e) => setFieldValue("nationality", e.target.value)}
                                        />
                                    </div>
                                    <div className="passportNumber content-box">
                                        <label htmlFor="passportNumber" className='form-label'>Passport Number(Optional)</label>
                                        <Field
                                            type="text"
                                            className="input-field"
                                            name="passportNumber"
                                            id="passportNumber"
                                            value={values.passportNumber}
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("passportNumber", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="submit-btn">
                                    <Button type="submit" className="btn btn-primary">
                                        <span>
                                            Submit
                                        </span>
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )
                }}

            </Formik>
        </section >
    )
}

export default PersonalInfoBox1Form