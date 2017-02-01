var db = require('../db');
require('mongoose-double')(db);

var SchemaTypes = db.Schema.Types;

var Budget = db.model('Budget', {
    state: {
        type: SchemaTypes.Double,
        required: true
    },
    date: {
        type: Date
    }
});
module.exports = Budget;
