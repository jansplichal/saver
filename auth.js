var passport = require('koa-passport');
var debug = require('debug')('saver:passport');

var user = {
  id: 1,
  role: 'admin',
  username: 'test'
};

passport.serializeUser(function(user, done) {
  debug('Serialize',user);
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  debug('Deserialize', id);
  done(null, user);
})

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
  debug('Test password for user:',username);
  if (username === 'test' && password === 'test') {
    done(null, user);
  } else {
    done(null, false);
  }
}))
