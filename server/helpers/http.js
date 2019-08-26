module.exports = {
  httpResponse: (res, responseObject) => {
    const { statusCode, success, message, ...data } = responseObject;
    return res.status(statusCode).json({ success, message, ...data });
  },

  serverError: (res, error) => {
    const { message } = error;
    return res.status(statusCode).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Oops! An error occured.' : message });
  },
};
