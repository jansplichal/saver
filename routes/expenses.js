var wrap = require('co-monk');

/*
  GET     /                 ->  list
  GET     /new              ->  new
  POST    /                 ->  create
  GET     /:id              ->  show
  GET     /:id/edit         ->  edit
  PUT     /:id              ->  update
  DELETE  /:id              ->  destroy
*/
module.exports = function(router){
  router.get('/', function *(next) {
    var users = this.use('users');
    
    var usr = yield users.find({});
    yield this.render('expenses/list',{
      pagename: 'My first page',
      authors: usr
    });
  });
};
