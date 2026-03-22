/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ConfirmDialog from '../../../Shared/components/ConfirmDialog';
import attendanceService from "../../../Services/attendance-service"
import { toast } from 'react-toastify';
import { Field, FieldArray, Form, Formik } from 'formik';
import FormikSelect from '../../../Shared/formik-fields/FormikSelect';
import FormikDatePicker from '../../../Shared/formik-fields/FormikDatePicker';
import { MdDelete } from 'react-icons/md';
import * as Yup from 'yup';


const hours = [
    { title: "00", value: "00" },
    { title: "01", value: "01" },
    { title: "02", value: "02" },
    { title: "03", value: "03" },
    { title: "04", value: "04" },
    { title: "05", value: "05" },
    { title: "06", value: "06" },
    { title: "07", value: "07" },
    { title: "08", value: "08" },
    { title: "09", value: "09" },
    { title: "10", value: "10" },
    { title: "11", value: "11" },
    { title: "12", value: "12" },
]

const minutes = [
    { title: "00", value: "00" },
    { title: "01", value: "01" },
    { title: "02", value: "02" },
    { title: "03", value: "03" },
    { title: "04", value: "04" },
    { title: "05", value: "05" },
    { title: "06", value: "06" },
    { title: "07", value: "07" },
    { title: "08", value: "08" },
    { title: "09", value: "09" },
    { title: "10", value: "10" },
    { title: "11", value: "11" },
    { title: "12", value: "12" },
    { title: "13", value: "13" },
    { title: "14", value: "14" },
    { title: "15", value: "15" },
    { title: "16", value: "16" },
    { title: "17", value: "17" },
    { title: "18", value: "18" },
    { title: "19", value: "19" },
    { title: "20", value: "20" },
    { title: "21", value: "21" },
    { title: "22", value: "22" },
    { title: "23", value: "23" },
    { title: "24", value: "24" },
    { title: "25", value: "25" },
    { title: "26", value: "26" },
    { title: "27", value: "27" },
    { title: "28", value: "28" },
    { title: "29", value: "29" },
    { title: "30", value: "30" },
    { title: "31", value: "31" },
    { title: "32", value: "32" },
    { title: "33", value: "33" },
    { title: "34", value: "34" },
    { title: "35", value: "35" },
    { title: "36", value: "36" },
    { title: "37", value: "37" },
    { title: "38", value: "38" },
    { title: "39", value: "39" },
    { title: "40", value: "40" },
    { title: "41", value: "41" },
    { title: "42", value: "42" },
    { title: "43", value: "43" },
    { title: "44", value: "44" },
    { title: "45", value: "45" },
    { title: "46", value: "46" },
    { title: "47", value: "47" },
    { title: "48", value: "48" },
    { title: "49", value: "49" },
    { title: "50", value: "50" },
    { title: "51", value: "51" },
    { title: "52", value: "52" },
    { title: "53", value: "53" },
    { title: "54", value: "54" },
    { title: "55", value: "55" },
    { title: "56", value: "56" },
    { title: "57", value: "57" },
    { title: "58", value: "58" },
    { title: "59", value: "59" },
]

const period = [
    {
        title: "AM",
        value: "am"
    },
    {
        title: "PM",
        value: "pm"
    },
]

const InOutLogsDetails = ({ dailyInOutLogData, employeeCode, setOpenDialog }) => {
    const queryClient = useQueryClient();
    const inOutRef = React.useRef(null);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

    const initialState = {
        date: '',
        timeData: [
            {
                hour: '',
                minutes: '',
                period: ''
            }
        ]
    }

    const newData = []
    dailyInOutLogData?.inOut?.forEach(element => {
        element?.in !== null && newData.push(element.in)
        element?.out !== null && newData.push(element.out)
    })

    const handleDelete = (row) => {
        setOpenConfirmDialog(true);
        inOutRef.current = {
            employeeCode: employeeCode,
            date: dailyInOutLogData?.date,
            time: row,
        };
    }

    const handleConfirmDelete = async () => {
        if (inOutRef.current) {
            await attendanceService.deleteEmployeeLog(inOutRef.current)
                .then((res) => {
                    toast.success(res?.data?.status?.message);
                    queryClient?.invalidateQueries({ queryKey: ['dailyLog'] });
                    setOpenDialog(false)
                    setOpenConfirmDialog(false);
                })
        }
    }

    const addEmployeeLogMutation = useMutation({
        mutationFn: attendanceService.addEmpLogManually,
        onSuccess: (data) => {
            if (data?.data?.status) {
                toast.success(data?.data?.status?.message);
                queryClient.invalidateQueries({ queryKey: ['dailyLog'] });
                setOpenDialog(false)
                setOpenConfirmDialog(false);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const handleSubmit = async (value) => {
        inOutRef.current = {
            employeeCode: employeeCode,
            date: dailyInOutLogData?.date ?? value?.date,
            timeData: value?.timeData.map((data) => { return { time: `${data.hour}:${data.minutes} ${data.period}` } }),
        };
        addEmployeeLogMutation.mutate(inOutRef.current);
    };

    const withDateValidationSchema = () => {
        return Yup.object().shape({
            date: Yup.date().required('Date is required'),
            timeData: Yup.array().of(
                Yup.object().shape({
                    hour: Yup.string().required('Hour is required'),
                    minutes: Yup.string().required('Minutes is required').trim(),
                    period: Yup.string().required('Period is required'),
                })
            ),
        });
    };

    const withOutDateValidationSchema = () => {
        return Yup.object().shape({
            timeData: Yup.array().of(
                Yup.object().shape({
                    hour: Yup.string().required('Hour is required'),
                    minutes: Yup.string().required('Minutes is required').trim(),
                    period: Yup.string().required('Period is required'),
                })
            ),
        });
    };


    return (
        <>
            {dailyInOutLogData && <TableContainer className="" style={{ padding: '5px' }}>
                <Table className="" style={{ border: 'none' }}>
                    <TableHead className="table-head">
                        <TableRow className="table-head-row">
                            <TableCell className="table-head-col text-center" width={'5%'}>
                                Time
                            </TableCell>
                            <TableCell className="table-head-col text-center" width={'5%'}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="table-body daily-attendance-table-body">
                        {newData?.length > 0 ? (
                            newData?.map((item, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        className="table-body-row"
                                    >
                                        <TableCell className="table-cell text-center"  >
                                            {item}
                                        </TableCell>
                                        <TableCell className="table-cell text-center">
                                            <FaTrash onClick={() => handleDelete(item)} style={{ color: "#ff4343", cursor: "pointer", fontSize: "16px" }} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow className="table-not-found-row">
                                <TableCell colSpan={12} className="table-not-found-col">
                                    <h2 className="table-no-data-found-text">
                                        No Data Found
                                    </h2>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>}

            <Formik
                initialValues={initialState}
                onSubmit={handleSubmit}
                validationSchema={dailyInOutLogData ? withOutDateValidationSchema : withDateValidationSchema}
            >
                {({ values, setFieldValue }) => {
                    return (
                        <Form style={{ padding: '10px' }}>
                            {!dailyInOutLogData && <div className="personal-detail-form-content mb-2">
                                <label htmlFor="date" className='form-label'>Date</label>
                                <Field
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    value={values?.date}
                                    component={FormikDatePicker}
                                    onChange={(e) => setFieldValue("date", e.target.value)}
                                />
                            </div>}
                            <FieldArray
                                name="timeData"
                                render={(arrayHelpers) => (
                                    <>
                                        {
                                            values?.timeData?.map((experience, index) => (
                                                <>
                                                    <div key={index} className="d-flex gap-2 mb-1 mt-1">
                                                        <div className="personal-detail-form-content" style={{ width: '32%' }}>
                                                            <label htmlFor={`timeData.${index}.hour`} className="form-label">Hour</label>
                                                            <Field
                                                                type="text"
                                                                name={`timeData.${index}.hour`}
                                                                className="form-control"
                                                                options={hours}
                                                                value={values?.timeData[index]?.hour}
                                                                hasObject
                                                                component={FormikSelect}
                                                                onChange={(e) => setFieldValue(`timeData.${index}.hour`, e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="personal-detail-form-content" style={{ width: '32%' }}>
                                                            <label htmlFor={`timeData.${index}.minutes`} className="form-label">Minutes</label>
                                                            <Field
                                                                type="text"
                                                                name={`timeData.${index}.minutes`}
                                                                className="form-control"
                                                                options={minutes}
                                                                value={values?.timeData[index]?.minutes}
                                                                hasObject
                                                                component={FormikSelect}
                                                                onChange={(e) => setFieldValue(`timeData.${index}.minutes`, e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="personal-detail-form-content" style={{ width: '32%' }}>
                                                            <label htmlFor={`timeData.${index}.period`} className="form-label">Period</label>
                                                            <Field
                                                                type="text"
                                                                name={`timeData.${index}.period`}
                                                                className="form-control"
                                                                options={period}
                                                                value={values?.timeData[index]?.period}
                                                                hasObject
                                                                component={FormikSelect}
                                                                onChange={(e) => setFieldValue(`timeData.${index}.period`, e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "100%", display: "flex", alignItems: "center" }} >
                                                        <hr style={{ width: "100%" }} />
                                                        {index > 0 && index === values?.timeData?.length - 1 && (
                                                            <MdDelete
                                                                style={{ marginRight: "auto", fontSize: "20px", color: "red", cursor: "pointer" }}
                                                                onClick={() => arrayHelpers?.remove(index)}
                                                            />
                                                        )}
                                                    </div>
                                                    {values?.timeData?.length === (index + 1) && (
                                                        <div className='d-flex gap-2 mt-2'>
                                                            <Button
                                                                variant="contained"
                                                                onClick={() => arrayHelpers.push({
                                                                    hour: '',
                                                                    minutes: '',
                                                                    period: '',
                                                                })}
                                                                className="btn btn-primary"
                                                            >
                                                                <span>
                                                                    Add More
                                                                </span>
                                                            </Button>
                                                            <Button type="submit" variant='contained' className="btn btn-primary">
                                                                <span>Submit</span>
                                                            </Button>
                                                        </div>
                                                    )}
                                                </>
                                            ))
                                        }
                                    </>
                                )}
                            />
                        </Form>
                    )
                }}
            </Formik>

            <ConfirmDialog
                title="Delete Log"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                handleDialogClose={() => setOpenConfirmDialog(false)}
                message={"Are you certain you wish to permanently delete this log record?"}
                handleSuccess={() => handleConfirmDelete()}
            />
        </>
    )
}

export default InOutLogsDetails