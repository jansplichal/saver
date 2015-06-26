var app = require('../app');
var request = require('supertest').agent(app.listen());
var utils = require('./utils');
var co = require('co');

describe('404', function(){
  it('should return the 404 page', function(done){
    request
    .get('/not_existing')
    .expect(404)
    .expect(/Page Not Found/, done);
  });

});
