import { Button } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Field, Formik } from "formik"
import React, { useRef } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { IAttendanceResponseModal } from "../../../Models/attendance/attendanceM"
import attendanceService from "../../../Services/attendance-service"
import { months } from "../../../Shared/constants/commonConstants"
import { Modules } from "../../../Shared/enums/modules"
import FormikSelect from "../../../Shared/formik-fields/FormikSelect"
import { IApplicationState } from "../../../Store/state/app-state"
import { getModulePermission, years } from "../../../utils/commanFunctions"
import AttendanceTable from "./AttendanceTable"
import DailyAttendanceTable from "./DailyAttendanceTable"
import DialogForm from "../../../Shared/components/DialogForm";
import { DateTimeToDateString } from "../../../utils/dateFormat"
import InOutLogsDetails from "./InOutLogsDetails"
import moment from "moment"

const Attendance = () => {
  const currentDate = moment();
  const currentMonth = currentDate.month() + 1;
  const currentYear = currentDate.year();

  const userData = useSelector((state: IApplicationState) => state?.UserData);
  const { id } = useParams<{ id: string }>()
  const employeeDailyLogRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location;

  const [month, setMonth] = React.useState<string | number>(state?.month || currentMonth)
  const [year, setYear] = React.useState(state?.year || currentYear)
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleViewClick = (item) => {
    employeeDailyLogRef.current = item;
    setOpenDialog(true);
  };

  const { data: permission } = useQuery({
    queryKey: ["modulePermission"],
    queryFn: () => getModulePermission(Modules.Attendance),
  });

  const { data: employeeLog, isLoading } = useQuery<IAttendanceResponseModal, Error, IAttendanceResponseModal, (string | number)[]>({
    queryKey: ["dailyLog", month, year],
    queryFn: () => attendanceService.dailyLog(month, year, id ? id : userData?.employee_code).then(response => {
      if (response?.data?.data?.dailyLog.length <= 0) {
        return null
      }
      return response?.data?.data
    }),
    enabled: permission?.canRead
  });

  React.useEffect(() => {
    const employeeName = location.state?.employeeName;
    navigate(location.pathname, {
      state: { ...location.state, breadcrumb: employeeName },
      replace: true
    });
  }, [location.pathname, navigate]);

  return (
    <>
      {id && <div className="d-flex justify-end mb-2">
        <Button
          size="medium"
          variant="contained"
          className="btn btn-primar"
          sx={{
            marginRight: '10px'
          }}
          disableElevation
          onClick={() => {
            employeeDailyLogRef.current = null;
            setOpenDialog(true);
          }}
        >
          Add
        </Button>
        <Button
          size="medium"
          variant="contained"
          className="btn btn-primary"
          disableElevation
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>}
      <div className="white-box mb-1">
        <Formik
          initialValues={{
            month: state?.month || currentMonth,
            year: state?.year || currentYear,
          }}
          onSubmit={(values) => {
            setMonth(values.month.toString().padStart(2, "0"));
            setYear(values.year)
          }}
          onReset={() => {
            setMonth(currentMonth)
            setYear(currentYear)
          }}
        >
          {({ setFieldValue, values, handleSubmit, resetForm }) => {
            return (
              <form onSubmit={handleSubmit} noValidate typeof="submit">
                <div className="attendance-fomrik-fields">
                  <div className="moth-field">

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
                        setMonth(e.target.value);
                      }}
                    />
                  </div>

                  <div className="year-field">
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

                  <Button
                    className="btn btn-secondary"
                    title="Clear All"
                    type="reset"
                    onClick={() => resetForm()}

                  >
                    <span>Clear </span>
                  </Button>
                </div>

              </form>
            )
          }}
        </Formik>
        <AttendanceTable employeeAvgLog={employeeLog?.monthData} isLoading={isLoading} />
      </div >

      <DailyAttendanceTable employeeDailyLog={employeeLog?.dailyLog} isLoading={isLoading} onView={handleViewClick} />

      <DialogForm
        scroll="body"
        maxWidth="sm"
        title={employeeDailyLogRef.current ? `Daily Logs - ${DateTimeToDateString(employeeDailyLogRef.current?.date)}` : 'Add Daily Log'}
        openDialog={openDialog}
        handleDialogClose={() => setOpenDialog(false)}
        bodyContent={
          <InOutLogsDetails
            dailyInOutLogData={employeeDailyLogRef.current}
            employeeCode={id ? id : userData?.employee_code}
            setOpenDialog={setOpenDialog}
          />}
      />
    </>
  )
}

export default Attendance