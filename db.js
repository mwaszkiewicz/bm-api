var mongoose = require('mongoose');
var config = require('../config/_config');
var express = require('express');

var app = express();

mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
    if (err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
    }
});

module.exports = mongoose;
