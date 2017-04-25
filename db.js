var mongoose = require('mongoose');
var config = require('./_config');
var express = require('express');

var app = express();

var env = config.mongoURI[app.settings.env];

console.log('Trying to connect to ' +'## '+ env +' ##'+ ' MongoDB database');

mongoose.connect(env, function(err, res) {
    if (err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + env);
    }
});

module.exports = mongoose;
