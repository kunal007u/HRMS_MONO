import React from 'react'
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import { Form, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import personalDetailService from '../../../Services/personal-detail-service';
import { Field, Formik } from 'formik';
import FormikInput from '../../../Shared/formik-fields/FormikInput';
import { Button, debounce } from '@mui/material';
import "./allattendance.css";
import { Modules } from '../../../Shared/enums/modules';
import { getModulePermission, years } from '../../../utils/commanFunctions';
import { months } from '../../../Shared/constants/commonConstants';
import FormikSelect from '../../../Shared/formik-fields/FormikSelect';
import "./allattendance.css";
import { IAllemployeeData } from '../../../Models/employee/employeeM';
import moment from 'moment';

interface Iprops {
    employeeName: string;
    month?: number | string;
    year?: number;
}

const AllAttendance = () => {
    const currentDate = moment();
    const currentMonth = currentDate.month() + 1;
    const currentYear = currentDate.year();

    const [values, setValues] = React.useState<Iprops>({
        employeeName: '',
        month: currentMonth,
        year: currentYear,
    });

    const { data: permission } = useQuery({
        queryKey: ["modulePermission"],
        queryFn: () => getModulePermission(Modules.AllAttendance),
    });


    const debouncedSetSearchKey = debounce((search: string) => {
        setValues({
            ...values,
            employeeName: search,
        });
    }, 300);


    const navigate = useNavigate();

    const columns = [
        { id: 'index', label: 'S.No', width: 20, className: 'text-center' },
        { id: 'employeeCode', label: 'Code', width: 20, className: 'text-center' },
        { id: 'employees', label: 'Employees', width: 160, className: 'text-center' },
        { id: 'presentDays', label: 'Present Days', width: 160, className: 'text-center' },
        { id: 'leaveDays', label: 'Leave Days', width: 160, className: 'text-center' },
        { id: "paidLeave", label: "Paid Leave", width: 160, className: "text-center" },
        { id: 'department', label: 'Department', width: 160, className: 'text-center' },
        { id: 'reportTo', label: 'Report To', width: 160, className: 'text-center' },
        // { id: 'actions', label: 'Actions', width: 20, className: 'text-center' },
    ];

    const handleTableRowClick = (row) => {
        const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX;
        navigate(`${PATH_PREFIX}/hr/attendance/all-attendance/${row.employee_code}`, { state: { month: values?.month, year: values?.year, employeeName: row.employees } });
    }
    
    const { data: AllEmployees, isLoading } = useQuery({
        queryKey: ["getAllEmployee", values],
        queryFn: async () => {
            const response = await personalDetailService.getAllEmployees(values);
            return response?.data?.data as IAllemployeeData;
        },
        enabled: permission?.canRead
    });

    const rows = AllEmployees?.allEmployees?.map((row, index) => {
        return {
            id: row.id,
            index: index + 1,
            employees: row?.firstName + " " + row?.lastName || "-",
            employeeCode: row?.employeeCode || "",
            department: row?.department?.name || "-",
            reportTo: row?.reportToPerson?.firstName + " " + row?.reportToPerson?.lastName || "-",
            employee_code: row?.employeeCode || "-",
            presentDays: row?.presentDays || "-",
            leaveDays: row?.leaveDays || "-",
            paidLeave: row?.totalPaidLeave || "0",
        };
    })

    return (
        <>
            <div className="all-employee-content mt-2 white-box">
                <div className="filters-row">
                    <Formik
                        initialValues={{
                            employeeName: '',
                            month: currentMonth,
                            year: currentYear,
                        }}
                        onSubmit={(values) => {
                            setValues(values);
                        }}
                        onReset={() => {
                            setValues({
                                employeeName: '',
                            });
                        }}
                    >
                        {({ values, setFieldValue, handleReset }) => {
                            return (
                                <Form >
                                    <div className="employee-filter-form-content">
                                        <div className="employee-name content-box">
                                            <Field
                                                placeholder="Employee Name"
                                                type="text"
                                                className="form-control"
                                                id="employeeName"
                                                name="employeeName"
                                                value={values?.employeeName}
                                                component={FormikInput}
                                                onChange={(e) => {
                                                    debouncedSetSearchKey(e.target.value),
                                                        setFieldValue("employeeName", e.target.value);
                                                }}
                                            />
                                        </div>

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
                                                        month: e.target.value
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
                                                employeeName: '',
                                                month: currentMonth,
                                                year: currentYear,
                                            });
                                        }}>
                                            <Button className="btn btn-primary" style={{ backgroundColor: "#8e97a2 !important" }} type="submit">
                                                <span>Clear</span>
                                            </Button>
                                        </div>

                                        <h4 className='total-working-days'>
                                            {`Total working days: ${AllEmployees?.totalWorkingDays}`}
                                        </h4>
                                    </div>

                                </Form>
                            )
                        }}
                    </Formik>
                    <CustomShortingMuiTable
                        columns={columns}
                        isLoading={isLoading}
                        rows={rows || []}
                        onTableRowClick={handleTableRowClick}
                        // isViewAction={true}
                        permission={permission || { canCreate: false, canRead: false, canUpdate: false, canDelete: false }}
                    />
                </div>
            </div>
        </>
    )
}

export default AllAttendance