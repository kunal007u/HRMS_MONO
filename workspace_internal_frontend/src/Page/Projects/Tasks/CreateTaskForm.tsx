import { Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import taskService from '../../../Services/task-service'
import FormikFileUpload from '../../../Shared/formik-fields/FormikFileUpload'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'

interface CreateTaskFormProps {
    setCreateTaskOpenDialog?: any;
    taskRowRef?: ITask | null;
    setOpenDialog?: any;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ setCreateTaskOpenDialog, taskRowRef, setOpenDialog }) => {

    const queryClient = useQueryClient();

    const createTaskMutation = useMutation({
        mutationFn: taskService.createTask,
        onSuccess: (data) => {
            toast.success(data?.data?.status?.message);
            queryClient.invalidateQueries({ queryKey: ['getAllTask'] });
            setCreateTaskOpenDialog(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },

    })

    const updateTaskMutation = useMutation({
        mutationFn: (values: any) => taskService.updateTaskStatus(taskRowRef?.id, values),
        onSuccess: (data) => {
            toast.success(data?.data?.status?.message);
            queryClient.invalidateQueries({ queryKey: ['getAllTask'] });
            setOpenDialog(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });


    const handleSubmit = async (values: any) => {
        const formData = new FormData();

        for (const key in values) {
            if (key !== 'taskFile') {
                formData.append(key, values[key]);
            }
        }
        if (values?.taskFile?.length) {
            for (let i = 0; i < values?.taskFile?.length; i++) {
                formData.append('taskFile', values?.taskFile[i]);
            }
        }

        if (taskRowRef) {
            updateTaskMutation.mutate(formData);
        } else {
            createTaskMutation.mutate(formData);
        }
    };



    // const { data: AllEmployees } = useQuery(
    //     {
    //         queryKey: ["getAllEmployee"],
    //         queryFn: async () => {
    //             const response = await personalDetailService.getAllEmployees();
    //             return response?.data?.data as any[];
    //         }
    //     })

    // const formattedEmployees = AllEmployees?.map(employee => ({
    //     value: employee.id,
    //     title: `${employee.firstName} ${employee.lastName}`
    // }));

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <Formik
            initialValues={{
                taskName: taskRowRef?.taskName || "",
                deadLine: taskRowRef?.deadLine ? formatDate(taskRowRef.deadLine) : "",
                taskAssignedTo: taskRowRef?.taskAssignedTo || "",
                taskPriority: taskRowRef?.taskPriority || "",
                taskDescription: taskRowRef?.taskDescription || "",
                taskFile: taskRowRef?.taskFiles || "",
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ handleSubmit, values, setFieldValue }) => {
                return (
                    <Form onSubmit={handleSubmit} className='modal-form' >
                        <div className="form">

                            <div className="add-form-group">
                                <label htmlFor="taskName" className='form-label'>Task Name</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="taskName"
                                    name="taskName"
                                    value={values?.taskName}
                                    component={FormikInput}
                                    onChange={(e: any) => {
                                        setFieldValue("taskName", e.target.value);
                                    }}
                                />
                            </div>
                            <div className="add-form-group">
                                <label htmlFor="deadLine" className='form-label'>Dead Line</label>
                                <Field
                                    type="datetime-local"
                                    className="form-control"
                                    id="deadLine"
                                    name="deadLine"
                                    value={values?.deadLine}
                                    component={FormikInput}
                                    onChange={(e: any) => {
                                        setFieldValue("deadLine", e.target.value);
                                    }}
                                />
                            </div>
                            {/* <div className="add-form-group">
                                <label htmlFor="taskAssignedTo" className='form-label'>Task Assigned To</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="taskAssignedTo"
                                    name="taskAssignedTo"
                                    value={values?.taskAssignedTo}
                                    options={formattedEmployees}
                                    component={FormikSelect}
                                    onChange={(e: any) => {
                                        setFieldValue("taskAssignedTo", e.target.value);
                                    }}
                                />
                            </div> */}
                            <div className="add-form-group">
                                <label htmlFor="taskPriority" className='form-label'>Task Priority</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="taskPriority"
                                    name="taskPriority"
                                    value={values?.taskPriority}
                                    options={[
                                        { value: "High", title: "High" },
                                        { value: "Medium", title: "Medium" },
                                        { value: "Low", title: "Low" },
                                    ]}
                                    component={FormikSelect}
                                    onChange={(e: any) => {
                                        setFieldValue("taskPriority", e.target.value);
                                    }}
                                />
                            </div>
                            <div className="add-form-group" style={{ width: "99%" }}>
                                <label htmlFor="taskDescription" className='form-label'>Task Description</label>
                                <Field
                                    className="form-control"
                                    id="taskDescription"
                                    rows={4}
                                    name="taskDescription"
                                    value={values?.taskDescription}
                                    multiline
                                    maxLength={1000}
                                    component={FormikInput}
                                    onChange={(e: any) => {
                                        setFieldValue("taskDescription", e.target.value);
                                    }}
                                />
                            </div>
                            <div className="add-form-group" style={{ width: "99%" }}>
                                <label htmlFor="taskFile" className='form-label'>Task File</label>
                                <Field
                                    type="file"
                                    className="form-control"
                                    id="taskFile"
                                    name="taskFile"
                                    multiple
                                    component={FormikFileUpload}
                                    onChange={(e: any) => {
                                        setFieldValue("taskFile", e.currentTarget.files);
                                    }}
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
                )
            }}


        </Formik>
    )
}

export default CreateTaskForm