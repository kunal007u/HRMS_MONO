import { Button } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import FormikSelect from '../../../../Shared/formik-fields/FormikSelect'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'

const ReimbursementForm = () => {
    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={{
                claimType: "",
                amount: "",
                date: "",
                description: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ handleSubmit, values, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className='modal-form white-box'>
                    <div className="form">
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="claimType" className='form-label'>Claim Type</label>
                            <Field
                                as="select"
                                className="form-control"
                                id="claimType"
                                name="claimType"
                                value={values.claimType}
                                component={FormikSelect}
                                options={[
                                    {
                                        title: "Medical",
                                        value: "Medical"
                                    },
                                    {
                                        title: "Travel",
                                        value: "Travel"
                                    },
                                    {
                                        title: "Food",
                                        value: "Food"
                                    },
                                    {
                                        title: "Others",
                                        value: "Others"
                                    }]}
                                onChange={(e) => {
                                    setFieldValue("claimType", e.target.value);
                                }}
                            />

                        </div>
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="amount" className='form-label'>Amount</label>
                            <Field
                                type="number"
                                className="form-control"
                                id="amount"
                                name="amount"
                                value={values.amount}
                                component={FormikInput}
                                onChange={(e) => {
                                    setFieldValue("amount", e.target.value);
                                }}
                            />
                        </div>
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="date" className='form-label'>Date</label>
                            <Field
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={values.date}
                                component={FormikInput}
                                onChange={(e) => {
                                    setFieldValue("date", e.target.value);
                                }}
                            />
                        </div>
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="description" className='form-label'>Description</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                multiline
                                rows={3}
                                value={values.description}
                                component={FormikInput}
                                onChange={(e) => {
                                    setFieldValue("description", e.target.value);
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
            )}
        </Formik>
    )
}

export default ReimbursementForm