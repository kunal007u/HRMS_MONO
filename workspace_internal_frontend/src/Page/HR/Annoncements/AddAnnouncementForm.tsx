import { Button } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import FormikFileUpload from '../../../Shared/formik-fields/FormikFileUpload'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'

const AddAnnouncementForm = () => {
    const handleSubmit = (values: any) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={{
                title: '',
                message: '',
                department: '',
                startDate: '',
                endDate: '',
                priority: '',
                tags: [],
                attachments: '',

            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ handleSubmit, values, setFieldValue, handleReset }) => {
                return (
                    <Form onSubmit={handleSubmit} className='modal-form'  >
                        <div className="form">
                            <div className="add-form-group" style={{ width: "99%" }}>
                                <label htmlFor="title" className='form-label'>Title</label>
                                <Field
                                    component={FormikInput}
                                    name="title"
                                    type="text"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="add-form-group" style={{ width: "99%" }}>
                                <label htmlFor="message" className='form-label' >Message</label>
                                <Field
                                    component={FormikInput}
                                    name="message"
                                    multiline
                                    rows={4}
                                    type="text"
                                    placeholder="Enter message"
                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="department" className='form-label'>Department</label>
                                <Field
                                    component={FormikSelect}
                                    options={[
                                        { value: 'IT', label: 'IT' },
                                        { value: 'HR', label: 'HR' },
                                        { value: 'Finance', label: 'Finance' },
                                        { value: 'Marketing', label: 'Marketing' },
                                        { value: 'Sales', label: 'Sales' },
                                        { value: 'Production', label: 'Production' },
                                        { value: 'Logistics', label: 'Logistics' },
                                    ]}

                                    name="department"
                                    type="text"
                                    placeholder="Enter department"
                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="startDate" className='form-label'>Start Date</label>
                                <Field
                                    component={FormikInput}
                                    name="startDate"
                                    type="date"
                                    placeholder="Enter start date"
                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="endDate" className='form-label'>End Date</label>
                                <Field
                                    component={FormikInput}
                                    name="endDate"
                                    type="date"
                                    placeholder="Enter end date"
                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="priority" className='form-label'>Priority</label>
                                <Field
                                    component={FormikSelect}
                                    options={[
                                        { value: 'High', label: 'High' },
                                        { value: 'Medium', label: 'Medium' },
                                        { value: 'Low', label: 'Low' },
                                    ]}
                                    name="priority"
                                    type="text"
                                    placeholder="Enter priority"
                                />
                            </div>

                            <div className="add-form-group" style={{ width: "99%" }}>
                                <label htmlFor="attachments" className='form-label'>Attachments</label>
                                <Field
                                    component={FormikFileUpload}
                                    name="attachments"
                                    type="file"
                                    placeholder="Enter attachments"
                                    onChange={(event: any) => {
                                        setFieldValue("attachments", event.currentTarget.files[0]);
                                    }}
                                />
                            </div>
                            {/* <div className="add-form-group" style={{ width: "99%" }}>
                                <label htmlFor="tags" className='form-label'>Tags</label>
                                <ChipInput
                                    style={{ height: "45px" }}
                                    value={values.tags}
                                    onAdd={(chip) => setFieldValue('tags', [...values.tags, chip])}
                                    onDelete={(chip, index) => {
                                        setFieldValue('tags', values.tags.filter((_, i) => i !== index))
                                    }}
                                    placeholder="Enter tags"
                                />
                            </div> */}
                        </div>

                        <div className="submit-btn">
                            <Button type="submit" className="btn btn-primary">
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

export default AddAnnouncementForm