
import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import moment from 'moment'
import React, { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import worklogService from '../../../Services/worklog-service'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../Shared/components/DialogForm'
import { months } from '../../../Shared/constants/commonConstants'
import { Modules } from '../../../Shared/enums/modules'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'
import { getModulePermission, years } from '../../../utils/commanFunctions'
import { DateTimeToDateString } from '../../../utils/dateFormat'
import AddWorkForm from './AddWorkForm'
import WorkLogDetail from './WorkLogDetail'
import "./worklog.css"

interface Iprops {
    month?: number | string;
    year?: number;
}

const WorkHistory = () => {
    const [openOtherWorklogDialog, setOpenOtherWorklogDialog] = React.useState(false)
    const [row, setRow] = React.useState(null)
    const [openDialog, setOpenDialog] = React.useState(false);
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const location = useLocation();

    const currentDate = moment();
    const currentMonth = currentDate.month() + 1;
    const currentYear = currentDate.year();

    const [values, setValues] = React.useState<Iprops>({
        month: currentMonth,
        year: currentYear,
    });

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.WorkLog),
    });

    const columns = [
        { id: 'index', label: 'S.No', width: 50, className: 'text-center' },
        { id: 'date', props: 'day', label: 'Date', width: 10, className: 'text-center' },
        { id: 'project', label: 'Project', width: 30, className: 'text-center' },
        { id: "totalWorkHours", label: "Total Work Hours", width: 160, className: "text-center" },
        { id: 'actions', label: 'Actions', width: 10, className: 'text-center' }
    ];

    const { data: getWorkLog } = useQuery({
        queryKey: ["getAllWorkLog", values],
        queryFn: async () => {
            const response = await worklogService.getAll(values, id)
            return response?.data?.data;
        }
    });

    useEffect(() => {
        const employeeName = location.state?.employeeName;
        navigate(location.pathname, {
            state: { ...location.state, breadcrumb: employeeName },
            replace: true
        });
    }, [location.pathname, navigate]);

    const sumWorkHours = (workLogs) => {
        let totalHours = 0;
        let totalMinutes = 0;

        workLogs?.forEach(log => {
            const [hours, minutes] = log.workHour.split(':').map(Number);
            totalHours += hours;
            totalMinutes += minutes;
        });

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;

        return `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`;
    }

    const sumTotalWorkHours = (data) => {
        let totalHours = 0;
        let totalMinutes = 0;

        data?.forEach(item => {
            item.workLogs.forEach(log => {
                const [hours, minutes] = log.workHour.split(':').map(Number);
                totalHours += hours;
                totalMinutes += minutes;
            });
        });

        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;

        return `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`;
    }

    const mapResponseToColumns = (res, index: number) => {
        return {
            index: index + 1,
            date: res?.date,
            project: res?.projects.join(', '),
            workDetails: res?.workLogs.map((log) => ({
                id: log.id,
                workTitle: log.projectId,
                workHour: log.workHour,
                workDescription: log.description,
                projectName: log.projectName
            })),
            totalWorkHours: sumWorkHours(res?.workLogs)
        };
    };

    const customResponse = getWorkLog?.map(mapResponseToColumns);

    const handleView = (row) => {
        setRow(row)
        setOpenOtherWorklogDialog(true)
    }

    const handlEdit = (row) => {
        setRow(row)
        setOpenDialog(true)
    }

    return (
        <>
            <section className='work-history '>
                <div className="work-history-container">

                    {!id && <div className="add-history-btn d-flex justify-end" >
                        <Button className="btn btn-primary" onClick={() => setOpenDialog(true)}>
                            <span>  <FaPlus style={{ marginRight: "5px" }} />Add WorkLog </span>
                        </Button>
                    </div>}
                </div>
                <div className="work-history-container ">

                    {id && <div className="add-history-btn d-flex justify-end" >
                        <Button className="btn btn-primary" onClick={() => navigate(-1)}>
                            <span>Back</span>
                        </Button>
                    </div>}
                </div>

                <Formik
                    initialValues={{
                        month: currentMonth,
                        year: currentYear,

                    }}
                    onSubmit={(values) => {
                        setValues(values);
                    }}
                    onReset={() => {
                        setValues({
                            month: currentMonth,
                            year: currentYear,
                        });
                    }}
                >
                    {({ values, setFieldValue, handleReset }) => {
                        return (
                            <Form >
                                <div className='employee-filter-form-content '>
                                    <div className="month content-box">
                                        <Field
                                            placeholder="Month"
                                            name="month"
                                            as="select"
                                            className="attendance-month"
                                            component={FormikSelect}
                                            options={months}
                                            value={values.month}
                                            onChange={(e) => {
                                                setValues({
                                                    ...values,
                                                    month: e.target.value.toString().padStart(2, "0")
                                                });
                                                setFieldValue("month", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="year content-box">
                                        <Field
                                            placeholder="Year"
                                            name="year"
                                            as="select"
                                            className="attendance-year"
                                            component={FormikSelect}
                                            options={years}
                                            value={values.year}
                                            onChange={(e) => {
                                                setValues({
                                                    ...values,
                                                    year: e.target.value
                                                });
                                                setFieldValue("year", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="search-btn content-box" onClick={() => {
                                        handleReset();
                                        setValues({
                                            month: currentMonth,
                                            year: currentYear,
                                        });
                                    }}>
                                        <Button className="btn btn-primary" style={{ backgroundColor: "#8e97a2 !important" }} type="submit">
                                            <span>Clear</span>
                                        </Button>

                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
                <div className="white-box mt-1">
                    <h4 className='total-working-days d-flex justify-end mb-2'>
                        {`Total work log hours: ${sumTotalWorkHours(getWorkLog)}`}
                    </h4>

                    <CustomShortingMuiTable
                        columns={columns}
                        rows={customResponse}
                        onView={handleView}
                        isViewAction={true}
                        permission={permission}
                        isEditAction={id ? false : true}
                        onEdit={handlEdit}
                    />
                </div>
            </section>
            <DialogForm
                scroll="body"
                maxWidth="md"
                title={row ? 'Edit WorkLog' : 'Add WorkLog'}
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => {
                    setOpenDialog(false)
                    setRow(null)
                }}
                bodyContent={<AddWorkForm row={row} setOpenDialog={setOpenDialog} setRow={setRow} />}
            />

            <DialogForm
                scroll="body"
                maxWidth="lg"
                title={`Total Worklog: ${row?.totalWorkHours} Hrs for ${DateTimeToDateString(row?.date)}`}
                className='dialog-form'
                openDialog={openOtherWorklogDialog}
                handleDialogClose={() => {
                    setOpenOtherWorklogDialog(false)
                    setRow(null)
                }}
                bodyContent={<WorkLogDetail row={row} />}
            />


        </>


    )
}

export default WorkHistory