
var read = require('mz/fs').readFile;
var assert = require('assert');

var asyncFunction = require('..');

describe('asyncFunction(* -> yield [])', function(){
  it('should aggregate several promises', function(){
    return asyncFunction(function *(){
      var a = read('index.js', 'utf8');
      var b = read('LICENSE', 'utf8');
      var c = read('package.json', 'utf8');

      var res = yield Promise.all([a, b, c]);
      assert.equal(3, res.length);
      assert(~res[0].indexOf('exports'));
      assert(~res[1].indexOf('MIT'));
      assert(~res[2].indexOf('devDependencies'));
    });
  })

  it('should noop with no args', function(){
    return asyncFunction(function *(){
      var res = yield [];
      assert.equal(0, res.length);
    });
  })
})
