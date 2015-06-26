/*jshint esnext:true*/
var http = require('http');
var koa = require('koa');
var mount = require('koa-mount');
var logger = require('koa-logger');
var locale = require('koa-locale');
var i18n = require('koa-i18n');
var statics = require('koa-static');
var views = require('koa-views');
var koaBody = require('koa-body');
var koaValidate = require('koa-validate');
var session = require('koa-generic-session');
var redisStore = require('koa-redis')
var cfg = require('./config/cfg');
var stats = require('koa-statsd');
var csrf = require('koa-csrf');
var notFound = require('./middleware/pageNotFound');
var errorPage = require('./middleware/errorPage');
var compress = require('koa-compress');
var helmet = require('koa-helmet');
var log4js = require('log4js');

var app = module.exports = koa();
app.keys = ['saver sekret key', 'to sign cookies'];

app.use(helmet.defaults());
app.use(stats());
app.use(logger());
app.use(statics(__dirname + '/public'));
app.use(compress());

locale(app);
app.use(i18n(app, {
  directory: './config/locales',
  locales: ['en', 'cs'],
  modes: [
    'query',
    'header'
  ]
}));

app.use(views('views', {
  map: {
    html: 'swig'
  },
  cache: false
}));

app.use(notFound('404.html'));
app.use(errorPage('error.html'));

app.use(
  session({
    store: redisStore({
      host: cfg.redis.host,
      port: cfg.redis.port
    })
  })
);

app.use(koaBody());

if(app.env !== 'test'){
  csrf(app)
  app.use(csrf.middleware)
}

var mongo = require('./middleware/mongo');
app.use(mongo(cfg.mongo.url));

require('./util/auth');
var passport = require('koa-passport');

if(app.env !== 'test'){
  app.use(passport.initialize());
  app.use(passport.session());
}

app.use(koaValidate());

var register = require('./util/register');

require('./routes/index')(register('/', app),passport);

if(app.env !== 'test'){
  app.use(function*(next) {
    if (this.isAuthenticated()) {
      this.state.role = this.passport.user.role;
      yield next;
    } else {
      this.redirect('/');
    }
  })

  app.use(mount('/admin', function* authorize(next) {
    this.throw(500,'Done');
    if (this.state.role === 'admin') {
      yield next;
    } else {
      this.redirect('/notauthorized');
    }
  }));
}

require('./routes/logs')(register('/logs', app));
require('./routes/myrecipes')(register('/myrecipes', app));
require('./routes/users')(register('/users', app));
require('./routes/expenses')(register('/expenses', app));

app.use(statics(__dirname + '/public'));

app.on('error', function(err){
  console.log('Logging', err);
});


if (!module.parent) {
  var port = process.env.PORT || cfg.port || 3000;
  http.createServer(app.callback()).listen(port);
  console.log('Listening on port %d', port);
}
