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

  router.get('/personal', function *(next) {
    //var usr = yield users.find({});
    yield this.render('myrecipes/personal',{
      pagename: 'My first page'
      //authors: usr
    });
  });

  router.get('/do', function *(next) {
    //var usr = yield users.find({});
    yield this.render('myrecipes/do',{
      pagename: 'My first page'
      //authors: usr
    });
  });

  router.get('/favourites', function *(next) {
    //var usr = yield users.find({});
    yield this.render('myrecipes/favourites',{
      pagename: 'My first page'
      //authors: usr
    });
  });

  router.get('/published', function *(next) {
    //var usr = yield users.find({});
    yield this.render('myrecipes/published',{
      pagename: 'My first page'
      //authors: usr
    });
  });

};
