import { Button } from '@mui/material'
import { Field, Formik } from 'formik'
import { Form } from 'react-router-dom'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../../Shared/formik-fields/FormikSelect'

const AddOfficeAssetsForm = () => {
    // const { data: reportingPerson } = useQuery({
    //     queryKey: ['getAllReportingPerson'],
    //     queryFn: async () => {
    //         const res = await personalDetailService.getAllEmployees();
    //         return res.data.data as any;
    //     }
    // });

    // let reportingPersonOptions = reportingPerson?.map((person) => ({
    //     value: person.id,
    //     title: person.fullName,
    // }));

    return (
        <Formik
            initialValues={{
                assetName: '',
                cost: '',
                assetDescription: '',
                assetBrand: '',
                warrantyStartDate: '',
                warrantyEndDate: '',
                categoty: '',
                quantity: '',
                dateOfPurchase: '',
                takingCareBy: ''
            }}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {({ handleSubmit, values, setFieldValue }) => {
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
                                    onChange={(e) => {
                                        setFieldValue("assetName", e.target.value)
                                    }}

                                />
                            </div>
                            <div className="add-form-group" >
                                <label htmlFor="categoty" className='form-label'>Category</label>
                                <Field
                                    type="text"
                                    name="categoty"
                                    className="form-control"
                                    component={FormikSelect}
                                    options={[
                                        { value: 1, title: "Computer" },
                                        { value: 2, title: "Mobile" },
                                        { value: 3, title: "Tablet" },
                                        { value: 4, title: "Printer" },
                                        { value: 5, title: "Scanner" },
                                        { value: 6, title: "Projector" },
                                        { value: 7, title: "Camera" },
                                        { value: 8, title: "Monitor" },
                                        { value: 9, title: "Keyboard" },
                                        { value: 10, title: "Mouse" },
                                        { value: 11, title: "Speaker" },
                                        { value: 12, title: "Headphone" },
                                        { value: 13, title: "Microphone" },
                                        { value: 5, title: "Other" },

                                    ]}
                                    value={values?.categoty}
                                    onChange={(e) => {
                                        setFieldValue("categoty", e.target.value)
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
                                        setFieldValue("assetBrand", e.target.value)
                                    }}
                                />
                            </div>

                            <div className="add-form-group" >
                                <label htmlFor="quantity" className='form-label'>Quantity</label>
                                <Field
                                    type="number"
                                    name="quantity"
                                    className="form-control"
                                    component={FormikInput}
                                    value={values?.quantity}
                                    onChange={(e) => {
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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
                                        setFieldValue("assetDescription", e.target.value)
                                    }}

                                />
                            </div>
                            {/* <div className="add-form-group" >
                                <label htmlFor="takingCareBy" className='form-label'>Taking Care By</label>
                                <Field
                                    type="text"
                                    name="takingCareBy"
                                    className="form-control"
                                    component={FormikSelect}
                                    value={values?.takingCareBy}
                                    options={reportingPersonOptions}
                                    onChange={(e) => {
                                        setFieldValue("takingCareBy", e.target.value)
                                    }}
                                />

                            </div> */}


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
                                    onChange={(e) => {
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
                                    onChange={(e) => {
                                        setFieldValue("warrantyEndDate", e.target.value)
                                    }}

                                />
                            </div>

                        </div>
                        <div className="submit-btn">
                            <Button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>
                                <span>Submit</span>
                            </Button>
                        </div>
                    </Form>
                )

            }}




        </Formik>
    )
}

export default AddOfficeAssetsForm