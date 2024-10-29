var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// var io = require('socket.io')(3001, { cors: { origin: 'http://localhost:3002', methods: ['GET', 'POST']}})

// io.on('connection', socket => {
//   socket.on('message', (message, roomName) => {
//     console.log(123, message, roomName)
//     if (roomName) {
//       io.to(roomName).emit('message', message);
//     } else {
//       socket.broadcast.emit('message', message)
//     }
//   })
//   socket.on('disconnect', () => console.log('Disconnected'))
//   socket.on('joinRoom', (roomName) => {
//     console.log(roomName);
//     socket.join(roomName)
//   })
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
