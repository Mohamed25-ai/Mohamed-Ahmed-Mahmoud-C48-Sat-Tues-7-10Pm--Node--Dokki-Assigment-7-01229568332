export const globalErrorHandling = (error, req, res, next) => {
  return res.status(error.cause?.status ?? 500).json({
    message: error.message ?? "Internal server error",
    error,
    stack: error.stack,
  });
};
