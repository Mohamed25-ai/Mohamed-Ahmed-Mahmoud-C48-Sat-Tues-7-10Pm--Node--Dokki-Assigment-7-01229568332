export const successResponse = async ({
  res,
  status = 200,
  data = undefined,
  message = "done",
} = {}) => {
  return res.status(status).json({ message, status, data });
};
