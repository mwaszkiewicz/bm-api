var db = require('../db');
require('mongoose-double')(db);

var SchemaTypes = mongoose.Schema.Types;

//ToDo will be implememented in future.
var Report = db.model('Report', {
    from: {
        type: Date
    },
    to: {
        type: Date
    }
});
module.exports = Report;
