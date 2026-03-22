import { Button } from '@mui/material';
import { Field, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomShortingMuiTable from '../../../Shared/components/CustomShortingMuiTable/CustomShortingMuiTable';
import FormikSelect from '../../../Shared/formik-fields/FormikSelect';
import { getModulePermission, years } from '../../../utils/commanFunctions';
import "../../HR/Salary/salary.css";
import { useQuery } from '@tanstack/react-query';
import salaryServices from '../../../Services/salary-services';
import { EmployeeMonthlySalaryModel } from '../../../Models/employee/employeeM';
import { Modules } from '../../../Shared/enums/modules';
import moment from 'moment';
import { DateUTCToLocalDateWithTimeString } from '../../../utils/dateFormat';

const PaySlipTable = () => {
  const navigate = useNavigate()
  const currentDate = moment();
  const currentMonth = currentDate.month() + 1;
  const currentYear = currentDate.year();
  const [permission, setPermission] = React.useState(null)

  React.useEffect(() => {
    (async function () {
      const permission = await getModulePermission(Modules.PaySlip);
      setPermission(permission);
    })();
  }, [])

  const [year, setYear] = React.useState<number>(+currentYear)

  const columns = [
    { id: 'index', label: 'S.No', className: 'text-center' },
    { id: 'date', props: 'same',label: 'Month', className: 'text-center' },
    { id: 'totalWorkingDays', label: 'Total Working Days', className: 'text-center' },
    { id: 'presentDays', label: 'Present Days', className: 'text-center' },
    { id: 'leaveDays', label: 'Leave Days', className: 'text-center' },
    { id: 'totalSalary', label: 'Total Salary', className: 'text-center' },
    { id: 'paidSalary', label: 'Paid Salary', className: 'text-center' },
    { id: 'salaryPaidAt', label: 'Salary Paid At', className: 'text-center' },
    { id: 'actions', label: 'Actions', className: 'text-center' },
  ]

  const { data: employeeSalaryByYear } = useQuery({
    queryKey: ["getEmployeeSalaryByYear", year],
    queryFn: async () => {
      const response = await salaryServices.getAllSalaryByEmployee(year);
      return response?.data?.data as EmployeeMonthlySalaryModel[];
    },
  });

  const mapResponseToColumns = (row: EmployeeMonthlySalaryModel, index) => {
    return {
      ...row,
      index: index + 1,
      employeeId: row?.employeeId,
      date: row?.month + '-' + row?.year,
      totalWorkingDays: row?.totalWorkingDays,
      presentDays: row?.presentDays,
      leaveDays: row?.leaveDays,
      totalSalary: row?.totalSalary,
      paidSalary: row?.paidSalary,
      salaryPaidAt: DateUTCToLocalDateWithTimeString(row?.salaryPaidAt),
      actions: "actions"
    };
  };

  const customResponse = employeeSalaryByYear?.map(mapResponseToColumns);

  const handleSlaryView = (row) => {
    const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX;
    navigate(`${PATH_PREFIX}/employee/payroll/payslip/${row.employeeId}`);
  }

  return (
    <div className='white-box'>
      <Formik
        initialValues={{
          month: currentMonth,
          year: currentYear,
        }}
        onSubmit={(values) => {
          setYear(+values.year)
        }}
        onReset={() => {
          setYear(+currentYear)
        }}
      >
        {({ setFieldValue, values, handleSubmit, resetForm }) => {
          return (
            <form onSubmit={handleSubmit} noValidate typeof="submit">
              <div className="attendance-fomrik-fields">
                <div className="year-field">
                  <Field
                    placeholder="Year"
                    name="year"
                    className="attendance-year"
                    component={FormikSelect}
                    value={values?.year}
                    options={years}
                    onChange={(e) => {
                      setFieldValue("year", e?.target?.value)
                      setYear(+e?.target?.value)
                    }}
                  />
                </div>
                <Button
                  className="btn btn-secondary"
                  title="Clear All"
                  type="reset"
                  onClick={() => {
                    resetForm();
                  }}
                >
                  <span>
                    Clear
                  </span>
                </Button>
              </div>
            </form>
          )

        }}
      </Formik>
      <CustomShortingMuiTable
        columns={columns}
        rows={customResponse}
        isEditAccess={true}
        isViewAction={true}
        onView={handleSlaryView}

        permission={permission}
      />
    </div>
  )
}

export default PaySlipTable