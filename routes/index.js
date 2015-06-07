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

  router
    .get('/', function *() {
      this.redirect('users/new');
    })/*jshint ignore:line*/
    .get('signin', function*(){
      this.redirect('users/signin');
    })/*jshint ignore:line*/
    .get('help', function*(){
      console.log('helping');
      this.body = yield this.render('help',{
        pagename: 'My first page'
      });
    });
};
