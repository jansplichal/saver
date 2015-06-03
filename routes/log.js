/*jshint esnext:true*/
var wrap = require('co-monk');

module.exports = function(router,db){
  var users = wrap(db.get('users'));

  router.get('/', function *(next) {
    var usr = yield users.find({});

    this.body = yield this.render('index',{
      pagename: 'My first page',
      authors: usr
    });
  });

};
