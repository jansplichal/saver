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

  router.get('/personal', function *(next) {
    yield this.render('myrecipes/personal',{
      pagename: 'My first page'
    });
  });

  router.get('/do', function *(next) {
    yield this.render('myrecipes/do',{
      pagename: 'My first page'
    });
  });

  router.get('/favourites', function *(next) {
    yield this.render('myrecipes/favourites',{
      pagename: 'My first page'
    });
  });

  router.get('/published', function *(next) {
    yield this.render('myrecipes/published',{
      pagename: 'My first page'
    });
  });

};
