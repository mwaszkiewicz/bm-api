var router = require('express').Router();
var token = require('./token');

router.use(require('./authentication'));
router.use(function(req, res, next) {
    token.validateToken(req, res, next);
});

module.exports = router;
