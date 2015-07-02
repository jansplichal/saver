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
    this.redirect('myexpenses/day');
  });/*jshint ignore:line*/

  router.get('/day', function *(next) {
    yield this.render('myexpenses/day',{
    });
  });

  router.get('/week', function *(next) {
    yield this.render('myexpenses/week',{
    });
  });

  router.get('/month', function *(next) {
    yield this.render('myexpenses/month',{
    });
  });

  router.get('/year', function *(next) {
    yield this.render('myexpenses/year',{
    });
  });

};
