Naive Topological Sort
-
Specify loose constraints on a set to to-be-sorted items.

Usage
-

```javascript
var set = new Toposort().
  addPartialOrdering('man', 'chair').
  addPartialOrdering('chair', 'floor');
set.sort([ 'chair', 'floor', 'man' ]);

=> [ 'man', 'chair', 'floor' ]
```

or

```javascript
var set = new Toposort().
  addDependencies('brush teeth', [ 'open tube', 'apply paste' ]).
  addDependencies('wash face', [ 'open spigot', 'splash water' ]);
set.sort([ 'wash face', 'brush teeth' ]);

=> [ 'open tube', 'apply paste', 'brush teeth', 'open spigot', 'splash water', 'wash face' ]
```

