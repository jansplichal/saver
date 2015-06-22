var Router = require('koa-router');


module.exports = function(path,app){
  var router = new Router({prefix:path});
  app
   .use(router.routes())
   .use(router.allowedMethods());
  return router;
};
