const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const logger = require('morgan');

dotenv.config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/loginroutes');
const subjectRouter = require('./routes/subjectroutes');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
// 세션을 사용하여 로그인 상태 유지
app.use(session({
  key: 'sid',
  resave: false, // 세션을 항상 저장할지
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  // 쿠키설정
  cookie: {
    httpOnly: true, // 웹 서버에서만 접근
    secure: false,
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간: 24시간
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', loginRouter);
app.use('/subject', subjectRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.statue = 404;
  next(error);
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('%d 번 포트에서 대기중', port);
});
