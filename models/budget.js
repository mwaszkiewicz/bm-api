var db = require('../db');
require('mongoose-double')(db);

var SchemaTypes = db.Schema.Types;

var Budget = db.model('Budget', {
    currentState: {
        type: SchemaTypes.Double,
        required: true
    },
    lastModification: {
        type: Date
    },
    previousState: {
        type: SchemaTypes.Double
    },
    previousModification: {
        type: Date
    }
});
module.exports = Budget;
