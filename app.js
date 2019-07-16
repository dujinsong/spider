var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routeScanner = require('./routes/route');

var app = express();

// 设置页面存放位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 设置静态文件存放位置
app.use(express.static(path.join(__dirname, 'public')));

// 加载路由
routeScanner(app);

// 捕捉404异常
app.use(function(req, res, next) {
  next(createError(404));
});

// 捕捉异常
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
