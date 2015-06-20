var co = require('co');
var crypt = require('../util/crypt');

describe("Crypto utilities", function() {

  it("generates a bcrypt hash", function(done) {
    co(function *(){
      var hash = yield crypt.encrypt("Ahoj lidi");
      expect(hash.length).toEqual(60);
    }).then(function(result){
      done();
    },function(err){
      expect(err).toBe(undefined);
      done();
    });
  });

  it("compares correct hash to true", function(done) {
    co(function *(){
      var hash = yield crypt.encrypt("Ahoj lidi");
      expect(hash.length).toEqual(60);
      var result = yield crypt.compare("Ahoj lidi", hash)
      expect(result).toBe(true);
    }).then(function(result){
      done();
    },function(err){
      expect(err).toBe(undefined);
      done()
    });
  });

  it("compares wrong hash to false", function(done) {
    co(function *(){
      var hash = yield crypt.encrypt("Ahoj lidi");
      expect(hash.length).toEqual(60);
      var result = yield crypt.compare("Ahoj lidicky", hash)
      expect(result).toBe(false);
    }).then(function(result){
      done();
    },function(err){
      expect(err).toBe(undefined);
      done();
    });

  });


});
