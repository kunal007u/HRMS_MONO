import { Button } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import FormikInput from '../../../Shared/formik-fields/FormikInput'

const AddGoalForm = () => {
    const handleSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={{
                quarter: "",
                goalName: "",
                goalDescription: "",
                weightage: "",
                evaluationCriteria: "",
                timeline: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ handleSubmit, values, setFieldValue }) => (
                <Form onSubmit={handleSubmit} className='modal-form'>
                    <div className="form">
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="goalName" className='form-label'>Goal Name</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="goalName"
                                name="goalName"
                                value={values.goalName}
                                component={FormikInput}
                                onChange={(e: any) => {
                                    setFieldValue("goalName", e.target.value);
                                }}
                            />
                        </div>
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="goalDescription" className='form-label'>Goal Description</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="goalDescription"
                                name="goalDescription"
                                multiline
                                rows={3}
                                value={values.goalDescription}
                                component={FormikInput}
                                onChange={(e: any) => {
                                    setFieldValue("goalDescription", e.target.value);
                                }}
                            />
                        </div>
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="weightage" className='form-label'>Weightage</label>
                            <Field
                                type="number"
                                className="form-control"
                                id="weightage"
                                name="weightage"
                                value={values.weightage}
                                component={FormikInput}
                                onChange={(e: any) => {
                                    setFieldValue("weightage", e.target.value);
                                }}
                            />
                        </div>
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="evaluationCriteria" className='form-label'>Evaluation Criteria</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="evaluationCriteria"
                                name="evaluationCriteria"
                                value={values.evaluationCriteria}
                                component={FormikInput}
                                onChange={(e: any) => {
                                    setFieldValue("evaluationCriteria", e.target.value);
                                }}
                            />
                        </div>
                        <div className="add-form-group" style={{ width: "100%" }}>
                            <label htmlFor="timeline" className='form-label'>Timeline</label>
                            <Field
                                type="date"
                                className="form-control"
                                id="timeline"
                                name="timeline"
                                value={values.timeline}
                                component={FormikInput}
                                onChange={(e: any) => {
                                    setFieldValue("timeline", e.target.value);
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

export default AddGoalForm