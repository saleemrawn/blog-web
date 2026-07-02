const ERROR_CASES = {
  400: { code: 400, message: "Bad Request" },
  401: { code: 401, message: "Token expired. Please login again." },
  403: { code: 403, message: "Unauthorised, permission denied." },
  404: { code: 404, message: "Resource not found" },
  500: { code: 500, message: "Internal Server Error." },
  default: {
    code: "",
    message: "Oops, something went wrong. Please try again later.",
  },
};

const getErrorDetails = (error) => {
  return ERROR_CASES[error.status];
};

export { getErrorDetails };
