var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var morgan = require('morgan');
var config = require('./_config');
var appmetrics = require('appmetrics');
var chalk = require('chalk');

var port = process.env.PORT || 3000;

var app = express();

app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));
app.set('key', config.secret);
app.use(require('./controllers'));

var monitoring = appmetrics.monitor();
monitoring.on('initialized', function (env) {
    console.log(chalk.yellow('[appmetric] init'));
});
monitoring.on('http', function (data) {
    console.log(chalk.yellow('[appmetric] duration='+data.duration+' ms url='+data.url));
});
monitoring.on('mongo', function (data) {
    console.log(chalk.yellow('[appmetric] duration='+data.duration+' ms query='+JSON.stringify(data.query)));
});
monitoring.on('cpu', function (cpu) {
    console.log('[' + new Date(cpu.time) + '] CPU: ' + cpu.process);
});
monitoring.on('request', function (data) {
    console.log(chalk.yellow('[appmetric] duration='+data.duration+' ms url='+data.request));
});

app.listen(port, () => {
    console.log('Application using port %d', port);
});

module.exports = app;
