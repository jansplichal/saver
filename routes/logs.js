/*jshint esnext:true*/
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
    users = this.use('users');
    var usr = yield users.findOne({});

    yield this.render('logs/index',{
      pagename: 'My first page',
      authors: [usr]
    });
  });

};
