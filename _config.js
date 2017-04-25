
var env = process.env.NODE_ENV;

console.log('Node environment: ' + env);
switch (env) {
  case 'staging':
    module.exports = require('./config/staging');
    break;
  case 'development':
    module.exports = require('./config/development');
    break;
  case 'test':
    module.exports = require('./config/test');
    break;
  default:
    console.error("Unrecognized NODE_ENV: " + env);
    process.exit(1);
}