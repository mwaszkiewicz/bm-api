var db = require('../db');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = db.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
    var user = this;
    if (!user.isModified('password')) {
        return callback();
    }

    //salt is generated because it is used to hash password
    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            return callback(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return callback(err);
            }
            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return cb(err)
        };
        cb(null, isMatch);
    });
};

module.exports = db.model('User', UserSchema);
