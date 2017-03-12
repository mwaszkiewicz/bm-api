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
UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password') || !user.isNew) {
        return next();
    }
    //salt is generated because it is used to hash password
    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
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
