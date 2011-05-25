function Toposort() {
  var deps = {};

  function addElements(elements, result, addedElements) {
    for (var i = elements.length - 1; i >= 0; i--) {
      addElement(elements[i], result, addedElements);
    }
  }

  function addElement(element, result, addedElements) {
    // Add prerequisites
    if (deps[element]) {
      addElements(deps[element], result, addedElements)
    }

    // Add element
    if (!addedElements[element]) {
      result.push(element);
      addedElements[element] = true;
    }
  }

  function sort(set, fallbackSort) {
    var result = [];
    var scanSet = fallbackSort ? set.sort(fallbackSort) : set;
    addElements(scanSet, result, {});
    return result;
  }

  function addPartialOrdering() {
    var args = arguments, i, k;
    for (i = args.length - 1; i >= 1; i--) {
      for (k = i - 1; k >= 0; k--) {
        if (!deps[args[i]]) deps[args[i]] = [];
        deps[args[i]].push(args[k]);
      }
    }
    return instance;
  }

  var instance = this;
  this.addPartialOrdering = addPartialOrdering;
  this.sort = sort;
}

module.exports = Toposort;

