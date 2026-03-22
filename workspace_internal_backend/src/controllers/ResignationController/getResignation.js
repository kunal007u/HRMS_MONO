const {
  statusCode,
  constants,
  errorResponseFunc,
  successResponseFunc,
  logger,
  Resignation,
  Employees,
  Sequelize} = require("./ResignationPackageCentral");
  
const getAllResignation = (req, res) => {
  try {
    Resignation.findAll({
      include: [
        {
          model: Employees,
          as: "employee",
          attributes: [],
        },
        {
          model: Employees,
          as: "modifier",
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "description",
        "acceptedDate",
        "status",
        "remark",
        "createdAt",
        [Sequelize.fn('CONCAT', Sequelize.col('employee.firstName'), ' ', Sequelize.col('employee.lastName')), 'employeeFullName'],
        [Sequelize.fn('CONCAT', Sequelize.col('modifier.firstName'), ' ', Sequelize.col('modifier.lastName')), 'modifierFullName'],
      ],
      order : [["createdAt","DESC"]]
    })
      .then((data) => {
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Here is the Resignation's data.",
              statusCode.success,
              constants.SUCCESS,
              data
            )
          );
      })
      .catch((err) => {
        logger.error(
          errorResponseFunc(
            "Encountered error after checking if this exists.",
            err.toString(),
            statusCode.internalServerError,
            constants.ERROR
          )
        );
        return res
          .status(statusCode.internalServerError)
          .send(
            errorResponseFunc(
              "Encountered error after checking if this exists.",
              err.toString(),
              statusCode.internalServerError,
              constants.ERROR
            )
          );
      });
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

const getByIdResignation = (req, res) => {
  try {
    const  employeeId = req.loggersId;

    Resignation.findAll({
      where:{
        employeeId: employeeId
      },
      include: [
        {
          model: Employees,
          as: "modifier",
          attributes: [],
        },
      ],
      attributes: [
        "id",
        "description",
        "acceptedDate",
        "status",
        "remark",
        "createdAt",
        [Sequelize.fn('CONCAT', Sequelize.col('modifier.firstName'), ' ', Sequelize.col('modifier.lastName')), 'modifierFullName'],
      ],
    })
      .then((data) => {
        return res
          .status(statusCode.success)
          .send(
            successResponseFunc(
              "Here is the Resignation's data.",
              statusCode.success,
              constants.SUCCESS,
              data
            )
          );
      })
      .catch((err) => {
        logger.error(
          errorResponseFunc(
            "Encountered error after checking if this exists.",
            err.toString(),
            statusCode.internalServerError,
            constants.ERROR
          )
        );
        return res
          .status(statusCode.internalServerError)
          .send(
            errorResponseFunc(
              "Encountered error after checking if this exists.",
              err.toString(),
              statusCode.internalServerError,
              constants.ERROR
            )
          );
      });
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
  getAllResignation,
  getByIdResignation
};
