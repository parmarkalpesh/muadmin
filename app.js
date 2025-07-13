var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileupload = require('express-fileupload');
require('dotenv').config(); 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ✅ MongoDB Atlas Connection using Mongoose
var mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
mongoose.connect(process.env.ATLAS_URL)
.then(() => {
  console.log("✅ Connected To MongoDB Atlas");
  console.log("🌐 Visit: http://127.0.0.1:3000");
})
.catch(err => {
  console.log("❌ Not able to connect to MongoDB Atlas:", err.message);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
