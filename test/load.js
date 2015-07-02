/*jshint esnext:true*/
var request = require('superagent');
var co = require('co');

var user1 = request.agent();

function login(url, user){
  return new Promise(function(resolve, reject){
    user1
      .post(url)
      .send(user)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          reject(err);
        } else {
          resolve(res.headers['set-cookie']);
        }
      });
  });
}

function logout(url){
  return new Promise(function(resolve, reject){
    user1
      .get(url)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}


function cleanCookies(arr){
  return arr.map(function(item){
    return item.substring(0, item.indexOf(';'));
  });
}

function main(url, cookies){
  return new Promise(function(resolve, reject){
    user1
      .get(url)
      .end(function(err, res){
        if(err){
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}


co(function *(){
  var cookies = yield login('http://localhost:3000/login', {
      username: 'jansplichal',
      password: 'jansplichal'
  });
  for(i=0;i<10000;i++){
    var result = yield main('http://localhost:3000/myrecipes/personal');
  }
  yield logout('http://localhost:3000/logout');

}).then(function(val){}, function(err){
  console.error(err);
});
