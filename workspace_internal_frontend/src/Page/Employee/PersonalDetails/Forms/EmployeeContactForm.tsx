import { useQueryClient } from "@tanstack/react-query"
import personalDetailService from "../../../../Services/personal-detail-service"
import { toast } from "react-toastify"
import { Field, Form, Formik } from "formik"
import FormikInput from "../../../../Shared/formik-fields/FormikInput"
import { Button } from "@mui/material"
import { useParams } from "react-router-dom"
import { employeeContactSchema } from "../../../../Validations/employeeV"
import { EmergencyContact } from "../../../../Models/employee/employeeM"

const EmployeeContactForm = ({ emergencyContacts, setOpenDialog }) => {
    const queryClient = useQueryClient()
    const { id } = useParams()

    const handleSubmit = async (values: EmergencyContact) => {
        await personalDetailService
            .uploadEmergencyDetails(values, id ?? "")
            .then((respnse) => {
                if (respnse?.data?.status?.code) {
                    queryClient.invalidateQueries({ queryKey: ['employeeDetail'] })
                    if (setOpenDialog) {
                        setOpenDialog(false)
                    }
                    toast.success(respnse?.data?.status?.message)
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <section className="emergency-contact-form">
            <Formik
                initialValues={{
                    primaryName: emergencyContacts?.primaryName ? emergencyContacts?.primaryName : "",
                    primaryRelationship: emergencyContacts?.primaryRelationship ? emergencyContacts?.primaryRelationship : "",
                    primaryPhoneNo: emergencyContacts?.primaryPhoneNo ? emergencyContacts?.primaryPhoneNo : "",
                    primaryAddress: emergencyContacts?.primaryAddress ? emergencyContacts?.primaryAddress : "",

                    secondaryName: emergencyContacts?.secondaryName ? emergencyContacts?.secondaryName : "",
                    secondRelationship: emergencyContacts?.secondRelationship ? emergencyContacts?.secondRelationship : "",
                    secondaryPhoneNo: emergencyContacts?.secondaryPhoneNo ? emergencyContacts?.secondaryPhoneNo : "",
                    secondaryAddress: emergencyContacts?.secondaryAddress ? emergencyContacts?.secondaryAddress : "",
                    employeeId: "" // Add the missing employeeId property
                }}
                onSubmit={handleSubmit}
                validationSchema={employeeContactSchema}
            >
                {({ values, setFieldValue }) => {
                    return (
                        <Form className="personal-detail-form-container ">
                            <div className="mb-2">
                                <div className="primary-contact mb-1">
                                    <h3>Primary Contact :</h3>
                                </div>
                                <div className="personal-detail-form-content  ">
                                    <div className="primary-name content-box">
                                        <label htmlFor="primaryName" className='form-label'>Primary Name</label>
                                        <Field
                                            type="text"
                                            name="primaryName"
                                            id="primaryName"
                                            value={values.primaryName}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("primaryName", e.target.value)}
                                        />
                                    </div>
                                    <div className="primary-relationship content-box">
                                        <label htmlFor="primaryRelationship" className='form-label'>Relationship</label>
                                        <Field
                                            type="text"
                                            name="primaryRelationship"
                                            id="primaryRelationship"
                                            value={values.primaryRelationship}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("primaryRelationship", e.target.value)}
                                        />
                                    </div>
                                    <div className="primary-phone content-box">
                                        <label htmlFor="primaryPhoneNo" className='form-label'>Phone</label>
                                        <Field
                                            type="number"
                                            name="primaryPhoneNo"
                                            id="primaryPhoneNo"
                                            value={values.primaryPhoneNo}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("primaryPhoneNo", e.target.value)}
                                        />
                                    </div>
                                    <div className="primary-address content-box">
                                        <label htmlFor="primaryAddress" className='form-label'>Address</label>
                                        <Field
                                            type="text"
                                            name="primaryAddress"
                                            id="primaryAddress"
                                            value={values.primaryAddress}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("primaryAddress", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="secondary-contact mb-1">
                                    <h3>Secondary Contact :</h3>
                                </div>
                                <div className="personal-detail-form-content mb-2">
                                    <div className="secondary-name content-box">
                                        <label htmlFor="secondaryName" className='form-label'>Secondary Name</label>
                                        <Field
                                            type="text"
                                            name="secondaryName"
                                            id="secondaryName"
                                            value={values.secondaryName}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("secondaryName", e.target.value)}
                                        />
                                    </div>
                                    <div className="secondary-relationship content-box">
                                        <label htmlFor="secondRelationship" className='form-label'>Relationship</label>
                                        <Field
                                            type="text"
                                            name="secondRelationship"
                                            id="secondRelationship"
                                            value={values.secondRelationship}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("secondRelationship", e.target.value)}
                                        />
                                    </div>
                                    <div className="secondary-phone content-box">
                                        <label htmlFor="secondaryPhoneNo" className='form-label'>Phone</label>
                                        <Field
                                            type="number"
                                            name="secondaryPhoneNo"
                                            id="secondaryPhoneNo"
                                            value={values.secondaryPhoneNo}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("secondaryPhoneNo", e.target.value)}
                                        />
                                    </div>
                                    <div className="secondary-address content-box">
                                        <label htmlFor="secondaryAddress" className='form-label'>Address</label>
                                        <Field
                                            type="text"
                                            name="secondaryAddress"
                                            id="secondaryAddress"
                                            value={values.secondaryAddress}
                                            className="form-control"
                                            component={FormikInput}
                                            onChange={(e) => setFieldValue("secondaryAddress", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="submit-btn">
                                <Button type="submit" className="btn btn-primary" >
                                    <span>
                                        Submit
                                    </span>
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </section>
    )
}

export default EmployeeContactForm