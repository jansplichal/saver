/*jshint esnext:true*/
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


module.exports = function(router,db){
  var users = wrap(db.get('users'));

  router.get('/', function *(next) {
    var usr = yield users.find({});

    this.body = yield this.render('expenses/list',{
      pagename: 'My first page',
      authors: usr
    });
  });

};
