var User = require('../../models/user');
var router = require('express').Router();

router.get('/users', getUsers);
router.post('/users', addUsers);

function getUsers(req, res, next) {
    User.find()
        .exec(function(err, users) {
            if (err) {
                return next(err);
            }
            res.json(users);
        });
};

function addUsers(req, res, next) {
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
