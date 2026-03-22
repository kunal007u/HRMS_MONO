import { Button } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import { toast } from 'react-toastify'
import { IReportingPersonModel } from '../../../Models/employee/employeeM'
import { IAllProject } from '../../../Models/projects'
import personalDetailService from '../../../Services/personal-detail-service'
import projectService from '../../../Services/project-service'
import FormikDatePicker from '../../../Shared/formik-fields/FormikDatePicker'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'
import { addProjectSchema } from '../../../Validations/projectV'
import {  } from '../../../utils/dateFormat'

interface Props {
    rows?: IAllProject,
    setOpenDialog: (value: boolean) => void,
    setRows: (value: any) => void
}
const AddProjectForm = ({ rows, setOpenDialog,setRows }: Props) => {
    const queryClient = useQueryClient();

    const AddOrUpdateProjectMutation = useMutation({
        mutationFn: (value) => projectService.createOrUpdateProject(value),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllProjects'] });
                setOpenDialog(false);
                setRows(null)
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });


    const addProject = (values: any) => {
        AddOrUpdateProjectMutation.mutate(values)
    }

    const { data: reportingPerson } = useQuery<IReportingPersonModel[]>({
        queryKey: ['getAllReportingPerson'],
        queryFn: async () => {
            const res = await personalDetailService.getAllEmployeeDD();
            return res.data.data as IReportingPersonModel[];
        }
    });


    return (
        <section className="add-project-form">
            <Formik
                initialValues={{
                    projectId: rows?.id || "",
                    projectName: rows?.projectName || '',
                    // client: '',
                    startDate: (rows?.startDate || ''),
                    endDate: (rows?.endDate || ''),
                    // rate: '',
                    // rateType: '',
                    // priority: '',
                    projectManager: rows?.managerId || '',
                    // projectMember: [],
                    description: rows?.description || '',
                    // files: '',
                }}
                onSubmit={(values) => addProject(values)}
                validationSchema={addProjectSchema}
            >
                {({  values, setFieldValue, errors, touched }) => {
                    return (

                        <Form className="all-project-form-container">
                            <div className="mb-2">
                                <div className="all-project-form-content">
                                    <div className="project-name content-box">
                                        <label htmlFor="project-name" className='form-label'>Project Name</label>
                                        <Field
                                            type="text"
                                            name="projectName"
                                            className='form-control'
                                            component={FormikInput}
                                            value={values.projectName}
                                            onChange={(e: any) => setFieldValue('projectName', e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="client content-box">
                                        <label htmlFor="client" className='form-label'>Client</label>
                                        <Field
                                            type="text"
                                            name="client"
                                            className='form-control'
                                            options={[
                                                { value: 'client1', title: 'Client 1' },
                                                { value: 'client2', title: 'Client 2' },
                                                { value: 'client3', title: 'Client 3' },
                                                { value: 'client4', title: 'Client 4' },
                                                { value: 'client5', title: 'Client 5' },
                                            ]}
                                            component={FormikSelect}
                                            value={values.client}
                                            onChange={(e: any) => setFieldValue('client', e.target.value)}
                                        />
                                    </div> */}

                                    <div className="project-leader content-box">
                                        <label htmlFor="projectManager" className='form-label'>Project Manager</label>
                                        <Field
                                            type="text"
                                            name="projectManager"
                                            className='form-control'
                                            component={FormikSelect}
                                            options={reportingPerson?.map((person: IReportingPersonModel) => ({
                                                title: person?.fullName,
                                                value: person?.id,
                                            }))}
                                            value={values.projectManager}
                                            onChange={(e: any) => setFieldValue('projectManager', e.target.value)}
                                        />
                                    </div>

                                    <div className="start-date content-box">
                                        <label htmlFor="startDate" className='form-label'>Start Date</label>
                                        <Field
                                            type="date"
                                            name="startDate"
                                            className='form-control'
                                            placeholder="Start Date"
                                            component={FormikDatePicker}
                                            value={values.startDate}
                                            onChange={(e: any) => setFieldValue('startDate', e.target.value)}
                                        // minDate={moment()}
                                        />

                                    </div>
                                    <div className="end-date content-box">
                                        <label htmlFor="endDate" className='form-label'>End Date</label>
                                        <Field
                                            type="date"
                                            name="endDate"
                                            className='form-control'
                                            placeholder="End Date"
                                            component={FormikDatePicker}
                                            value={values.endDate}
                                            // maxDate={values.startDate}
                                            onChange={(e: any) => setFieldValue('endDate', e.target.value)}
                                            minDate={values.startDate && moment(values.startDate).isValid() ? moment(values.startDate) : undefined}
                                        />
                                    </div>
                                    {/* <div className="rate content-box">
                                        <label htmlFor="firstName" className='form-label'>Rate</label>
                                        <Field
                                            type="number"
                                            name="rate"
                                            className='form-control'
                                            placeholder="Rate"
                                            component={FormikInput}
                                            value={values.rate}
                                            onChange={(e: any) => setFieldValue('rate', e.target.value)}
                                        />
                                    </div> */}

                                    {/* <div className="rate-type content-box">
                                        <label htmlFor="firstName" className='form-label'>Rate Type</label>
                                        <Field
                                            type="text"
                                            name="rateType"
                                            className='form-control'
                                            options={[
                                                { value: 1, title: 'Hourly' },
                                                { value: 2, title: 'Fixed' },
                                            ]}
                                            component={FormikSelect}
                                            value={values.rateType}
                                            onChange={(e: any) => setFieldValue('rateType', e.target.value)}
                                        />
                                    </div> */}
                                    {/* <div className="priority content-box">
                                        <label htmlFor="firstName" className='form-label'>Priority</label>
                                        <Field
                                            type="text"
                                            name="priority"
                                            className='form-control'
                                            options={[
                                                { value: 1, title: 'High' },
                                                { value: 2, title: 'Medium' },
                                                { value: 3, title: 'Low' },
                                            ]}
                                            component={FormikSelect}
                                            value={values.priority}
                                            onChange={(e: any) => setFieldValue('priority', e.target.value)}
                                        />
                                    </div> */}

                                    {/* <div className="project-member content-box">
                                        <label htmlFor="firstName" className='form-label'>Project Member</label>
                                        <Field
                                            type="text"
                                            name="projectMember"
                                            className='form-control'    
                                            options={[
                                                { value: 'member1', title: 'Member 1' },    
                                                { value: 'member2', title: 'Member 2' },
                                                { value: 'member3', title: 'Member 3' },
                                                { value: 'member4', title: 'Member 4' },
                                                { value: 'member5', title: 'Member 5' },
                                            ]}
                                            component={FormikMultiSelect}
                                            value={values.projectMember}
                                            onChange={(e: any) => setFieldValue('projectMember', e.target.value)}
                                        />
                                    </div> */}


                                    <div className="description content-box">
                                        <label htmlFor="firstName" className='form-label'>Description</label>
                                        <Field
                                            type="text"
                                            name="description"
                                            className='form-control'
                                            multiline
                                            rows={4}
                                            maxLength={5000}
                                            component={FormikInput}
                                            value={values.description}
                                            onChange={(e: any) => setFieldValue('description', e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="files content-box">
                                        <label htmlFor="firstName" className='form-label'>Files</label>
                                        <Field
                                            type="file"
                                            name="files"
                                            className='form-control'
                                            component={FormikFileUpload}
                                            onChange={(event) => {
                                                const file = event.target.files[0];
                                                setFieldValue('files', file);

                                                const reader = new FileReader();
                                                reader.onload = (e) => {
                                                    const img = document.getElementById('preview') as HTMLImageElement;
                                                    img.src = e.target?.result as string;
                                                };
                                                reader.readAsDataURL(file);
                                            }}
                                        />
                                        <img id="preview" alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    </div> */}
                                </div>
                                <div className="submit-btn mt-1">
                                    <Button type="submit" className="btn btn-primary" >
                                        <span>Submit</span>
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </section>
    )
}

export default AddProjectForm