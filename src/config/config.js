var env = process.env.NODE_ENV || 'development'

var config = {
  development: require('../config/development.js'),
  staging: require('../config/staging.js'),
  production: require('../config/production.js'),
}

module.exports = config[env]