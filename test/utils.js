function login(agent, url, user){
  return new Promise(function(resolve, reject){
    agent
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

function logout(agent,url){
  return new Promise(function(resolve, reject){
    agent
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

module.exports = {
  login: login,
  logout: logout
};
