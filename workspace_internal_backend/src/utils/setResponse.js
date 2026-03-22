const errorResponseFunc = (message, error = null, code, type) => {
  const finalResponse = {
    status: {
      message: message,
      error: error,
      code: code,
      type: type,
    },
  };

  return finalResponse;
};

const successResponseFunc = (message, code, type, data = null) => {
  const finalResponse = {
    status: {
      message: message,
      code: code,
      type: type,
    },
    data,
  };

  return finalResponse;
};

module.exports = { errorResponseFunc, successResponseFunc };
