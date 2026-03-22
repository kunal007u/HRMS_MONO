const jwt = require("jsonwebtoken");
require("dotenv").config();
const logger = require("../services/loggerService");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const {
  statusCode,
  tokenBlackList,
  constants,
  errorResponseFunc,
  models,
} = require("../utils/utilsIndex");
const { Employees } = models;
const multer = require("multer");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      logger.warn(
        errorResponseFunc(
          "No token provided.",
          "No token provided.",
          statusCode.unauthorized,
          constants.UNAUTHORIZED
        )
      );
      return res.status(statusCode.unauthorized).send(
        errorResponseFunc(
          "No token provided.",
          "No token provided.",
          statusCode.unauthorized,
          constants.UNAUTHORIZED
        )
      );
    } else {
      if (tokenBlackList.includes(token)) {
        logger.warn(
          errorResponseFunc(
            "Please log in again.",
            "Please log in again.",
            statusCode.unauthorized,
            constants.UNAUTHORIZED
          )
        );
        return res.status(statusCode.unauthorized).send(
          errorResponseFunc(
            "Please log in again.",
            "Please log in again.",
            statusCode.unauthorized,
            constants.UNAUTHORIZED
          )
        );
      } else {
        jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
          if (err) {
            logger.warn(
              errorResponseFunc(
                "Invalid token.",
                "Invalid token.",
                statusCode.unauthorized,
                constants.UNAUTHORIZED
              )
            );
            return res.status(statusCode.unauthorized).send(
              errorResponseFunc(
                "Invalid token.",
                "Invalid token.",
                statusCode.unauthorized,
                constants.UNAUTHORIZED
              )
            );
          } else {
            req.loggersId = decoded.id;
            req.roleId = decoded.roleId;
            req.roleName = decoded.role;
            req.name = decoded.name

            const user = await Employees.findOne({ where: { id: decoded.id } });
            if ( !user || user.sessionId !== decoded.sessionId) {
              logger.warn(
                errorResponseFunc(
                  "Invalid session.",
                  "Invalid session.",
                  statusCode.unauthorized,
                  constants.UNAUTHORIZED
                )
              );
              return res.status(statusCode.unauthorized).send(
                errorResponseFunc(
                  "Invalid session.",
                  "Invalid session.",
                  statusCode.unauthorized,
                  constants.UNAUTHORIZED
                )
              );
            } else if (!decoded.roleId) {
              logger.warn(
                errorResponseFunc(
                  "Invalid token.",
                  "Invalid token.",
                  statusCode.unauthorized,
                  constants.UNAUTHORIZED
                )
              );
              return res.status(statusCode.unauthorized).send(
                errorResponseFunc(
                  "Invalid token.",
                  "Invalid token.",
                  statusCode.unauthorized,
                  constants.UNAUTHORIZED
                )
              );
            } else {
              next();
            }
          }
        });
      }
    }
  } catch (err) {
    logger.error(
      errorResponseFunc(
        "Encountered some error while verifying the token.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
    return res.status(statusCode.internalServerError).send(
      errorResponseFunc(
        "Encountered some error while verifying the token.",
        err.toString(),
        statusCode.internalServerError,
        constants.ERROR
      )
    );
  }
};

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large' });
    }
    // Handle other Multer errors
    return res.status(400).json({ message: err.message });
  }
  next(err); // Pass the error to the next middleware
};


module.exports = { verifyToken, multerErrorHandler };
