var passport = require('koa-passport');

var user = {
  id: 1,
  role: 'admin',
  username: 'test'
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done) {
  done(null, user);
})

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {

  if (username === 'test' && password === 'test') {
    done(null, user);
  } else {
    done(null, false);
  }
}))