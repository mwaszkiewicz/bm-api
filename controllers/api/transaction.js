var Transaction = require('../../models/transaction');
var router = require('express').Router();
var authController = require('./auth');

router.route('/transactions')
    .get(authController.isAuthenticated, getAllTransactions);



//router.get('/transactions', getAllTransactions);
// router.get('/transactions/:from/:to', getAllTransactionsByDateRange);
// router.get('/transactions/:type', getAllTransactionsByType);
// router.get('/transaction/:id', getTransactionById);
// router.post('/transaction', addTransaction);
// router.put('/transaction/:id', updateTransaction);
// router.delete('/transaction/:id', deleteTransaction);


function getAllTransactions(req, res, next) {
    Transaction.find()
        .sort('date')
        .exec(function(err, transaction) {
            if (err) {
                return next(err);
            }
            res.json(transaction);
        });
};

function getAllTransactionsByDateRange(req, res, next) {
    var from = new Date(req.params.from);
    var to = new Date(req.params.to);
    console.log('from:' + from);
    console.log('to' + to);
    Transaction.find({
            'date': {
                '$gte': from,
                '$lt': to
            }
        }).sort('date')
        .exec(function(err, transaction) {
            if (err) {
                //express error handling
                return next(err);
            }
            res.json(transaction);
        });
};

function getAllTransactionsByType(req, res, next) {
    var type = req.params.type;
    Transaction.find({
            'type': type
        })
        .sort('-date')
        .exec(function(err, transaction) {
            if (err) {
                return next(err);
            }
            res.json(transaction);
        });
};

function getTransactionById(req, res, next) {
    Transaction.findById(req.params.id, function(err, transaction) {
        if (err) {
            return next(err);
        }
        res.json(transaction);
    });
};

function addTransaction(req, res, next) {
    var transaction = new Transaction({
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type,
        description: req.body.description
    });
    transaction.save(function(err, transaction) {
        if (err) {
            return next(err);
        }
        res.json(201, transaction);
    });
};

function updateTransaction(req, res, next) {
    Transaction.findById(req.params.id, function(err, transaction) {
        transaction.amount = req.body.amount;
        transaction.date = req.body.date;
        transaction.type = req.body.type;
        transaction.description = req.body.description;

        transaction.save(function(err, transaction) {
            if (err) {
                return next(err);
            }
            res.json(200, transaction);
        });
    });
};

function deleteTransaction(req, res, next) {
    Transaction.findById(req.params.id, function(err, transaction) {
        if (err) {
            return next(err);
        } else {
            transaction.remove(function(err) {
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
