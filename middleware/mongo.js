var monk = require('monk');
var wrap = require('co-monk');
var debug = require('debug')('middleware-mongo');

/**
 * Add mongo to context
 *
 * @param {String} url (optional)
 * @param {Object} opts (optional)
 * @api public
 */

module.exports = function (url, opts) {
  opts = opts || {};

  return function *mongo (next) {
    this.mongo = monk(url);

    this.use = function(collection){
      return wrap(this.mongo.get(collection));
    };
    yield next;
  }
}
