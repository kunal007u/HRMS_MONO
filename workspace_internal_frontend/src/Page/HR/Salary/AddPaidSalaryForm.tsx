import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import salaryServices from '../../../Services/salary-services';
import FormikInput from '../../../Shared/formik-fields/FormikInput';

const AddPaidSalaryForm = ({ row, setOpenSalaryPaidDialog }) => {
    const queryClient = useQueryClient();

    const updatePaidSalaryMutation = useMutation({
        mutationFn: (values) => salaryServices.updatePaidSalary(row?.id, values),
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllEmployeesSalary'] });
                setOpenSalaryPaidDialog(false);
                toast.success(data?.data?.status?.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const AddSalary = (values) => {
        updatePaidSalaryMutation.mutate(values);
    }

    return (
        <section className="add-salary-form" >
            <Formik
                initialValues={{ salary: null }}
                onSubmit={(values) => AddSalary(values)}
            >
                {({ handleSubmit, values, setFieldValue, isSubmitting }) => {
                    return (
                        <>
                            <Form className="all-employee-salary-form-container modal-form" onSubmit={handleSubmit}>
                                <div className="mb-2 form">
                                    <div className="all-employee-salary-form-content">
                                        <div className="medical-allowance content-box">
                                            <label htmlFor="salary" className='form-label'>Salary</label>
                                            <Field
                                                type="number"
                                                name="salary"
                                                id="salary"
                                                value={values?.salary}
                                                className="form-control"
                                                component={FormikInput}
                                                onChange={(e) => setFieldValue("salary", +e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="">
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
            </Formik>
        </section >
    )
}

export default AddPaidSalaryForm