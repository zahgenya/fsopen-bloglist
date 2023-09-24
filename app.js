const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');
const morganLogger = require('./utils/morganLogger');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');

mongoose.set('strictQuery', false);

console.log('Connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(morganLogger(morganLogger.format, morganLogger.options));

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
