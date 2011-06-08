var Toposort = require('../lib/Toposort');
var assert = require('assert');

function sortAlphabetically(a, b) {
  return a < b ? 1 : a === b ? 0 : -1;
}

function sortReverseAlphabetically(a, b) {
  return a > b ? 1 : a === b ? 0 : -1;
}

var tests = [

  function testEmptySet() {
    var set = new Toposort();
    assert.deepEqual(set.sort([]), []);
  },

  function testSortItem() {
    var set = new Toposort();
    assert.deepEqual(set.sort([ 'a' ]), [ 'a' ]);
  },

  function testFallbackSort() {
    var set = new Toposort();
    assert.deepEqual(
      set.sort([ 'a', 'b' ], sortAlphabetically),
      [ 'a', 'b' ]);
    assert.deepEqual(
      set.sort([ 'a', 'b' ], sortReverseAlphabetically),
      [ 'b', 'a' ]);
  },

  function testAddPartialOrdering() {
    var set = new Toposort();
    assert.deepEqual(
      set.addPartialOrdering('a', 'b').sort([ 'a', 'b' ], sortReverseAlphabetically),
      [ 'a', 'b' ]);
  },

  function testAddPartialOrderingWithFallbackSort() {
    var set = new Toposort().addPartialOrdering('a', 'b');
    assert.deepEqual(
      set.sort([ 'a', 'b', 'c' ], sortReverseAlphabetically),
      [ 'c', 'a', 'b' ]);
  },

  function testSparseAddPartialOrdering() {
    var set = new Toposort().addPartialOrdering('a', 'c', 'e');
    assert.deepEqual(
      set.sort([ 'a', 'b', 'c', 'd', 'e', 'f' ], sortReverseAlphabetically),
     ['f', 'a', 'c', 'e', 'd', 'b' ]);
  },

  function testInterleavedPartialOrdering() {
    var set = new Toposort().
      addPartialOrdering('a', 'c', 'e').
      addPartialOrdering('f', 'c');
    assert.deepEqual(set.sort([ 'a', 'b', 'c', 'd', 'e', 'f' ], sortAlphabetically),
      [ 'a', 'b', 'f', 'c', 'd', 'e' ]);
  }
];

for (var i = tests.length - 1; i >= 0; i--) { tests[i](); }

console.log(tests.length + " Passed");

