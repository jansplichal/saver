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

  router.get('/day', function *(next) {
    yield this.render('myexpenses/day',{
      pagename: 'My first page'
    });
  });

  router.get('/week', function *(next) {
    yield this.render('myexpenses/week',{
      pagename: 'My first page'
    });
  });

  router.get('/month', function *(next) {
    yield this.render('myexpenses/month',{
      pagename: 'My first page'
    });
  });

  router.get('/year', function *(next) {
    yield this.render('myexpenses/year',{
      pagename: 'My first page'
    });
  });

};
