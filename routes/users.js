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
module.exports = function(router, db) {

  router
    .get('/new', function*(next) {
      this.body = yield this.render('users/form', {
        pagename: 'My first page'
      });
    })
    .post('/', function*(next) {
      //optional() means this param may not in the params.
      this.checkBody('name').notEmpty("choose a name");
      this.checkBody('email').isEmail("enter a valid email");
      this.checkBody('password').notEmpty("choose a password").len(3, 20).md5();

      var a_b = "";
      if (this.errors) {
        console.log(this.errors);
        console.log(this.request.body);

        this.body = yield this.render('users/detail', {
          errors: this.errors,
          values: this.body
        });
        return;
      }

    })
    .get('/signin', function*(next) {
      this.body = yield this.render('users/signin', {
        pagename: 'My first page'
      });
    }).get('/detail', function*(next) {
      this.body = yield this.render('users/signin', {
        pagename: 'My first page'
      });
    });
};
