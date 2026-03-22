const {
  statusCode,
  constants,
  successResponseFunc,
  errorResponseFunc,
  unlinkFiles,
  logger,
  path,
  Attendance,
  fs,
  csv,
} = require("./attendancePackageCentral");

const addEmployeeAttendance = async (req, res) => {
  try {
    const { files = [] } = req;
    if (files.length === 0) {
      unlinkFiles(req.files || files);
      logger.warn(
        errorResponseFunc(
          "There is no request body.",
          "No request body.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res.status(statusCode.badRequest).send(
        errorResponseFunc(
          "There is no request body.",
          "No request body.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
    } else if (files.length > 1) {
      unlinkFiles(req.files || files);
      const errorMessage =
        "Only one file is allowed. Multiple files were uploaded.";
      logger.warn(
        errorResponseFunc(
          errorMessage,
          "Multiple files uploaded.",
          statusCode.badRequest,
          constants.BADREQUEST
        )
      );
      return res
        .status(statusCode.badRequest)
        .send(
          errorResponseFunc(
            errorMessage,
            "Multiple files uploaded.",
            statusCode.badRequest,
            constants.BADREQUEST
          )
        );
    } else {
      const results = [];
      const cleanKey = (key) => key.trim().replace(/\s+/g, " ");
      fs.createReadStream(files[0].path)
        .pipe(csv())
        .on("data", (data) => {
          const cleanedData = {};
          for (const key in data) {
            cleanedData[cleanKey(key)] = data[key];
          }
          results.push(cleanedData);
        })
        .on("end", () => {
          results.map((data) => {
            const punchRecords = data["Punch Records"].trim().split(" ");
            let inDuration = 0;
            let outDuration = 0;

            for (let i = 0; i < punchRecords.length - 1; i++) {
              const time1 = punchRecords[i].match(/(\d{2}:\d{2})/)[1];
              const action1 = punchRecords[i]
                .split(time1)[1]
                .trim()
                .slice(1, -1); // Extract action

              const time2 = punchRecords[i + 1].match(/(\d{2}:\d{2})/)[1];
              const action2 = punchRecords[i + 1]
                .split(time2)[1]
                .trim()
                .slice(1, -1); // Extract action

              if (time1 && action1 && time2 && action2) {
                const date1 = new Date(`1970-01-01T${time1}:00Z`);
                const date2 = new Date(`1970-01-01T${time2}:00Z`);
                const duration = (date2 - date1) / 1000 / 60; 
                if (action1.includes("in") && action2.includes("out")) {
                  inDuration += duration;
                } else if (action1.includes("out") && action2.includes("in")) {
                  outDuration += duration;
                }
              } else {
                console.error(
                  "Error parsing punch record:",
                  punchRecords[i],
                  punchRecords[i + 1]
                );
              }
            }

            const formatDuration = (minutes) => {
              const hours = Math.floor(minutes / 60);
              const mins = minutes % 60;
              return `${hours}:${mins.toString().padStart(2, "0")}:00`;
            };

            let payload = {
              date: data.Date.trim(),
              employeeCode: data["Employee Code"].trim(),
              employeeName: data["Employee Name"].trim(),
              department: data.Department.trim(),
              inTime: data["In Time"].trim(),
              outTime: data["Out Time"].trim(),
              inDuration: formatDuration(inDuration),
              outDuration: formatDuration(outDuration),
              lateBy: data["Late By"].trim(),
              earlyBy: data["Early By"].trim(),
              status: data.Status.trim(),
              punchRecords: data["Punch Records"].trim(),
              overtime: data.Overtime.trim(),
              isActive: constants.ACTIVE,
            };

            Attendance.create(payload)
          });
        });
      return res.status(statusCode.success).send(
        successResponseFunc(
          `Employee attendance create successfully`,
          statusCode.success,
          constants.SUCCESS
        )
      );
    }
  } catch (err) {
    unlinkFiles(req.files || files);
    logger.error(
      errorResponseFunc(
        "Encountered error while syncing the attendance table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res.status(statusCode.internalServerError).send(
      errorResponseFunc(
        "Encountered error while syncing the attendance table.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
  }
};

module.exports = { addEmployeeAttendance };
