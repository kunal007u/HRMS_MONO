import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Form, useParams } from 'react-router-dom'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import { Field, Formik } from 'formik'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import { Button } from '@mui/material'
import { getModulePermission } from '../../../utils/commanFunctions'
import { Modules } from '../../../Shared/enums/modules'

const dummyData = [
    {
        id: 1,
        date: '2021-01-01',
        workTitle: 'Work Title 1',
        workDescription: 'Work Description 1 jspdf.es.*.js: Modern ES2015 module format jspdf.node.*.js: For running in Node. Uses file operations for loading/saving files instead of browser APIs. jspdf.umd.*.js: UMD module format. For AMD or script-tag loading.polyfills*.js: Required polyfills for older browsers like Internet Explorer. The es variant simply imports all required polyfills from core-js, the umd variant is self-contained.Usually it is not necessary to specify the exact file in the import statement. Build tools or Node automatically figure out the right file, so importing "jspdf" is enough.',
    },
    {
        id: 2,
        date: '2021-01-02',
        workTitle: 'Work Title 2',
        workDescription: 'Work Description 2',
    },
    {
        id: 3,
        date: '2021-01-03',
        workTitle: 'Work Title 3',
        workDescription: 'Work Description 3',
    },
    {
        id: 4,
        date: '2021-01-04',
        workTitle: 'Work Title 4',
        workDescription: 'Work Description 4',
    },
]
const WorkReportById = () => {
    const { id } = useParams()


    const columns = [
        { id: 'date', label: 'Date' },
        { id: 'workTitle', label: 'Work Title' },
        { id: 'workDescription', label: 'Work Description', width: "40%" },
    ]

    const mapResponseToColumns = dummyData.map((item) => ({
        id: item.id,
        date: item.date,
        workTitle: item.workTitle,
        workDescription: item.workDescription,
    }))

    const [values, setValues] = React.useState({
        startDate: '',
        endDate: '',
    })
    // const { data: workReportByIdData, isLoading: workReportByIdIsLoading, error: workReportByIdError } = useQuery(['workReportById', id], async () => {
    //     // const response = await fetch(`http://localhost:3000/workReport/${params.id}`)
    //     // return response.json()
    // })

    return (
        <div className="white-box">
            <Formik
                initialValues={{
                    startDate: '',
                    endDate: '',
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}


            >
                {({ values, setFieldValue, handleReset }) => {
                    const handleResetForm = () => {
                        setValues({
                            ...values,
                            startDate: '',
                            endDate: '',
                        })
                        handleReset()
                    }
                    return (
                        <Form>
                            <div className="filter-form d-flex gap-1 form mb-1" style={{ flexWrap: "nowrap" }}>
                                <div className="form-group">
                                    <Field
                                        label="Start Date"
                                        type="Date"
                                        name="startDate"
                                        id="startDate"
                                        component={FormikInput}
                                        className="form-control"
                                        value={values?.startDate}
                                        onChange={(e: any) => {
                                            setFieldValue("startDate", e.target.value)
                                            setValues({
                                                ...values,
                                                startDate: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <Field
                                        label="End Date"
                                        type="Date"
                                        name="endDate"
                                        id="endDate"
                                        component={FormikInput}
                                        className="form-control"
                                        value={values?.endDate}
                                        onChange={(e: any) => {
                                            setFieldValue("endDate", e.target.value)
                                            setValues({
                                                ...values,
                                                endDate: e.target.value
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
            <CustomShortingMuiTable columns={columns} rows={mapResponseToColumns}  />
        </div>
    )
}

export default WorkReportById