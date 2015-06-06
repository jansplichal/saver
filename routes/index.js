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
    this.redirect('users/new');
  });

};
