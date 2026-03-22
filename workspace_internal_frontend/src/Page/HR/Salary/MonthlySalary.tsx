import { Button } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import salaryServices from '../../../Services/salary-services'
import ConfirmDialog from '../../../Shared/components/ConfirmDialog'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable'
import DialogForm from '../../../Shared/components/DialogForm'
import { months } from '../../../Shared/constants/commonConstants'
import { Modules } from '../../../Shared/enums/modules'
import FormikSelect from '../../../Shared/formik-fields/FormikSelect'
import { getModulePermission, years } from '../../../utils/commanFunctions'
import { DateTimeToDateString } from '../../../utils/dateFormat'
import AddBonusForm from './AddBonusForm'
import AddPaidSalaryForm from './AddPaidSalaryForm'
import "./salary.css"
import { renderPaidSalary } from '../../../Shared/components/RenderStatus'
import moment from 'moment'
import FormikInput from '../../../Shared/formik-fields/FormikInput'
import '../Leaves/all-leaves.css'

const MonthlySalary = () => {
    const currentDate = moment();
    const dayOfMonth = currentDate.date();
    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    const [permission, setPermission] = React.useState(null)
    const [row, setRow] = React.useState(null)
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openSalaryPaidDialog, setOpenSalaryPaidDialog] = React.useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [month, setMonth] = React.useState(currentMonth)
    const [year, setYear] = React.useState(currentYear)
    const [openRemarkDialog, setOpenRemarkDialog] = React.useState(false);

    const statusChangeRef = React.useRef(null);

    const queryClient = useQueryClient();

    React.useEffect(() => {
        (async function () {
            const permission = await getModulePermission(Modules.MonthlySalary);
            setPermission(permission);
        })();
    }, [])

    const addSalaryMutation = useMutation({
        mutationFn: salaryServices.createMonthlyEmployeesSalary,
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllEmployeesSalary',] });
                setOpenConfirmDialog(false);
                toast.success(data?.data?.status.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const verifySalaryMutation = useMutation({
        mutationFn: salaryServices.updateSalaryStatus,
        onSuccess: (data) => {
            if (data?.data?.status) {
                queryClient.invalidateQueries({ queryKey: ['getAllEmployeesSalary',] });
                setOpenConfirmDialog(false);
                toast.success(data?.data?.status.message);
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const columns = [
        { id: 'index', label: 'S.No', className: 'text-center', width: "50px" },
        { id: 'employeeCode', label: 'Code', className: 'text-center', width: "50px" },
        { id: 'employeeName', label: 'Name', className: 'text-center' },
        { id: 'leaveDays', label: 'LD', className: 'text-center', width: "30px" },
        { id: 'presentDays', label: 'PD', className: 'text-center', width: "30px" },
        { id: 'totalSalary', label: 'TS', className: 'text-center', width: "50px" },
        { id: 'paidSalary', label: 'PS', className: 'text-center', width: "50px" },
        { id: 'salaryPaidAt', label: 'Salary PaidAt', className: 'text-center' },
        { id: 'switches', label: 'Verified', className: 'text-center', width: "50px" },
        { id: 'verifiedBy', label: 'Verified By', className: 'text-center' },
        { id: 'remarks', label: 'Remarks', className: 'text-center overflow-wrap', width: "250px" },
        { id: 'actions', label: 'Actions', className: 'text-center' },
    ]

    const { data: employeesSalary } = useQuery({
        queryKey: ["getAllEmployeesSalary", month, year],
        queryFn: async () => {
            const response = await salaryServices.getAllMonthlyEmployeesSalary(year, month);
            return response?.data?.data;
        },
    });

    const mapResponseToColumns = (row, index) => {
        return {
            ...row,
            index: index + 1,
            employeeId: row?.employeeId,
            employeeCode: row?.employee.employeeCode,
            employeeName: row?.employee?.firstName + ' ' + row?.employee?.lastName,
            totalWorkingDays: row?.totalWorkingDays,
            leaveDays: row?.leaveDays,
            presentDays: row?.presentDays,
            totalSalary: row?.totalSalary,
            paidSalary: row?.paidSalary ? renderPaidSalary(row?.totalSalary, row?.paidSalary) : '',
            salaryPaidAt: row?.salaryPaidAt ? DateTimeToDateString(row?.salaryPaidAt) : '',
            switches: row?.isVerified,
            verifiedBy: row?.verifiedBy,
            remarks: row?.remarks,
            actions: "actions"
        };
    };

    const customResponse = employeesSalary?.map(mapResponseToColumns);

    const handleEdit = (row) => {
        setRow(row);
        setOpenSalaryPaidDialog(true);
    }

    const handleCalculateSalary = () => {
        addSalaryMutation.mutate({ year: null, month: null });
    }

    const handleSwitchChange = (e, row) => {
        statusChangeRef.current = { isVerified: e.target.checked, salaryId: row.id }
        setOpenRemarkDialog(true)
    }
    
    const handleSubmit = (values) => {
        statusChangeRef.current = { ...statusChangeRef.current, remarks: values?.remarks }
        verifySalaryMutation.mutate(statusChangeRef.current);
        setOpenRemarkDialog(false);
    }

    const isDateBetween1stAnd10th = dayOfMonth >= 1 && dayOfMonth <= 10;

    return (
        <>
            <section className='all-employee-salary'>
                <div className="all-employee-salary">
                    <div className="add-salary-btn d-flex justify-end">
                        <Button
                            className="btn btn-primary"
                            onClick={() => setOpenConfirmDialog(true)}
                            disabled={!isDateBetween1stAnd10th}
                        >
                            <span>Calculate Salary</span>
                        </Button>
                    </div>
                </div>
            </section>
            <div className="all-employee-salary-content mt-2 white-box">
                <div className="filters-row mb-1">
                    <Formik
                        initialValues={{
                            month: currentMonth,
                            year: currentYear,
                        }}
                        onSubmit={(values) => {
                            setMonth(values.month)
                            setYear(values.year)
                        }}
                        onReset={() => {
                            setMonth(currentMonth)
                            setYear(currentYear)
                        }}
                    >
                        {({ values, setFieldValue, handleReset }) => {
                            return (
                                <Form>
                                    <div className="salary-filter-form-content form" >
                                        <div className="month-field ">
                                            <Field
                                                placeholder="Month"
                                                name="month"
                                                as="select"
                                                className="attendance-month"
                                                component={FormikSelect}
                                                options={months}
                                                value={values.month}
                                                onChange={(e) => {
                                                    setFieldValue("month", e.target.value)
                                                    setMonth(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="year-field ">
                                            <Field
                                                placeholder="Year"
                                                name="year"
                                                as="select"
                                                className="attendance-year"
                                                component={FormikSelect}
                                                value={values.year}
                                                options={years}
                                                onChange={(e) => {
                                                    setFieldValue("year", e.target.value)
                                                    setYear(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="search-btn " onClick={handleReset}>
                                            <Button className="btn btn-primary" style={{ backgroundColor: "#8e97a2 !important" }} type="submit">
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
                </div>
                <p style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3px', fontSize: '25px' }}>
                    Total Working Days: {customResponse ? customResponse[0]?.totalWorkingDays : null}
                </p>
                <CustomShortingMuiTable
                    columns={columns}
                    rows={customResponse}
                    permission={permission}
                    isEditAccess={true}
                    isEditAction={true}
                    onEdit={handleEdit}
                    onSwitchChange={handleSwitchChange}
                    className="employee-salary-table"
                />
            </div>
            <DialogForm
                scroll="body"
                maxWidth="lg"
                title="Add Bonus"
                className='dialog-form'
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={
                    <AddBonusForm setOpenDialog={setOpenDialog} />
                }
            />

            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Add Paid Salary"
                className='dialog-form'
                openDialog={openSalaryPaidDialog}
                handleDialogClose={() => setOpenSalaryPaidDialog(false)}
                bodyContent={
                    <AddPaidSalaryForm
                        row={row}
                        setOpenSalaryPaidDialog={setOpenSalaryPaidDialog}
                    />
                }
            />

            <ConfirmDialog
                title="Salary Calculation"
                maxWidth="sm"
                openDialog={openConfirmDialog}
                message={"Are you sure you want to calculate salary?"}
                isOtherOptions={true}
                handleBonus={() => {
                    setOpenDialog(true)
                    setOpenConfirmDialog(false)
                }}
                handleSalaryCalculation={() => handleCalculateSalary()}
                handleDialogClose={() => setOpenConfirmDialog(false)}
            />

            <DialogForm
                scroll="body"
                maxWidth="md"
                title="Remarks"
                openDialog={openRemarkDialog}
                handleDialogClose={() => setOpenRemarkDialog(false)}
                bodyContent={
                    <>
                        <div className="leave-remarks">
                            <Formik
                                initialValues={{
                                    remarks: '',
                                }}
                                onSubmit={handleSubmit}
                                // validationSchema={allLeaveRemarksValidationSchema}
                            >
                                {({ values, setFieldValue }) => {
                                    return (
                                        <Form>
                                            <div className="leave-remarks-content">
                                                <div className="remarks content-box">
                                                    <Field
                                                        placeholder="Remarks"
                                                        type="text"
                                                        multiline
                                                        rows={4}
                                                        maxLength="5000"
                                                        className="form-control"
                                                        id="remarks"
                                                        name="remarks"
                                                        value={values?.remarks}
                                                        component={FormikInput}
                                                        onChange={(e) => {
                                                            setFieldValue('remarks', e.target.value);
                                                        }}
                                                    />
                                                </div>
                                                <div className="remarks-btn content-box">
                                                    <Button className="btn btn-primary" type="submit">
                                                        <span>Submit</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </>
                }
            />

        </>

    )
}

export default MonthlySalary