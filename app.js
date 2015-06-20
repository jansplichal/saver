/*jshint esnext:true*/
var http = require('http');
var koa = require('koa');
var logger = require('koa-logger');

//mongo
var monk = require('monk');
var wrap = require('co-monk');

var statics = require('koa-static');
var views = require('koa-views');
var koaBody = require('koa-body');
var koaValidate = require('koa-validate');

var app = koa();
app.keys = ['saver sekret key', 'to sign cookies'];
app.env = 'dev';

app.use(logger());

app.use(views('views', {
  map: {
    html: 'swig'
  },
  cache:false
}));

var redis = require('./config/redis');
app.use(redis);
app.use(koaBody());

require('./auth')
var passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(koaValidate());

var db = require('./config/db');
var register = require('./routes/register');

require('./routes/index')(register('/',app),db,passport);

//Require authentication for now
app.use(function*(next) {
  if (this.isAuthenticated()) {
    this.state.role = this.passport.user.role;
    yield next
  } else {
    this.redirect('/')
  }
})

require('./routes/logs')(register('/logs',app),db);
require('./routes/myrecipes')(register('/myrecipes',app),db);
require('./routes/users')(register('/users',app),db);
require('./routes/expenses')(register('/expenses',app),db);

app.use(statics(__dirname + '/public'));

http.createServer(app.callback()).listen(3000);
console.log('Listening on port 3000');
