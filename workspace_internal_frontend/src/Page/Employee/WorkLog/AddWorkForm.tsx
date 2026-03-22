import { Button, FormHelperText } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, FieldArray, Form, Formik } from 'formik'
import moment from 'moment'
import { MdDelete } from "react-icons/md"
import { toast } from 'react-toastify'
import projectService from '../../../Services/project-service'
import worklogService from '../../../Services/worklog-service'
import CustomReactQuill from '../../../Shared/formik-fields/CustomReactQuill'
import FormikDatePicker from '../../../Shared/formik-fields/FormikDatePicker'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'
import FormikTimePicker from '../../../Shared/formik-fields/FormikTimePicker'
import { addWorkFormValidationSchema } from '../../../Validations/workLogV'
import { DateTimeToDate_String } from '../../../utils/dateFormat'
import "./worklog.css"

const AddWorkForm = ({ setOpenDialog, row, setRow }) => {
    const queryClient = useQueryClient();

    const initialState = {
        date: moment(),
        workDetails: [
            {
                workHour: "",
                workDescription: "",
                workTitle: ""
            }
        ]
    }

    const getData = () => row || initialState

    const addUpdateWorkLogMutation = useMutation({
        mutationFn: (values) => row?.date ? worklogService.updateWorklog(values) : worklogService.createWorklog(values),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllWorkLog'] });
                setOpenDialog(false);
                setRow(null);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });
    const deleteWorkLogMutation = useMutation({
        mutationFn: (values: string | number) => worklogService.deleteWorklog(values),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllWorkLog'] });
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const { data: project } = useQuery({
        queryKey: ['getAllProject'],
        queryFn: async () => {
            const res = await projectService.getAllProjects();
            return res.data.data;
        }
    });

    const projectOptions = project?.map((item) => ({ value: item.id, title: item.projectName }));

    const handleSubmit = (response) => {
        const convertedResponse = response.workDetails.map(item => {
            // const workHour = moment(item.workHour, 'HH:mm').format('hh:mm');

            return ({
                id: item.id,
                date: DateTimeToDate_String(response.date),
                workHour: item.workHour,
                description: item.workDescription,
                projectId: item?.workTitle,
            })
        });

        addUpdateWorkLogMutation.mutate(convertedResponse);
    }

    return (
        <div>
            <Formik
                initialValues={getData()}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={addWorkFormValidationSchema}
                validateOnBlur={true}
                validateOnChange={false}
            >
                {({ handleSubmit, values, setFieldValue, errors, touched }) => {
                    return (
                        <Form onSubmit={handleSubmit} className='modal-form' >
                            <div className="form">
                                <div className="add-form-group" style={{ width: "50%" }}>
                                    <label htmlFor="date" className='form-label'>Date</label>
                                    <Field
                                        type="date"
                                        className="form-control"
                                        id="date"
                                        name="date"
                                        value={values?.date}
                                        component={FormikDatePicker}
                                        onChange={(e) => {
                                            setFieldValue("date", e.target.value);
                                        }}
                                        maxDate={moment()}
                                    />
                                </div>
                                <div style={{ width: "100%" }} >
                                    <hr />
                                </div>
                                <FieldArray
                                    name="workDetails"
                                    render={(arrayHelpers) => (
                                        <>
                                            {values?.workDetails?.map((data, index) => {
                                                return <>
                                                    <div className="add-form-group">
                                                        <label htmlFor={`workDetails.${index}..workHour`} className='form-label'>Work Hour</label>
                                                        <FormikTimePicker
                                                            className="form-control without_ampm"
                                                            label="Work Hour"
                                                            name={`workDetails.${index}.workHour`}
                                                        />
                                                        {errors?.workDetails && errors?.workDetails[index] && errors?.workDetails[index]?.workHour && touched?.workDetails[index]?.workHour && (
                                                            <FormHelperText className='formik-input-error' style={{ color: "red" }}>{errors?.workDetails[index]?.workHour}</FormHelperText>
                                                        )}
                                                    </div>
                                                    <div className="add-form-group">
                                                        <label htmlFor={`workDetails.${index}.workTitle`} className='form-label'>Projects</label>
                                                        <Field
                                                            placeholder="Select Projects"
                                                            className="form-control"
                                                            id={`workDetails.${index}.workTitle`}
                                                            name={`workDetails.${index}.workTitle`}
                                                            value={values?.workDetails[index]?.workTitle}
                                                            options={projectOptions}
                                                            hasObject={true}
                                                            component={FormikSelect}
                                                            onChange={(e) => {
                                                                setFieldValue(`workDetails.${index}.workTitle`, e?.target?.value);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="add-form-group" style={{ width: "99%" }}>
                                                        <label htmlFor={`workDetails.${index}.workDescription`} className='form-label'>Work Description</label>
                                                        <Field
                                                            name={`workDetails.${index}.workDescription`}
                                                            component={CustomReactQuill}
                                                            className="work-log-editor"
                                                            hasObject={true}
                                                            value={values?.workDetails[index]?.workDescription}
                                                            onChange={(value) => setFieldValue(`workDetails.${index}.workDescription`, value)}
                                                        />
                                                    </div>
                                                    <div style={{ width: "100%", display: "flex", alignItems: "center" }} >
                                                        <hr style={{ width: "100%" }} />
                                                        {index > 0 && index === values?.workDetails?.length - 1 && (
                                                            <MdDelete
                                                                style={{ marginRight: "auto", fontSize: "20px", color: "red", cursor: "pointer" }}
                                                                onClick={() => {
                                                                    if (values?.workDetails[index]?.id) {
                                                                        deleteWorkLogMutation.mutate(values?.workDetails[index]?.id);
                                                                    }
                                                                    arrayHelpers?.remove(index)
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    {values?.workDetails?.length === (index + 1) && (
                                                        <Button
                                                            variant="contained"
                                                            style={{ marginTop: "10px" }}
                                                            disabled={values?.workDetails?.length > 0 && (values?.workDetails[values?.workDetails?.length - 1]?.workHour === "" || values?.workDetails[values?.workDetails?.length - 1]?.workTitle === "" || values?.workDetails[values?.workDetails?.length - 1]?.workDescription === "")}
                                                            onClick={() => arrayHelpers?.push({ workHour: '', workTitle: '', workDescription: '' })}
                                                        >
                                                            Add More
                                                        </Button>
                                                    )}
                                                </>
                                            })}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="submit-btn">
                                <Button type="submit" variant='contained' className="btn btn-primary">
                                    <span>Submit</span>
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>

        </div>
    )
}

export default AddWorkForm