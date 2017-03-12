var config = {};

config.mongoURI = {
    development: 'mongodb://localhost/bm',
    test: 'mongodb://localhost/bm-test'
};

config.secret = 'secretKey';

module.exports = config;
