export default {
  httpResponse: (res, responseObject) => {
    const { statusCode, status, message, ...data } = responseObject;
    return res.status(statusCode).json({ status, message, ...data });
  },

  serverError: (res, error) => {
    const { message } = error;
    const isProd = process.env.NODE_ENV === 'production';
    return res
      .status(error.status || 500)
      .json({ status: 'failure', message: isProd ? 'Oops! An error occured.' : message });
  },
};
