var request = require('superagent');
var co = require('co');

function login(url, user){
  return new Promise(function(resolve, reject){
    request
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

function cleanCookies(arr){
  return arr.map(function(item){
    return item.substring(0, item.indexOf(';'));
  });
}

function main(url, cookies){
  return new Promise(function(resolve, reject){
    request
      .get(url)
      .set('connection','keep-alive')
      .set('Cookie',cookies.join('; '))
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
  cookies = cleanCookies(cookies)
  console.log(cookies.join('; '));
  var result = yield main('http://localhost:3000/myrecipes/personal', cookies);
  console.log(result.text);
}).then(function(val){}, function(err){
  console.error(err);
});
