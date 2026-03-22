import { Button, Grid } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import personalDetailService from '../../../Services/personal-detail-service';
import salaryServices from '../../../Services/salary-services';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import FormikSelect from '../../../Shared/formik-fields/FormikSelect';
import { MdDeleteForever } from 'react-icons/md';
import { FaPlusCircle } from 'react-icons/fa';
import { CalculateMonthlySalaryModel } from '../../../Models/employee/employeeM';
import "./salary.css"

const AddBonusForm = ({ setOpenDialog }) => {
    const queryClient = useQueryClient();
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    const lastMonth = String(currentDate.getMonth() + 1); // Months are zero-indexed in JavaScript
    const lastMonthYear = String(currentDate.getFullYear());

    const { data: AllEmployees } = useQuery({
        queryKey: ["getAllEmployeeDD"],
        queryFn: async () => {
            const response = await personalDetailService?.getAllEmployeeDD();
            return response?.data?.data;
        },
    });

    const addSalaryMutation = useMutation({
        mutationFn: salaryServices.createMonthlyEmployeesSalary,
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

    const initialState: CalculateMonthlySalaryModel = {
        month: lastMonth,
        year: lastMonthYear,
        salary: [
            {
                employeeId: '',
                bonus: ''
            }
        ]
    }

    return (
        <section className="add-salary-form" >
            <Formik
                initialValues={initialState}
                onSubmit={(values) => AddSalary(values)}
            >
                {({ handleSubmit, values, setFieldValue, isSubmitting }) => {
                    return (
                        <>
                            <Form className="all-employee-salary-form-container  modal-form" onSubmit={handleSubmit}>
                                <div className="mb-2 form">
                                    <div className="" style={{width:"100%"}}>
                                        <FieldArray
                                            name="salary"
                                            render={(arrayHelpers) => (
                                                <>
                                                    {values?.salary?.map((data, index) => {
                                                        return <div className='all-employee-salary-form-content' >
                                                            <div className="employee" style={{width:"30%"}}>
                                                                <label htmlFor="employeeId" className='form-label'>Employee</label>
                                                                <Field
                                                                    name={`salary.${index}.employeeId`}
                                                                    id="employeeId"
                                                                    options={AllEmployees?.map((employee) => ({
                                                                        title: employee?.fullName,
                                                                        value: employee?.id,
                                                                    }))}
                                                                    value={values?.salary[index]?.employeeId}
                                                                    className="form-control"
                                                                    component={FormikSelect}
                                                                    onChange={(e) => setFieldValue(`salary.${index}.employeeId`, e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="medical-allowanced" style={{width:"30%"}}>
                                                                <label htmlFor="bonus" className='form-label'>Bonus</label>
                                                                <Field
                                                                    type="number"
                                                                    name={`salary.${index}.bonus`}
                                                                    id="bonus"
                                                                    value={values?.salary[index]?.bonus}
                                                                    className="form-control"
                                                                    component={FormikInput}
                                                                    onChange={(e) => setFieldValue(`salary.${index}.bonus`, +e.target.value)}
                                                                />
                                                            </div>
                                                            <Grid item lg={3} md={4} sm={4} xs={12} className='d-flex item-center' >
                                                              
                                                                {values?.salary?.length === (index + 1) && (
                                                                    <Button
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        type="button"
                                                                        className='outlinedBtn'
                                                                        onClick={() => arrayHelpers.push({ employeeId: null, bonus: null })}
                                                                    >
                                                                        <FaPlusCircle className='text-white mr-2' /> Add More
                                                                    </Button>
                                                                )}
                                                                  {index > 0 && index === values?.salary?.length - 1 && (
                                                                    <span
                                                                        className='delete-btn'
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        <MdDeleteForever className='text-xl' />
                                                                    </span>
                                                                )}
                                                            </Grid>
                                                            {/* <hr className='employee-divider mt-3' /> */}
                                                        </div>
                                                    })}
                                                </>
                                            )}
                                        />

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
            </Formik>
        </section >
    )
}

export default AddBonusForm