"use strict";


module.exports = (err, req, res, next) => {
  const statusCode = res.errorStatusCode || 500;

  // console.log(err);
  res.status(statusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
  });
};
