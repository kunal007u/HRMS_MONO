import { Button } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'
import { years } from '../../../utils/commanFunctions'

const dummyData = [
    {
        id: 1,
        employeeName: "Employee 1",
        department: "Department 1",
        joiningDate: "01/01/2021",
        designation: "Designation 1",
    },
    {
        id: 2,
        employeeName: "Employee 2",
        department: "Department 2",
        joiningDate: "01/01/2021",
        designation: "Designation 2",
    }
]
const AdminAssessment = () => {
    const navigate = useNavigate()
    const [value, setValue] = React.useState({
        year: '',
        search: ''
    })

    const columns = [
        { id: 'index', label: 'S.No', className: "text-center" },
        { id: 'employeeName', label: 'Employee Name', className: "text-center", },
        { id: 'department', label: 'Department', className: "text-center", },
        { id: 'joiningDate', label: 'Joining Date', className: "text-center", },
        { id: 'designation', label: 'Designation', className: "text-center", },
        { id: 'actions', label: 'Review', className: "text-center", },
    ]
    const customResponse = dummyData.map((item: any, index: number) => {
        return {
            id: item.id,
            index: index + 1,
            employeeName: item.employeeName,
            department: item.department,
            joiningDate: item.joiningDate,
            designation: item.designation,
            review: item.review,
        }
    })

    const handleView = (employee: any) => {
        const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX ? import.meta.env.VITE_PATH_PREFIX : ''
        navigate(`${PATH_PREFIX}/performance/assessment/admin-assessment/employee/${employee.id}`)
    }

    return (
        <section className="white-box mt-1">
            <Formik
                initialValues={{
                    year: '',
                    search: ''
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ setFieldValue }) => {
                    return (
                        <Form>
                            <div className="filter-form d-flex gap-1 form mb-1" style={{ flexWrap: "nowrap" }}>
                                <div className="form-group">
                                    <Field
                                        placeholder="Year"
                                        type="text"
                                        className="form-control"
                                        id="year"
                                        name="year"
                                        options={years}
                                        component={FormikSelect}
                                        onChange={(e: any) => {
                                            setValue({
                                                ...value,
                                                year: e.target.value
                                            })

                                            setFieldValue("year", e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <Field
                                        placeholder="Search"
                                        type="text"
                                        className="form-control"
                                        id="search"
                                        name="search"
                                        component={FormikInput}
                                        onChange={(e: any) => {
                                            setValue({
                                                ...value,
                                                search: e.target.value
                                            })
                                            setFieldValue("search", e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <Button type="submit" className="btn btn-primary">
                                        <span>Clear</span>
                                    </Button>
                                </div>
                            </div>
                        </Form>

                    )
                }}
            </Formik>
            <CustomShortingMuiTable
                columns={columns}
                rows={customResponse}
                isEditAccess={true}
                
                isViewAction={true}
                onView={handleView}
            />
        </section>
    )
}

export default AdminAssessment