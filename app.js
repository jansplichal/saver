/*jshint esnext:true*/

var http = require('http');
var koa = require('koa');
var logger = require('koa-logger');

// session storage middleware
var session = require('koa-generic-session');
var redisStore = require('koa-redis');

//mongo
var monk = require('monk');
var wrap = require('co-monk');

var router = require('koa-router')();
var statics = require('koa-static');
var views = require('koa-render');

var app = koa();
app.keys = ['saver sekret key', 'to sign cookies'];
app.env = 'dev';

app.use(logger());

app.use(session({
  store: redisStore({
    host:'localhost',
    port: 6379
  })
}));

app.use(function *(next){
  yield next;
  //this.body = JSON.stringify(this,null,2);
  //this.throw(403);
});

app.use(views('./views', {
  map: { html: 'swig' },
  cache: false
}));

app
  .use(router.routes())
  .use(router.allowedMethods());

var db = require('./config/db');
require('./routes/log')(router,db);

app.use(statics(__dirname + '/public'));

http.createServer(app.callback()).listen(3000);
console.log('Listening on port 3000');
