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

  router.get('/new', function *(next) {

    this.body = yield this.render('users/form',{
      pagename: 'My first page'
    });
  });

};
