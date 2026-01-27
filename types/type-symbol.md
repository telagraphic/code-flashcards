What is the Symbol type in JavaScript and how is it used?
?

```javascript
// Symbol: Unique, immutable primitive value
// Used as object property keys to avoid name collisions

// Creating symbols
const sym1 = Symbol();
const sym2 = Symbol('description');
const sym3 = Symbol('description');

console.log(sym2 === sym3); // false (each symbol is unique)

// Symbol as object key
const obj = {
  [sym1]: 'value1',
  [sym2]: 'value2',
  name: 'regular property'
};

console.log(obj[sym1]); // 'value1'
console.log(Object.keys(obj)); // ['name'] - symbols not included

// Well-known symbols
Symbol.iterator; // Used for iteration
Symbol.toStringTag; // Used for Object.prototype.toString
Symbol.toPrimitive; // Used for type conversion

// Practical: Private properties (before private fields)
const _data = Symbol('data');
const _method = Symbol('method');

class MyClass {
  constructor() {
    this[_data] = 'private';
  }
  
  [_method]() {
    return this[_data];
  }
  
  getData() {
    return this[_method]();
  }
}

// Practical: Metadata storage
const METADATA = Symbol('metadata');

function addMetadata(obj, data) {
  obj[METADATA] = data;
}

function getMetadata(obj) {
  return obj[METADATA];
}

// Practical: Preventing property name collisions
const CACHE_KEY = Symbol('cache');
const user = {
  name: 'Alice',
  [CACHE_KEY]: new Map()
};

// Practical: Global symbol registry
const globalSym = Symbol.for('global-key');
const sameSym = Symbol.for('global-key');
console.log(globalSym === sameSym); // true (same symbol)

// Practical: Custom iteration
const iterable = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next() {
        return count < 3
          ? { value: count++, done: false }
          : { done: true };
      }
    };
  }
};

for (const value of iterable) {
  console.log(value); // 0, 1, 2
}
```
