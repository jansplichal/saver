/*jshint esnext:true*/

var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/saver');
var co = require('co');
var crypt = require('./util/crypt');

co(function *(){

  // var hash = yield crypt.encrypt("Ahoj lidi");
  // console.log(hash);
  // var isSame = yield crypt.compare("Ahoj lidi",hash);
  // console.log(isSame);

  var passwordJan = yield crypt.encrypt('jansplichal');
  var passwordRadek = yield crypt.encrypt('radeksplichal');

  var users = wrap(db.get('users'));

  yield users.remove({});

  yield [
    users.insert({ name: 'jansplichal', company: 'CA', email:'js@gmail.com', role: 'admin', password : passwordJan }),
    users.insert({ name: 'radeksplichal', company: 'ABB',email:'rs@gmail.com', role: 'operator', password: passwordRadek }),
  ];

  var res = yield users.find({});
  console.log(res);

  db.close();
  return 'OK';
}).then(function(val){
  console.log(val);
}, function(err){
  console.log(err);
});
