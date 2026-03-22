import { Button } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import { useState } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import leaveServices from '../../../../Services/leaves-services'
import FormikDatePicker from '../../../../Shared/formik-fields/FormikDatePicker'
import FormikInput from '../../../../Shared/formik-fields/FormikInput'
import FormikSelect from '../../../../Shared/formik-fields/FormikSelect'
import "./myleaves.css"


interface IProps {
    row?: any | null;
    setOpenDialog?: (boolean) => void;
}

const MyLeavesForm = ({ row, setOpenDialog }: IProps) => {
    const queryClient = useQueryClient();
    const [datesSelected, setDatesSelected] = useState(false);
    const [dateRange, setDateRange] = useState(row?.leaveInfos || []);
    const [dateValues, setValues] = useState({
        startDate: '',
        endDate: '',
    });

    const updateLeaveMutation = useMutation({
        mutationFn: (values: any) => leaveServices?.updateLeave(values, row?.id),
        onSuccess: (data) => {
            toast.success(data?.data?.status?.message);
            queryClient.invalidateQueries({ queryKey: ['getAllLeave'] });
            setOpenDialog(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    const addLeaveMutation = useMutation({
        mutationFn: (values: any) => leaveServices?.addLeave(values),
        onSuccess: (data) => {
            toast.success(data?.data?.status?.message);
            queryClient.invalidateQueries({ queryKey: ['getAllLeave'] });
            setOpenDialog(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })

    const handleSubmit = async (values) => {
        const value = {
            startDate: values.startDate,
            endDate: values.endDate,
            dateRange: values.dateRange,
            reason: values.reason,
            numberOfDays: calculateNumberOfDays(values.dateRange)
        }
        if (row?.id) {
            updateLeaveMutation.mutate(value);
        } else {
            addLeaveMutation.mutate(value);
        }
    }

    const calculateNumberOfDays = (dates) => {
        return dates.reduce((total, date) => {
            if (!date.isWeekend && !date.isHoliday) {
                if (date.selectedDuration === "Full Day") {
                    return total + 1;
                } else if (date.selectedDuration === "Half Day") {
                    return total + 0.5;
                }
            }
            return total
        }, 0);
    };


    return (
        <section className="my-leaves-form-section">
            <Formik
                initialValues={{
                    startDate: row?.startDate || '',
                    endDate: row?.endDate || '',
                    reason: row?.reason || '',
                    dateRange: row?.leaveInfos || [],
                    remark: row?.remark || ''
                }}
                onSubmit={handleSubmit}
                validationSchema={Yup.object().shape({
                    startDate: Yup.string().required('Start Date is required'),
                    endDate: Yup.string().required('End Date is required'),
                    dateRange: Yup.array().of(Yup.object().shape({
                        selectedDuration: Yup.string().required('Leave Type is required')
                    })),
                    reason: Yup.string().required('Reason is required').trim(),
                })
                }
            >
                {({ setFieldValue, values }) => {

                    const { data: getAllLeaveDays } = useQuery({
                        queryKey: ["getAllLeavseDays", dateValues],
                        queryFn: async () => {
                            const value = {
                                leaveRequestId: row?.id || "",
                                startDate: values.startDate,
                                endDate: values.endDate
                            }
                            const response = await leaveServices.getAllLeavesDays(value);
                            const leaveDays = response?.data?.data?.leaveDays;
                            setDateRange(leaveDays);
                            setFieldValue('dateRange', leaveDays); // Update Formik's values
                            return response?.data?.data;
                        },
                        enabled: Boolean(datesSelected)
                    });
                    return (
                        <Form>
                            <div className="my-leaves-formik-fields">
                                <div className="d-flex gap-1 mb-1">
                                    <div className="start-date-field">
                                        <label htmlFor="startDate" className="form-label">Start Date</label>
                                        <Field
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            component={FormikDatePicker}
                                            // minDate={moment(row?.startDate) || moment()}
                                            onChange={(e) => {
                                                setFieldValue('startDate', e.target.value);
                                                setValues({
                                                    ...values,
                                                    startDate: e.target.value,
                                                })
                                                setDatesSelected(true);
                                            }}
                                            disabled={row?.infoBool}
                                        />
                                    </div>

                                    <div className="end-date-field">
                                        <label htmlFor="endDate" className="form-label">End Date</label>
                                        <Field
                                            type="date"
                                            name="endDate"
                                            id="endDate"
                                            component={FormikDatePicker}
                                            minDate={values.startDate && moment(values.startDate).isValid() ? moment(values.startDate) : undefined}
                                            onChange={(e) => {
                                                setFieldValue('endDate', e.target.value);
                                                setValues({
                                                    ...values,
                                                    endDate: e.target.value,
                                                })
                                                setDatesSelected(true);
                                            }}
                                            disabled={row?.infoBool}
                                        />
                                    </div>
                                </div>

                                {values.dateRange.length > 0 && (
                                    <div className="date-range-selection" >
                                        <h4 className='mb-1 mt-1'>Select Leave Type for Each Day</h4>
                                        <div className="date-range-selection">
                                            <table className="leave-table">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Leave Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {values.dateRange.map((date, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{moment(date.date).format('ddd, DD-MM-YYYY')}</td>
                                                                <td>
                                                                    <Field
                                                                        name={`dateRange[${index}].selectedDuration`}
                                                                        component={FormikSelect}
                                                                        options={[
                                                                            { title: 'Full Day', value: 'Full Day' },
                                                                            { title: 'Half Day', value: 'Half Day' },
                                                                            { title: "Weekend", value: "Weekend", disabled: true },
                                                                            { title: "Holiday", value: "Holiday", disabled: true }

                                                                        ]}
                                                                        value={date.selectedDuration}
                                                                        disabled={row?.infoBool || values?.dateRange[index].selectedDuration === "Weekend" || values?.dateRange[index].selectedDuration === "Holiday"}
                                                                        onChange={(e) => {
                                                                            setFieldValue(`dateRange[${index}].selectedDuration`, e.target.value);
                                                                            
                                                                        }}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>TOTAL</td>
                                                        <td>{calculateNumberOfDays(values.dateRange)} Day(s)</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                <div className="reason-field mt-1">
                                    <label htmlFor="reason" className="form-label">Reason</label>
                                    <Field
                                        multiline
                                        rows={4}
                                        name="reason"
                                        maxLength={100000}
                                        id="reason"
                                        component={FormikInput}
                                        disabled={row?.infoBool}
                                        onChange={(e) => {
                                            setFieldValue('reason', e.target.value);
                                        }}
                                        value={values.reason}
                                    />
                                </div>
                                {
                                    row?.remarks && (
                                        <div className="reason-field mt-1">
                                            <label htmlFor="remark" className="form-label">Remarks</label>
                                            <Field
                                                multiline
                                                rows={4}
                                                name="remark"
                                                maxLength={100000}
                                                id="remark"
                                                component={FormikInput}
                                                disabled={true}
                                                value={row?.remark}
                                            />
                                        </div>
                                    )

                                }
                            </div>
                            {
                                !row?.infoBool && (
                                    <div className="my-leaves-form-buttons d-flex gap-1 justify-center mt-2">
                                        <Button type="submit" className="btn btn-primary">
                                            <span>Submit</span>
                                        </Button>
                                    </div>
                                )
                            }

                        </Form>
                    )
                }}
            </Formik>
        </section>
    )
}

export default MyLeavesForm