const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.set('views', path.join(__dirname, '/dist/auth'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
mongoose.Promise = require('bluebird');
const api = require('./routes/api');

mongoose.connect('mongodb://localhost/mean-angular5', { promiseLibrary: require('bluebird') })
    .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist/auth')));

app.use('/api', api);
app.get('*', function (req, res) {
    res.render("index.html");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;