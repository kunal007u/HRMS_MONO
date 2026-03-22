import { Button } from '@mui/material'
import { Field, Formik } from 'formik'
import React from 'react'
import { Form, useNavigate } from 'react-router-dom'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'

const dummayData = [
    {
        id: 1,
        employeeName: 'John Doe',
        department: 'Sales',
        designation: 'Sales Manager',
        salary: 10000,
        hiringDate: '2021-01-01',

    },
    {
        id: 2,
        employeeName: 'Jane Smith',
        department: 'Marketing',
        designation: 'Marketing Manager',
        salary: 10000,
        hiringDate: '2021-01-01',

    },
    {
        id: 3,
        employeeName: 'Bob Johnson',
        department: 'HR',
        designation: 'HR Manager',
        salary: 10000,
        hiringDate: '2021-01-01',
    },
    {
        id: 4,
        employeeName: 'Alice Williams',
        department: 'Engineering',
        designation: 'Engineering Manager',
        salary: 10000,
        hiringDate: '2021-01-01',
    },


]
const WorkReport = () => {
    const [values, setValues] = React.useState({
        employeeName: '',
        department: '',
    })
   
    const navigate = useNavigate()

    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center' },
        { id: 'employeeName', label: 'Employee Name' },
        { id: 'department', label: 'Department' },
        { id: 'designation', label: 'Designation' },
        { id: 'salary', label: 'Salary' },
        { id: 'hiringDate', label: 'Hiring Date' },
        { id: 'actions3', label: 'Work Log', className: 'text-center' },
    ]

    const mapResponseToColumns = dummayData.map((item,index) => ({
        index : index+1,
        id: item.id,
        employeeName: item.employeeName,
        department: item.department,
        designation: item.designation,
        salary: item.salary,
        hiringDate: item.hiringDate,
    }))

    const handleView = (row) => {
        console.log("file: WorkReport.tsx:71 ~ handleView ~ row:", row)
        const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX;
        navigate(`${PATH_PREFIX}/hr/reports/work-report/${row.id}`)
    }

    return (
        <section className='white-box work-report-table'>
            <Formik
                initialValues={{
                    employeeName: '',
                    department: '',
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}


            >
                {({ values, setFieldValue, handleReset }) => {
                    const handleResetForm = () => {
                        setValues({
                            employeeName: '',
                            department: '',
                        })
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
                                            setValues({
                                                ...values,
                                                employeeName: e.target.value
                                            })
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
                                            setValues({
                                                ...values,
                                                department: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <Button className="btn btn-primary" onClick={() => handleResetForm()}>
                                        <span>Clear</span>
                                    </Button>
                                </div>
                            </div>
                        </Form>

                    )
                }}
            </Formik>

            <CustomShortingMuiTable isEditAccess={true} columns={columns} rows={mapResponseToColumns} isPagination={false} onView={handleView} />
        </section>
    )
}

export default WorkReport