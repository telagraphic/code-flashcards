What are the hoisting differences between function types?
?

```javascript
// 1. Function Declaration - FULLY HOISTED
console.log(declared()); // "Function declaration" - works!

function declared() {
  return 'Function declaration';
}

// 2. Function Expression (var) - VARIABLE HOISTED, VALUE NOT
console.log(expressedVar); // undefined
// expressedVar(); // TypeError: expressedVar is not a function

var expressedVar = function() {
  return 'Function expression (var)';
};

// 3. Function Expression (const/let) - NOT HOISTED
// console.log(expressedConst); // ReferenceError
// expressedConst(); // ReferenceError

const expressedConst = function() {
  return 'Function expression (const)';
};

// 4. Arrow Function - NOT HOISTED
// console.log(arrow); // ReferenceError
// arrow(); // ReferenceError

const arrow = () => {
  return 'Arrow function';
};

// Summary: Only function declarations are fully hoisted
```
