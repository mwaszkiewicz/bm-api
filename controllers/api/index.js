var router = require('express').Router();
//var token = require('../../token');

router.get('/', function(req, res) {
    res.json({
        message: 'API is available!'
    });
});
router.use(require('./auth'));
// router.use(require('./authentication'));
// router.use(function(req, res, next) {
//     token.validateToken(req, res, next);
// });
router.use(require('./budget'));
router.use(require('./transaction'));
router.use(require('./user'));

module.exports = router;
