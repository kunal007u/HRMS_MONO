import { Button } from '@mui/material';
import { Field, Formik } from 'formik';
import React from 'react';
import { Form } from 'react-router-dom';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import FormikSelect from '../../../Shared/formik-fields/FormikSelect';

const dummyData = [
    {
        id: 1,
        employee: 'John Doe',
        department: 'Sales',
        totalLeaves: 20,
        leavesTaken: 10,
        remainingLeave: 10,
        leaveCarryForward: 5,
    },
    {
        id: 2,
        employee: 'Jane Smith',
        department: 'Marketing',
        totalLeaves: 15,
        leavesTaken: 10,
        remainingLeave: 5,
        leaveCarryForward: 2,
    },
    {
        id: 3,
        employee: 'Bob Johnson',
        department: 'HR',
        totalLeaves: 20,
        leavesTaken: 13,
        remainingLeave: 7,
        leaveCarryForward: 3,
    },
    {
        id: 4,
        employee: 'Alice Williams',
        department: 'Engineering',
        totalLeaves: 25,
        leavesTaken: 13,
        remainingLeave: 12,
        leaveCarryForward: 6,
    },
    {
        id: 4,
        employee: 'Alice Williams',
        department: 'Engineering',
        totalLeaves: 25,
        leavesTaken: 13,
        remainingLeave: 12,
        leaveCarryForward: 6,
    },
    {
        id: 4,
        employee: 'Alice Williams',
        department: 'Engineering',
        totalLeaves: 25,
        leavesTaken: 13,
        remainingLeave: 12,
        leaveCarryForward: 6,
    },
    {
        id: 4,
        employee: 'Alice Williams',
        department: 'Engineering',
        totalLeaves: 25,
        leavesTaken: 13,
        remainingLeave: 12,
        leaveCarryForward: 6,
    },
    // Add more dummy data as needed
];

const LeaveReport = () => {
    const [employeeName, setEmployeeName] = React.useState('')
    const [department, setDepartment] = React.useState('')
   
    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center' },
        { id: "employee", label: "Employee", },
        { id: "department", label: "Department", className: "text-center" },
        { id: "leavesTaken", label: "Leaves Taken", className: "text-center" },
        { id: "remainingLeave", label: "Remaining Leave", className: "text-center" },
        { id: "totalLeaves", label: "Total Leaves", className: "text-center" },
        { id: "leaveCarryForward", label: "Leave Carry Forward", className: "text-center" },
    ]

    const mapResponseToColumns = dummyData.map((item: any,index:number) => {
        return {
            ...item,
            index: index + 1,
        }
    })


    return (
        <section className='white-box leave-report-table'>
            <Formik
                initialValues={{
                    employeeName: '',
                    department: '',
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}


            >
                {({ values, setFieldValue, resetForm, handleReset }) => {
                    const handleResetForm = () => {
                        setEmployeeName('')
                        setDepartment('')
                        handleReset()
                    }
                    return (
                        <Form>
                            <div className="filter-form d-flex gap-1 form mb-1" style={{ flexWrap: "nowrap" }}>
                                <div className="form-group">
                                    <Field
                                        placeholder="Employee Name"
                                        type="text"
                                        name="employeeName"
                                        id="employeeName"
                                        component={FormikInput}
                                        className="form-control"
                                        value={values?.employeeName}
                                        onChange={(e: any) => {
                                            setFieldValue("employeeName", e.target.value)
                                            setEmployeeName(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <Field
                                        placeholder="Department"
                                        type="text"
                                        name="department"
                                        component={FormikSelect}
                                        options={[
                                            { value: 1, title: "Web Developer" },
                                            { value: 2, title: "Graphic Designer" },
                                            { value: 3, title: "Marketing" },
                                            { value: 4, title: "Sales" },
                                            { value: 5, title: "HR" },
                                        ]}
                                        value={values?.department}
                                        id="department"
                                        className="form-control"
                                        onChange={(e: any) => {
                                            setFieldValue("department", e.target.value)
                                            setDepartment(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <Button className="btn btn-primary" onClick={() => handleResetForm()}>

                                        <span>
                                            Clear
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Form>

                    )
                }}
            </Formik>

            <CustomShortingMuiTable isEditAccess={true} columns={columns} rows={mapResponseToColumns} isPagination={false} />
        </section>
    )
}

export default LeaveReport