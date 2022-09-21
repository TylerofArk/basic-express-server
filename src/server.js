'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const validator = require('./middleware/validator');
const logger = require('./middleware/logger.js');


app.use(logger);
app.get('/user', validator);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World');
});

app.get('/bad', (req, res, next) => {
  next('this is a bad route');
});


app.use('*', notFound);

app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start };
