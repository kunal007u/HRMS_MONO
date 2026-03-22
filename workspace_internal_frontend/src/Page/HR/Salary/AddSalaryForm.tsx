/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { EmployeeSalaryModel } from '../../../Models/employee/employeeM';
import personalDetailService from '../../../Services/personal-detail-service';
import salaryServices from '../../../Services/salary-services';
import FormikDatePicker from '../../../Shared/formik-fields/FormikDatePicker';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import FormikSelect from '../../../Shared/formik-fields/FormikSelect';
import * as yup from 'yup';

interface Iprops {
    employeeSalary?: EmployeeSalaryModel,
    setOpenDialog: (value: boolean) => void,
}

const AddSalaryForm = ({ employeeSalary, setOpenDialog }: Iprops) => {
    const queryClient = useQueryClient();
    
    const { data: AllEmployees } = useQuery({
        queryKey: ["getAllEmployeeDD"],
        queryFn: async () => {
            const response = await personalDetailService?.getAllEmployeeDD();
            return response?.data?.data;
        },
    });

    const addSalaryMutation = useMutation({
        mutationFn: salaryServices.addUpdateSalary,
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllEmployeesSalary'] });
                setOpenDialog(false);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const AddSalary = (values) => {
        addSalaryMutation.mutate(values);
    }

    return (
        <section className="add-salary-form" >
            <Formik
                initialValues={{
                    id: employeeSalary?.id || null,
                    employeeId: employeeSalary?.employeeId || '',
                    basic: employeeSalary?.basic || null,
                    milestone: employeeSalary?.milestone || null,
                    pf: employeeSalary?.pf || null,
                    pt: employeeSalary?.pt || null,
                    fromDate: (employeeSalary?.fromDate || ''),
                }}
                onSubmit={(values) => AddSalary(values)}
                validationSchema={yup.object().shape({
                    employeeId: yup.string().required('Select employee'),
                    basic: yup.string().required('Basic salary is required'),
                    pt: yup.string().required('PT is required'),
                    fromDate: yup.string().required('From Date is required'),

                })}
            >
                {({ handleSubmit, values, setFieldValue, isSubmitting }) => {
                    return (
                        <>
                            <Form className="all-employee-salary-form-container modal-form" onSubmit={handleSubmit}>
                                <div className="mb-2 form">
                                    <div className="all-employee-salary-form-content">
                                        <div className="first-name content-box">
                                            <label htmlFor="employee" className='form-label'>Employee</label>
                                            <Field
                                                type="text"
                                                name="employeeId"
                                                id="employeeId"
                                                options={AllEmployees?.map((employee) => ({
                                                    title: employee?.fullName,
                                                    value: employee?.id,
                                                    }))}
                                                value={values.employeeId}
                                                className="form-control"
                                                component={FormikSelect}
                                                onChange={(e) => setFieldValue("employeeId", e.target.value)}
                                            />
                                        </div>
                                        <div className="basic content-box">
                                            <label htmlFor="basic" className='form-label'>Basic</label>
                                            <Field
                                                type="number"
                                                name="basic"
                                                id="basic"
                                                value={values.basic}
                                                className="form-control"
                                                component={FormikInput}
                                                onChange={(e) => setFieldValue("basic", +e.target.value)}
                                            />
                                        </div>
                                        <div className="travel-allowance content-box">
                                            <label htmlFor="milestone" className='form-label'>Milestone</label>
                                            <Field
                                                type="number"
                                                name="milestone"
                                                id="milestone"
                                                value={values.milestone}
                                                className="form-control"
                                                component={FormikInput}
                                                onChange={(e) => setFieldValue("milestone", +e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="medical-allowance content-box">
                                            <label htmlFor="bonus" className='form-label'>Bonus</label>
                                            <Field
                                                type="number"
                                                name="bonus"
                                                id="bonus"
                                                value={values.bonus}
                                                className="form-control"
                                                component={FormikInput}
                                                onChange={(e) => setFieldValue("bonus", +e.target.value)}
                                            />
                                        </div> */}
                                        {/* <div className="house-rent-allowance content-box">
                                            <label htmlFor="PF" className='form-label'>PF</label>
                                            <Field
                                                type="number"
                                                name="PF"
                                                id="PF"
                                                value={values.PF}
                                                className="form-control"
                                                component={FormikInput}
                                                onChange={(e) => setFieldValue("PF", e.target.value)}
                                            />
                                        </div> */}
                                        <div className="provident-fund content-box">
                                            <label htmlFor="pf" className='form-label'>Provident Fund (PF)</label>
                                            <Field
                                                type="text"
                                                name="pf"
                                                id="pf"
                                                value={values.pf}
                                                className="form-control"
                                                component={FormikInput}
                                                onChange={(e) => setFieldValue("pf", +e.target.value)}
                                            />
                                        </div>
                                        <div className="professional-tax content-box">
                                            <label htmlFor="pt" className='form-label'>Professional Tax (PT)</label>
                                            <Field
                                                type="text"
                                                name="pt"
                                                id="pt"
                                                value={values.pt}
                                                className="form-control"
                                                component={FormikInput}
                                                onChange={(e) => setFieldValue("pt", +e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="cost-to-company content-box">
                                            <label htmlFor="costTocompany" className='form-label'>Cost To Company</label>
                                            <Field
                                                type="text"
                                                name="costTocompany"
                                                id="costTocompany"
                                                value={values.costTocompany}
                                                className="form-control"
                                                component={FormikInput}
                                                onChange={(e: any) => setFieldValue("costTocompany", e.target.value)}
                                            />
                                        </div> */}
                                        <div className="account-number content-box">
                                            <label htmlFor="fromDate" className='form-label'>From Date</label>
                                            <Field
                                                type="date"
                                                className="form-control"
                                                id="fromDate"
                                                name="fromDate"
                                                value={values?.fromDate}
                                                component={FormikDatePicker}
                                                onChange={(e) => setFieldValue("fromDate", e.target.value)}

                                            />
                                        </div>
                                    </div>
                                    <div className="submit-btn">
                                        <Button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            <span>
                                                Submit
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </>
                    )
                }}
            </Formik >
        </section>
    )
}

export default AddSalaryForm