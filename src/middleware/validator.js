'use strict';

const serverError = require('../error-handlers/500.js');

module.exports = (req, res, next) => {
  let { name } = req.query;
  try {
    if(name) {
      res.status(200).send({
        name: name,
      });
    } else {
      serverError();
    }
  } catch (error) {
    next(error.message);
  }
};
