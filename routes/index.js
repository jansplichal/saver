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

module.exports = function(router, passport){

  router
    .get('/', function *() {
      yield this.render('users/signin', {
        csrf: this.csrf
      });
    })
    .post('login',
      passport.authenticate('local', {
        successRedirect: '/myexpenses/day',
        failureRedirect: '/?error=authentication'
      })
    )
    .get('signup', function*(next) {
      yield this.render('users/signup', {
        csrf: this.csrf
      });
    })
    .get('signin', function*(next) {
      yield this.render('users/signin', {
        csrf: this.csrf
      });
    })
    .get('logout', function*(next) {
      this.logout();
      this.redirect('/');
    })/*jshint ignore:line*/
    .get('error', function*(next) {
      yield this.render('error');
    })
    .get('notauthorized', function*(next) {
      yield this.render('notauthorized');
    })
    .get('help', function*(){
      yield this.render('help',{
        pagename: 'My first page'
      });
    });
};
