var bodyParser = require('body-parser')
var router = require('express').Router()

router.use(bodyParser.json())
router.use('/api', require('./api'))

module.exports = router
