var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var morgan = require('morgan');
var config = require('./_config');

var port = process.env.PORT || 3000;

var app = express();

app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));
app.set('key', config.secret);
app.use(require('./controllers'));



app.listen(port, () => {
    console.log('Application using port %d', port);
});

module.exports = app;
