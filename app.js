const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('express-handlebars')
const cronjob = require('./public/javascripts/functions/cronjob.js');

const indexRouter = require('./routes/index');
const serverRouter = require('./routes/server'); 
const stocksRouter = require('./routes/stocks');
const clanRouter = require('./routes/clan');
const mailRouter = require('./routes/mail');

const app = express();

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
