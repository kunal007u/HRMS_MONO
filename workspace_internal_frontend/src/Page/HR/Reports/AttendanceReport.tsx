import { Button } from '@mui/material'
import { Field, Formik } from 'formik'
import React from 'react'
import { Form } from 'react-router-dom'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'

const dummayData = [
    {
        id: 1,
        employeeName: 'John Doe',
        department: 'Sales',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,

    },
    {
        id: 2,
        employeeName: 'Jane Smith',
        department: 'Marketing',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,
    },
    {
        id: 3,
        employeeName: 'Bob Johnson',
        department: 'HR',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,
    },
    {
        id: 4,
        employeeName: 'Alice Williams',
        department: 'Engineering',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,
    },
    {
        id: 5,
        employeeName: 'Alice Williams',
        department: 'Engineering',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,
    },
    {
        id: 6,
        employeeName: 'Alice Williams',
        department: 'Engineering',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,
    },
    {
        id: 7,
        employeeName: 'Alice Williams',
        department: 'Engineering',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,
    },
    {
        id: 8,
        employeeName: 'Alice Williams',
        department: 'Engineering',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,
    },
    {
        id: 9,
        employeeName: 'Alice Williams',
        department: 'Engineering',
        PDays: 20,
        LDays: 2,
        halfLeaves: 1,
        lateDays: 1,
    },

]
const AttendanceReport = () => {
    const [values, setvalues] = React.useState({
        employeeName: '',
        department: '',
    })

    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center'},
        { id: 'employeeName', label: 'Employee Name' },
        { id: 'department', label: 'Department' },
        { id: 'PDays', label: 'P Days', sortable: true, className: "text-center" },
        { id: 'LDays', label: 'L Days', sortable: true, className: "text-center" },
        { id: 'halfLeaves', label: 'Half Leaves', sortable: true, className: "text-center" },
        { id: 'lateDays', label: 'Late Days', sortable: true, className: "text-center" },
    ]

    const mapResponseToColumns = dummayData.map((item,index) => {
        return {
            ...item,
            index: index + 1,
            employeeName: item.employeeName,
            department: item.department,
            PDays: item.PDays,
            LDays: item.LDays,
            halfLeaves: item.halfLeaves,
            lateDays: item.lateDays,
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
                        setvalues({
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
                                            setvalues({
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
                                            setvalues({
                                                ...values,
                                                department: e.target.value
                                            })
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

export default AttendanceReport