var co = require('co');
var crypt = require('../util/crypt');
var should = require('should');

describe("Crypto utilities", function() {

  it("generates a bcrypt hash", function(done) {
    co(function *(){
      var hash = yield crypt.encrypt("Ahoj lidi");
      (hash.length).should.be.exactly(60);
    }).then(function(result){
      done();
    },function(err){
      should.fail(err);
      done();
    });
  });

  it("compares correct hash to true", function(done) {
    co(function *(){
      var hash = yield crypt.encrypt("Ahoj lidi");
      (hash.length).should.be.exactly(60);
      var result = yield crypt.compare("Ahoj lidi", hash);
      (result).should.be.true();
    }).then(function(result){
      done();
    },function(err){
      should.fail(err);
      done()
    });
  });

  it("compares wrong hash to false", function(done) {
    co(function *(){
      var hash = yield crypt.encrypt("Ahoj lidi");
      (hash.length).should.be.exactly(60);
      var result = yield crypt.compare("Ahoj lidicky", hash)
      result.should.be.false();
    }).then(function(result){
      done();
    },function(err){
      should.fail(err);
      done();
    });
  });

});
