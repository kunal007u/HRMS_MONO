import { Field, Form, Formik } from 'formik'
import React from 'react'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import { Button } from '@mui/material'

const AddReviewForm = () => {
    const handleSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={{
                date: "",
                workTitle: "",
                workDescription: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ handleSubmit, values, setFieldValue, handleReset }) => {
                return (
                    <Form onSubmit={handleSubmit} className='modal-form' >
                        <div className="form">

                            <div className="add-form-group">
                                <label htmlFor="date" className='form-label'>Date</label>
                                <Field
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    value={values?.date}
                                    component={FormikInput}
                                    onChange={(e: any) => {
                                        setFieldValue("date", e.target.value);
                                    }}
                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="workTitle" className='form-label'>Work Title</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="workTitle"
                                    name="workTitle"
                                    value={values?.workTitle}
                                    component={FormikInput}
                                    onChange={(e: any) => {
                                        setFieldValue("workTitle", e.target.value);
                                    }}
                                />
                            </div>
                            <div className="add-form-group" style={{ width: "99%" }}>
                                <label htmlFor="workDescription" className='form-label'>Work Description</label>
                                <Field
                                    className="form-control"
                                    id="workDescription"
                                    rows={4}
                                    name="workDescription"
                                    value={values?.workDescription}
                                    multiline
                                    component={FormikInput}
                                    onChange={(e: any) => {
                                        setFieldValue("workDescription", e.target.value);
                                    }}
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


        </Formik>
    )
}

export default AddReviewForm