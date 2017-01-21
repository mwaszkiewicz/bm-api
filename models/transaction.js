var db = require('../db');
require('mongoose-double')(db);

var SchemaTypes = db.Schema.Types;

var Transaction = db.model('Transaction', {
    amount: {
        type: SchemaTypes.Double,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});
module.exports = Transaction;
