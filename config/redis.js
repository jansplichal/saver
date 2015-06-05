// session storage middleware
var session = require('koa-generic-session');
var redisStore = require('koa-redis');

module.exports = session({
  store: redisStore({
    host:'localhost',
    port: 6379
  })
});
