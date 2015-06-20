/*jshint esnext:true*/

// var monk = require('monk');
// var wrap = require('co-monk');
// var db = monk('localhost/test');
var co = require('co');
var crypt = require('./util/crypt');

co(function *(){

  var hash = yield crypt.encrypt("Ahoj lidi");
  console.log(hash);
  var isSame = yield crypt.compare("Ahoj lidi",hash);
  console.log(isSame);

  // var users = wrap(db.get('users'));
  //
  // yield users.remove({});
  //
  // yield [
  //   users.insert({ name: 'Tobi', species: 'ferret' }),
  //   users.insert({ name: 'Loki', species: 'ferret' }),
  //   users.insert({ name: 'Jane', species: 'ferret' })
  // ];
  //
  // //yield users.remove({});
  //
  //
  // var res = yield users.find({});
  // console.log("result");
  //
  // console.log(res);
  //
  // db.close();
  return 'OK';
}).then(function(val){
  console.log(val);
}, function(err){
  console.log(err);
});
