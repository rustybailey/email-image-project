var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var validator = expressValidator.validator;
var webpack = require('webpack');
var webpackMiddleware = require("webpack-dev-middleware");
var webpackConfig = require('./webpack.config.js');

var app = express();
var profileImage = require('./routes/profile-image.route');
require('dotenv').load();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(expressValidator({
  customValidators: {
    isDecodedEmail: function(value) {
      var email = decodeURIComponent(value);
      return validator.isEmail(email);
    }
  }
}));
if (env === 'development') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}
app.use(express.static(path.join(__dirname, 'public')));

app.use('/profile-image', profileImage);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ success: false, data: null, message: err.message });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({ success: false, data: null, message: err.message });
});

module.exports = app;
