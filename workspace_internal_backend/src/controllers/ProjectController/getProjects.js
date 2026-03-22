const { Sequelize } = require("../LeaveRequestController/leaveRequestPackageCentral");
const {
  statusCode,
  constants,
  logger,
  errorResponseFunc,
  successResponseFunc,
  responseMessage,
  Projects,
  Employees,
} = require("./projectPackageCentral");

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "ProjectId is required",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }

    const project = await Projects.findOne({ id: projectId });
    if (!project) {
      return res
        .status(statusCode.notFound)
        .send(
          errorResponseFunc(
            "Project Not Found",
            responseMessage.notFound,
            statusCode.notFound,
            constants.NOTFOUND
          )
        );
    }
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          "Successfully get Project",
          statusCode.success,
          constants.SUCCESS,
          project
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

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.findAll({
      include: [
        {
          model: Employees,
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "projectName",
        [Sequelize.col("employee.id"), "managerId"],
        [
          Sequelize.literal(
            'CONCAT("employee"."firstName", \' \', "employee"."lastName")'
          ),
          "projectManager",
        ],
        "startDate",
        "endDate",
        "description",
      ],
      order: [["projectName", "ASC"]],
    });
    return res
      .status(statusCode.success)
      .send(
        successResponseFunc(
          `Projects get successfully`,
          statusCode.success,
          constants.SUCCESS,
          projects
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

module.exports = { getProjectById, getAllProjects };
