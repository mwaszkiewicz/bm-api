var Budget = require('../../models/budget');
var router = require('express').Router();

router.get('/budget', getCurrentBudget);
router.get('/budget/:from/:to', getBudgetByDateRange);
router.get('/budgets', getAllBudgets);
router.get('/budget/:id', getBudgetById);
router.post('/budget', addBudget);
router.put('/budget/:id', updateBudget);
router.delete('/budget/:id', deleteBudget);


function getCurrentBudget(req, res, next) {
    Budget.findOne()
        .sort({
            date: -1
        })
        .exec(function(err, budget) {
            if (err) {
                return next(err);
            }
            res.json(budget);
        });
};

function getBudgetByDateRange(req, res, next) {
    var from = new Date(req.params.from);
    var to = new Date(req.params.to);
    console.log('from:' + from);
    console.log('to' + to);
    Budget.find({
            'date': {
                '$gte': from,
                '$lt': to
            }
        }).sort('date')
        .exec(function(err, transaction) {
            if (err) {
                return next(err);
            }
            res.json(transaction);
        });
};

function getAllBudgets(req, res, next) {
    Budget.find()
        .sort('-date')
        .exec(function(err, budget) {
            if (err) {
                return next(err);
            }
            res.json(budget);
        });
};

function getBudgetById(req, res, next) {
    Budget.findById(req.params.id, function(err, transaction) {
        if (err) {
            return next(err);
        }
        res.json(transaction);
    });
};

function addBudget(req, res, next) {
    var budget = new Budget({
        state: req.body.state,
        date: req.body.date,
    });
    budget.save(function(err, budget) {
        if (err) {
            return next(err);
        }
        res.json(201, budget);
    });
};

function updateBudget(req, res, next) {
    Budget.findById(req.params.id, function(err, budget) {
        budget.state = req.body.state;
        budget.date = req.body.date;

        budget.save(function(err, budget) {
            if (err) {
                return next(err);
            }
            res.json(200, budget);
        });
    });
};

function deleteBudget(req, res, next) {
    Budget.findById(req.params.id, function(err, budget) {
        if (err) {
            return next(err);
        } else {
            budget.remove(function(err) {
                if (err) {
                    return next(err);
                } else {
                    res.json(200, 'Removed');
                }
            });
        }
    });
};

module.exports = router;
