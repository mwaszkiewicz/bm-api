var User = require('../../../models/user');
var router = require('express').Router();
var token = require('./token');

router.post('/register', register);
router.post('/login', login);

function login(req, res, next) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        }
        user.verifyPassword(req.body.password, function(err, isMatch) {
            if (err) {
                return next(err);
            }
            if (!isMatch) {
                return next(null, false);
            }
            var newToken = token.createToken(user, req.app.get('key'));
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: newToken
            });
        });
    });
};

function register(req, res, next) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    user.save(function(err, user) {
        if (err) {
            return next(err);
        }
        res.json(201, user);
    });
};

module.exports = router;
