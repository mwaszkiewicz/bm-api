var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(require('./controllers'));

app.listen(3000, function() {
    console.log('Application using port %d', 3000);
});

module.exports = app;
