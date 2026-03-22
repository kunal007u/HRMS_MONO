const {
  statusCode,
  constants,
  LeaveRequest,
  errorResponseFunc,
  successResponseFunc,
  Employees,
  logger,
  Sequelize,
  Op,
  LeaveBalance,
  moment,
  LeaveInfo,
  AWS_URL,
} = require("./leaveRequestPackageCentral");

const getAllLeaveRequest = async (req, res) => {
  try {
    const allowedOrderByFields = ['createdAt', 'startDate', 'endDate'];
    let { search, status, startDate, endDate, limit = 10, offset = 0, order = 'DESC', orderBy = 'createdAt' } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);

    orderBy = allowedOrderByFields.includes(orderBy) ? orderBy : 'createdAt';
    order = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const leaveRequestWhereClause = {
      ...(status && { status }),
      isActive: true,
      ...(startDate && endDate && startDate === endDate
        ? {
          startDate: {
            [Op.lte]: startDate,
          },
          endDate: {
            [Op.gte]: endDate,
          },
        }
        : {
          ...(startDate && {
            startDate: {
              [Op.gte]: startDate,
            },
          }),
          ...(endDate && {
            endDate: {
              [Op.lte]: endDate,
            },
          }),
        }),
    };

    const employeeWhereClause = search
      ? {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${search}%` } },
            { lastName: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const leaveRequests = await LeaveRequest.findAndCountAll({
      where: leaveRequestWhereClause,
      distinct: true,
      attributes: [
        "id",
        "startDate",
        "endDate",
        "numberOfDays",
        "reason",
        "approvedBy",
        "status",
        "remark",
        "employeeId",
        "createdAt",
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM "leaveInfos" WHERE "leaveInfos"."leaveId" = "leaveRequests"."id" AND "leaveInfos"."workingShift" = \'Half Day\')'
          ),
          "halfLeaveDays",
        ],
      ],
      include: [
        {
          model: Employees,
          where: employeeWhereClause,
          attributes: [
            "id",
            [
              Sequelize.literal(
                'CONCAT("employee"."firstName", \' \',"employee"."lastName")'
              ),
              "fullName",
            ],
            [
              Sequelize.literal(`'${AWS_URL}/' || "employee"."profilePicture"`),
              "profilePicture",
            ],
          ],
        },
        {
          model: Employees,
          as: "approver",
          attributes: [
            [
              Sequelize.literal('CONCAT("approver"."firstName", \' \',"approver"."lastName")'),
              "approverFullName",
            ],
          ],
        },
        {
          model: LeaveInfo,
          attributes: [
            "id",
            "date",
            ["workingShift", "selectedDuration"],
            "leaveId",
          ],
          order: [["date", "ASC"]],
        },
      ],
      order: [[orderBy, order]],
      limit,
      offset,
    });

    leaveRequests.rows.forEach((leaveRequest) => {
      leaveRequest.leaveInfos.sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    const totalLeaveRequestCount = leaveRequests.count;

    let date = new Date();
    const leaveRequestData = await LeaveRequest.findAll({
      where: {
        status: constants.APPROVED,
        startDate: {
          [Op.lte]: date,
        },
        endDate: {
          [Op.gte]: date,
        },
      },
      attributes: ["employeeId"],
    });

    const totalPendingLeaves = await LeaveRequest.count({
      where: {
        status: constants.PENDING,
      },
    });

    const uniqueEmployeeIds = [
      ...new Set(leaveRequestData.map((leave) => leave.employeeId)),
    ];

    const todayPresents = await Employees.count({
      where: {
        id: {
          [Op.notIn]: uniqueEmployeeIds,
        },
      },
    });

    const totalEmployees = await Employees.count();

    const data = {
      todayPresents: `${todayPresents}/${totalEmployees}`,
      totalPendingLeaves,
      count: totalLeaveRequestCount,
      rows: leaveRequests.rows.map((leave) => ({
        id: leave.id,
        fullName: leave.employee.dataValues.fullName,
        profilePicture: leave.employee.dataValues.profilePicture,
        startDate: leave.startDate,
        endDate: leave.endDate,
        halfLeaveDays: Number(leave.dataValues.halfLeaveDays) || 0,
        numberOfDays: leave.numberOfDays,
        reason: leave.reason,
        status: leave.status,
        ...((leave.status === constants.REJECTED || leave.status === constants.CANCELLED) && {
          remark: leave.remark,
        }),
        employeeId: leave.employeeId,
        approvedBy: leave.approver ? leave.approver.dataValues.approverFullName : null,
        leaveInfos: leave.leaveInfos,
      })),
    };

    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Here is the Leave Request's data.",
          statusCode.success,
          constants.SUCCESS,
          data
        )
      );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered some error.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encountered some error.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

const getByIdLeaveRequest = async (req, res) => {
  try {
    let employeeId = req.loggersId;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();
    const leaveRequest = await LeaveRequest.findAndCountAll({
      distinct: true,
      where: {
        employeeId: employeeId,
      },
      include: [
        {
          model: LeaveInfo,
          attributes: [
            "id",
            "date",
            ["workingShift", "selectedDuration"],
            "leaveId",
            // "fromTime",
            // "toTime",
          ],
          order: [["date", "ASC"]],
        },
        {
          model: Employees,
          as: "approver",
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "startDate",
        "endDate",
        "halfLeaveDate",
        "numberOfDays",
        "reason",
        "status",
        "remark",
        "employeeId",
        // "leaveType",
        [
          Sequelize.literal(
            `(
              SELECT CONCAT("approver"."firstName", ' ', "approver"."lastName")
              FROM "employees" AS "approver"
              WHERE "leaveRequests"."approvedBy" = "approver"."id"
            )`
          ),
          "approverFullName",
        ],
        "createdAt",
      ],
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    })

        leaveRequest.rows.forEach((leaveRequest) => {
          leaveRequest.leaveInfos.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
        });
        let totalPaidLeave = await LeaveRequest.sum("paidLeave", {
          where: {
            employeeId: employeeId,
            createdAt: {
              [Op.between]: [startOfMonth, endOfMonth],
            },
          },
        });

        const totalLossOfPay = await LeaveRequest.sum("lossOfPay", {
          where: {
            employeeId: employeeId,
            createdAt: {
              [Op.between]: [startOfMonth, endOfMonth],
            },
          },
        });

        let leaveBalance = await LeaveBalance.findOne({
          where: {
            employeeId: employeeId,
          },
          attributes: {
            exclude: ["isActive", "createdAt", "updatedAt"],
          },
        });

        let data = {
          count: leaveRequest.count,
          rows: leaveRequest.rows
            .map((data) => {
              const halfLeaveDays = data.leaveInfos.filter(
                (info) => info.dataValues.selectedDuration === "Half Day"
              ).length;

              return {
                id: data.id,
                startDate: data.startDate,
                endDate: data.endDate,
                halfLeaveDays: halfLeaveDays,
                numberOfDays: data.numberOfDays,
                reason: data.reason,
                status: data.status,
                ...((data.status === constants.REJECTED || data.status === constants.CANCELLED) && {
                  remark: data.remark,
                }),
                // leaveType: data.leaveType,
                employeeId: data.employeeId,
                leaveInfos: data.leaveInfos,
                approvedBy: data?.dataValues?.approverFullName || null,
              };
            })
            .flat(),
          leaveDashboard: {
            id: leaveBalance.id,
            balance: leaveBalance.balance,
            employeeId: leaveBalance.employeeId,
            paidLeave: totalPaidLeave,
            lossOfPay: totalLossOfPay,
            totalLossOfPay: leaveBalance.lossOfPay,
            totalPaidLeave: leaveBalance.paidLeave,
          },
        };
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Here is the Leave Request's data.",
              statusCode.success,
              constants.SUCCESS,
              data
            )
          );
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered some error.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res
      .status(statusCode.internalServerError)
      .send(
        errorResponseFunc(
          "Encountered some error.",
          err.toString(),
          statusCode.internalServerError,
          constants.ERROR
        )
      );
  }
};

module.exports = {
  getAllLeaveRequest,
  getByIdLeaveRequest,
};