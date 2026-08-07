const ERROR_CASES = {
  400: { code: 400, message: "Bad Request" },
  401: { code: 401, message: "Token expired. Please login again." },
  403: { code: 403, message: "Unauthorised, permission denied." },
  404: { code: 404, message: "Resource not found" },
  500: { code: 500, message: "Internal Server Error. Please try again later." },
  ERR_NETWORK: {
    code: null,
    message: "Network error. Please try again later.",
  },
  default: {
    code: null,
    message: "Oops, something went wrong. Please try again later.",
  },
};

const getErrorDetails = (error) => {
  if (error.request) {
    return (
      ERROR_CASES[error.code] ??
      ERROR_CASES[error.status] ??
      ERROR_CASES.default
    );
  }

  return ERROR_CASES[error.status] ?? ERROR_CASES.default;
};

export { getErrorDetails };
