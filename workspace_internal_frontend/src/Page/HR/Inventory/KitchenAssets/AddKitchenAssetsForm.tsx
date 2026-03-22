import { Field, Formik } from 'formik'
import React from 'react'
import { Form } from 'react-router-dom'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../../Shared/formik-fields/FormikSelect'
import { Button } from '@mui/material'

const AddKitchenAssetsForm = () => {
    return (
        <Formik
            initialValues={{
                assetName: '',
                cost: '',
                assetDescription: '',
                assetBrand: '',
                warrantyStartDate: '',
                warrantyEndDate: '',
                quantity: '',
                dateOfPurchase: ''
            }}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {({ handleSubmit, values, setFieldValue, handleReset }) => {
                return (

                    <Form style={{ padding: "20px" }}>
                        <div className="form " >
                            <div className="add-form-group" >
                                <label htmlFor="assetName" className='form-label'>Name</label>
                                <Field
                                    type="text"
                                    name="assetName"
                                    className="form-control"
                                    component={FormikInput}
                                    value={values?.assetName}
                                    onChange={(e: any) => {
                                        setFieldValue("assetName", e.target.value)
                                    }}

                                />
                            </div>
                            <div className="add-form-group" >
                                <label htmlFor="cost" className='form-label'>Cost</label>
                                <Field
                                    type="text"
                                    name="cost"
                                    className="form-control"
                                    component={FormikInput}
                                    value={values?.cost}
                                    onChange={(e: any) => {
                                        setFieldValue("cost", e.target.value)
                                    }}

                                />
                            </div>
                            <div className="add-form-group" >
                                <label htmlFor="assetBrand" className='form-label'>Brand</label>
                                <Field
                                    type="text"
                                    name="assetBrand"
                                    className="form-control"
                                    component={FormikInput}
                                    value={values?.assetBrand}
                                    onChange={(e: any) => {
                                        setFieldValue("assetBrand", e.target.value)
                                    }}

                                />

                            </div>
                            <div className="add-form-group" >
                                <label htmlFor="quantity" className='form-label'>Quantity</label>
                                <Field
                                    type="text"
                                    name="quantity"
                                    className="form-control"
                                    component={FormikInput}
                                    value={values?.quantity}
                                    onChange={(e: any) => {
                                        setFieldValue("quantity", e.target.value)
                                    }}

                                />
                            </div>

                            <div className="add-form-group" >
                                <label htmlFor="dateOfPurchase" className='form-label'>Date of Purchase</label>
                                <Field
                                    type="date"
                                    name="dateOfPurchase"
                                    className="form-control"
                                    component={FormikInput}
                                    value={values?.dateOfPurchase}
                                    onChange={(e: any) => {
                                        setFieldValue("dateOfPurchase", e.target.value)
                                    }}

                                />
                            </div>
                            <div className="add-form-group" style={{ width: "99%" }}>
                                <label htmlFor="assetDescription" className='form-label'>Description</label>
                                <Field
                                    type="text"
                                    name="assetDescription"
                                    className="form-control"
                                    component={FormikInput}
                                    multiline
                                    rows={4}
                                    value={values?.assetDescription}
                                    onChange={(e: any) => {
                                        setFieldValue("assetDescription", e.target.value)
                                    }}

                                />
                            </div>


                            <div style={{ width: "100%" }}>
                                <h3>Warranty</h3>
                            </div>

                            <div className="add-form-group" >
                                <label htmlFor="warrantyStartDate" className='form-label'>Start Date</label>
                                <Field
                                    type="date"
                                    name="warrantyStartDate"
                                    className="form-control"
                                    component={FormikInput}
                                    value={values?.warrantyStartDate}
                                    onChange={(e: any) => {
                                        setFieldValue("warrantyStartDate", e.target.value)
                                    }}

                                />
                            </div>
                            <div className="add-form-group" >
                                <label htmlFor="warrantyEndDate" className='form-label'>End Date</label>
                                <Field
                                    type="date"
                                    name="warrantyEndDate"
                                    className="form-control"
                                    component={FormikInput}
                                    value={values?.warrantyEndDate}
                                    onChange={(e: any) => {
                                        setFieldValue("warrantyEndDate", e.target.value)
                                    }}

                                />
                            </div>
                        </div>
                        <div className="submit-btn">
                            <Button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>
                                <span>
                                    Submit
                                </span>
                            </Button>
                        </div>
                    </Form>
                )

            }}

        </Formik>
    )
}

export default AddKitchenAssetsForm