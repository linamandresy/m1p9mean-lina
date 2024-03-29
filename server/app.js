var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var fileupload = require("express-fileupload");

var indexRouter = require('./routes/index');
var restoApiRouter = require("./routes/resto_api");
var mealApiRouter = require("./routes/meal_api");
var uploaderApi = require("./routes/uploader_api");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/app')));
app.use(cors());
app.use(fileupload({
	limits:{
		fileSize: 50 * 1024 * 1024
	}
}))

app.use("/api/resto",restoApiRouter);
app.use('/api/meal',mealApiRouter);
app.use('/api/file-upload',uploaderApi);
app.use('/**', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
