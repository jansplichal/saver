var bcrypt = require('bcrypt');

/**
 * Safely encrypt password using bcrypt (https://en.wikipedia.org/wiki/Bcrypt)
 * Optionally specify number of rounds (by default 10)
 *
 * @param  {string} password  Password to encrypt
 * @param  {int}    rounds    Number of rounds, more rounds slow down the algorithm, defult 10
 * @return {Promise}          Promise with encrypted password
 */
function encrypt(password, rounds){
    rounds = rounds || 10;

    return new Promise(function(resolve, reject){
      bcrypt.hash(password, rounds, function(err, hash) {
          if(err){
              reject(err);
          }
          resolve(hash);
      });
    });
}

/**
 * Compare password with its bcrypt hash
 *
 * @param  {string} password  Password in plan text
 * @param  {string} hash      Password's hash
 * @return {Promise}          Promise resolving to true|false
 */
function compare(password, hash){
  return new Promise(function(resolve, reject){
    bcrypt.compare(password, hash, function(err, isValid) {
      if(err){
          reject(err);
      }
      resolve(isValid);
    });
  });
}

module.exports = {
  encrypt: encrypt,
  compare: compare
}
