/*jshint esnext:true*/

var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/test');
var co = require('co');


co(function *(){
  var users = wrap(db.get('users'));

  yield [
    users.insert({ name: 'Tobi', species: 'ferret' }),
    users.insert({ name: 'Loki', species: 'ferret' }),
    users.insert({ name: 'Jane', species: 'ferret' })
  ];

  yield users.remove({});


  var res = yield users.find({});
  console.log("result");

  console.log(res);

  db.close();
});
