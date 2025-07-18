// ✅ Core dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
require('dotenv').config();

// ✅ MongoDB Connection
const mongoose = require('mongoose');

// ✅ Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected To MongoDB Atlas");
  console.log("🌐 Visit: http://127.0.0.1:3000");
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
});

// ✅ Initialize Express app
const app = express();

// ✅ View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ✅ Middlewares
app.use(logger('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Public folder for static files

// ✅ File upload middleware
app.use(fileUpload({
  createParentPath: true, // automatically create upload folder if not exists
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit (adjust as needed)
  abortOnLimit: true,
}));

// ✅ Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ✅ Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// ✅ Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  // Show detailed errors only in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
