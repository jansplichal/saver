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

module.exports = function(router,db,passport){
  var users = wrap(db.get('users'));

  router
    .get('/', function *() {
      console.log(passport);
      this.body = yield this.render('users/login')
    })
    .post('login',
      passport.authenticate('local', {
        successRedirect: '/myrecipes/personal',
        failureRedirect: '/'
      })
    )
    .get('logout', function*(next) {
      this.logout()
      this.redirect('/')
    })
    .get('help', function*(){
      console.log('helping');
      this.body = yield this.render('help',{
        pagename: 'My first page'
      });
    });
};
