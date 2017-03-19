var jwt = require('jsonwebtoken');

var token = {};

token.validateToken = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

token.hashPassword = function(user) {
    if (user.password) {
        user.password = bcrypt.hashSync(user.password);
    }
};

token.comparePassword = function(password, user) {
    return bcrypt.compareSync(password, user.password);
};

token.createToken = function(user, key) {
    return jwt.sign(user, key, {
        expiresIn: 60 * 60
    });
}

module.exports = token;
