/**
 * @fileOverview Application CRUD tests.
 */

var chai = require('chai');
var assert = chai.assert;

var Link = require('../');

suite('httlink', function() {
  var link;
  setup(function() {
    link = new Link();
  });

  test('constructs a single link', function() {
    var res = link.protocol('http')
      .data({next: 5})
      .host('www.google.com')
      .port(80)
      .path('/search')
      .rel('next')
      .end()
      .get();
    assert.equal(res, '<http://www.google.com/search?page=5>; rel="next"');
  });
  test('constructs two links', function() {
    var res = link.protocol('http')
      .data({next: 5, previous: 3})
      .host('www.google.com')
      .port(80)
      .path('/search')
      .rel('next')
      .next()
      .rel('previous')
      .end()
      .get();
    
    var expected = '<http://www.google.com/search?page=5>; rel="next"';
    expected += ', <http://www.google.com/search?page=3>; rel="previous"';
    assert.equal(res, expected);
  });
  test('constructs three links', function() {
    var res = link.protocol('http')
      .data({next: 5, previous: 3, current: 4})
      .host('www.google.com')
      .port(80)
      .path('/search')
      .rel('next')
      .next()
      .rel('current')
      .next()
      .rel('previous')
      .end()
      .get();
    
    var expected = '<http://www.google.com/search?page=5>; rel="next"';
    expected += ', <http://www.google.com/search?page=4>; rel="current"';
    expected += ', <http://www.google.com/search?page=3>; rel="previous"';
    assert.equal(res, expected);
  });
  test('Honors "show" param', function() {
    var res = link.protocol('http')
      .data({next: 5, previous: 3, current: 4})
      .host('www.google.com')
      .port(80)
      .path('/search')
      .rel('next')
      .show(10)
      .next()
      .rel('current')
      .next()
      .rel('previous')
      .end()
      .get();
    
    var expected = '<http://www.google.com/search?page=5&show=10>; rel="next"';
    expected += ', <http://www.google.com/search?page=4&show=10>; rel="current"';
    expected += ', <http://www.google.com/search?page=3&show=10>; rel="previous"';
    assert.equal(res, expected);
  });

});
