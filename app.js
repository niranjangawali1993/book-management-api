var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expvalidator = require('express-validator');
const cors = require('cors');

var booksRouter = require('./routes/books');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(expvalidator());

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV == 'development' ? err : null;

  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => {
  return res.send('Hello World !!!');
});

app.use('/book', booksRouter);

module.exports = app;
