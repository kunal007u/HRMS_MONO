const {
  statusCode,
  constants,
  successResponseFunc,
  errorResponseFunc,
  logger,
  path,
  Attendance,
  Employees,
  fs,
  csv,
} = require("./attendancePackageCentral");

const getAllAttendance = async (req, res) => {
  try {
    const employee = await Employees.findOne({
      employeeCode: req.body.employeeCode,
    });
    const attendance = await Attendance.findAll({
      where: {
        employeeCode: req.body.employeeCode,
      },
    });

    const parseTime = (timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      return new Date(0, 0, 0, hours, minutes);
    };

    const formatTime = (date) => {
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const calculateDuration = (start, end) => {
      const duration = new Date(end - start);
      return formatTime(duration);
    };

    const timeStringToSeconds = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };

    const secondsToTimeString = (seconds) => {
      const hours = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      return `${hours}:${minutes}:${secs}`;
    };
    let presentDays = 0;
    let absentDays = 0;
    let lateDays = 0;
    let totalTimeLogSeconds = 0;
    let totalWorkLogSeconds = 0;
    let totaloutLogSeconds = 0;
    const data = attendance.map((attendanceData) => {
      const punchTimes = attendanceData.dataValues.punchRecords
        .split(" ")
        .map((record) => {
          const [time, action] = record.split(":").slice(0, 2);
          return { time, action };
        });

      let breaks = [];
      for (let i = 0; i < punchTimes.length - 1; i += 2) {
        const timeIn = `${punchTimes[i].time}:${punchTimes[i].action}`;
        const timeOut = `${punchTimes[i + 1].time}:${punchTimes[i + 1].action}`;
        const workHrs = calculateDuration(
          parseTime(timeIn),
          parseTime(timeOut)
        );
        const outHrs =
          i + 2 < punchTimes.length
            ? calculateDuration(
                parseTime(timeOut),
                parseTime(
                  `${punchTimes[i + 2].time}:${punchTimes[i + 2].action}`
                )
              )
            : "00:00";

        breaks.push({
          TimeIn: timeIn,
          TimeOut: timeOut,
          OutHrs: outHrs,
          WorkHrs: workHrs,
        });
      }

      let timeLog = calculateDuration(
        parseTime(attendanceData.dataValues.inTime),
        parseTime(attendanceData.dataValues.outTime)
      );

      // calculate presentDays and absentDays
      if (attendanceData?.dataValues?.status === "Present") {
        presentDays++;
        totalTimeLogSeconds += timeStringToSeconds(`${timeLog || "00:00"}:00`);
        totalWorkLogSeconds += timeStringToSeconds(
          attendanceData?.dataValues?.inDuration || "00:00:00"
        );
        totaloutLogSeconds += timeStringToSeconds(
          attendanceData?.dataValues?.outDuration || "00:00:00"
        );
        attendanceData?.lateBy !== "00:00:00" ? lateDays++ : null;
      } else if (attendanceData?.dataValues?.status === "Absent") {
        absentDays++;
      }
      return {
        Date: attendanceData.dataValues.date,
        FirstInTime: attendanceData.dataValues.inTime,
        LastOutTime: attendanceData.dataValues.outTime,
        TotalOutHours: attendanceData.dataValues.outDuration,
        TimeLog: calculateDuration(
          parseTime(attendanceData.dataValues.inTime),
          parseTime(attendanceData.dataValues.outTime)
        ),
        WorkLog: attendanceData.inDuration,
        DifferenceTLWL: "00:00",
        BreakDetails: breaks,
      };
    });

    const avgTimeLog =
      presentDays > 0
        ? secondsToTimeString(totalTimeLogSeconds / presentDays)
        : "00:00:00";
    const totalHours =
      presentDays > 0 ? secondsToTimeString(totalTimeLogSeconds) : "00:00:00";
    const avgWorkLog =
      presentDays > 0
        ? secondsToTimeString(totalWorkLogSeconds / presentDays)
        : "00:00:00";
    const outHours =
      presentDays > 0 ? secondsToTimeString(totaloutLogSeconds) : "00:00:00";
    let employeeAvgLog = {
      EmployeeCode: employee.employeeCode,
      Name: `${employee.firstName} ${employee.middleName} ${employee.lastName}`,
      Hours: totalHours,
      PDays: presentDays.toString().padStart(2, "0"),
      ADays: absentDays.toString().padStart(2, "0"),
      LDays: "00",
      HalfLeaves: "00",
      LateDays: lateDays.toString().padStart(2, "0"),
      AvgTimeLog: avgTimeLog,
      AvgWorkLog: avgWorkLog,
      DifferenceTLWL: "00:00",
      OutHours: outHours,
      employeeDailyLog: data,
    };

    return res.status(statusCode.success).send(
      successResponseFunc(
        `get All employee attendance`,
        statusCode.success,
        constants.SUCCESS,
        employeeAvgLog
      )
    );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered error while syncing the get All Attendance table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res.status(statusCode.internalServerError).send(
      errorResponseFunc(
        "Encountered error while syncing the get All Attendance table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
  }
};

module.exports = { getAllAttendance };
