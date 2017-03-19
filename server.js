var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var morgan = require('morgan');
var config = require('./_config');

var app = express();

app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));
app.set('superSecret', config.secret);
app.use(require('./controllers'));



app.listen(3000, function() {
    console.log('Application using port %d', 3000);
});

module.exports = app;
