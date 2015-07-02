/*jshint esnext:true*/
var passport = require('koa-passport');
var co = require('co');
var crypt = require('./crypt');
var wrap = require('co-monk');
var log = require('log4js').getLogger("auth");

passport.serializeUser(function(user, done) {
  log.trace({
    'user': user
  }, "Serialization succesful");
  done(null, user._id);
});

passport.deserializeUser(function(req, id, done) {
  co(function*() {
    var users = wrap(req.mongo.get('users'));
    var user = yield users.findOne({
      _id: id
    });
    return user;
  }).then(function(user) {
    log.trace({
      'user': user
    }, "Succesfull deserialization");
    done(null, user);
  }, function(err) {
    log.error(err, 'Deserialization failed');
    done(err);
  });
});

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({passReqToCallback : true},function(req, username, password, done) {
  co(function*() {
    var users = wrap(req.mongo.get('users'));
    var user = yield users.findOne({
      'name': username
    });
    if (!user) {
      log.info({
        'username': username
      }, "User not found in database");
      done(null, false);
      throw new Error('Cannot find user with username ' + username);
    }
    var isSame = yield crypt.compare(password, user.password);
    if (!isSame) {
      log.info({
        'user': user
      }, "User entered wrong password");
      throw new Error('Can not verify user ' + username);
    }
    return user;
  }).then(function(user) {
    log.info({
      'user': user
    }, "Succesfull authentication");
    done(null, user);
  }, function(err) {
    log.error(err, 'Authentication failed');
    done(err);
  });
}));
