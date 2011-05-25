var toposort = require('../lib/toposort');
var assert = require('assert');

function sortAlphabetically(a, b) {
  return a < b ? 1 : a === b ? 0 : -1;
}

function sortReverseAlphabetically(a, b) {
  return a > b ? 1 : a === b ? 0 : -1;
}

var tests = [

  function testEmptySet() {
    var set = new toposort();
    assert.deepEqual([], set.sort([]));
  },

  function testSortItem() {
    var set = new toposort();
    assert.deepEqual(['a'], set.sort(['a']));
  },

  function testFallbackSort() {
    var set = new toposort();
    assert.deepEqual([ 'a', 'b' ], set.sort([ 'a', 'b' ], sortAlphabetically));
    assert.deepEqual([ 'b', 'a' ], set.sort([ 'a', 'b' ], sortReverseAlphabetically));
  },

  function testAddPartialOrdering() {
    var set = new toposort();
    assert.deepEqual([ 'a', 'b' ],
      set.addPartialOrdering('a', 'b').sort([ 'a', 'b' ], sortReverseAlphabetically));
  },

  function testAddPartialOrderingWithFallbackSort() {
    var set = new toposort().addPartialOrdering('a', 'b');
    assert.deepEqual([ 'c', 'a', 'b' ],
      set.sort([ 'a', 'b', 'c' ], sortReverseAlphabetically));
  }
];

for (var i = tests.length - 1; i >= 0; i--) { tests[i](); }

console.log(tests.length + " Passed");

