var Budget = require('../../models/budget');
var router = require('express').Router();

router.get('/budget', function(req, res, next) {
    Budget.find()
        .sort('-date')
        .exec(function(err, budget) {
            if (err) {
                return next(err);
            }
            res.json(budget);
        });
});

router.post('/budget', function(req, res, next) {
    //todo zanim save trzeba pobrac currentState i przypisac do previosu state
    var currentState = 0; //todo trzeba pobrac ta wartosc
    console.log(req.body);
    var budget = new Budget({
        currentState: req.body.amount,
        lastModification: req.body.date
    });
    budget.save(function(err, budget) {
        if (err) {
            return next(err);
        }
        res.json(201, budget);
    });
});

module.exports = router;
