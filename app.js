var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars')
var cronjob = require('./public/javascripts/functions/cronjob.js');

var indexRouter = require('./routes/index');
var serverRouter = require('./routes/server'); 
var stocksRouter = require('./routes/stocks');
var clanRouter = require('./routes/clan');
var mailRouter = require('./routes/mail');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({secret: 'sessionsecretkey', resave: false, saveUninitialized: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({secret: "secret", saveUninitialized: false, resave: false}));

app.use('/', indexRouter);
app.use('/server', serverRouter);
app.use('/stocks', stocksRouter);
app.use('/clan', clanRouter);
app.use('/mail', mailRouter);

cronjob();

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
