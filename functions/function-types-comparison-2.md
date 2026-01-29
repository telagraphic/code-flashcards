What are the differences between arrow functions and regular functions?
?

```javascript
// Arrow Function
// - No 'this' binding (uses lexical 'this')
// - No 'arguments' object
// - Cannot be used as constructors
// - Concise syntax

const arrow = (x) => x * 2;

// Regular Function
// - Has 'this' binding
// - Has 'arguments' object
// - Can be used as constructors
// - More verbose

function regular(x) {
  return x * 2;
}

// Key differences in 'this' context:
const obj = {
  name: 'Test',
  
  // Regular function - 'this' is dynamic
  regularMethod: function() {
    setTimeout(function() {
      console.log(this.name); // undefined (lost context)
    }, 100);
  },
  
  // Arrow function - 'this' is lexical
  arrowMethod: function() {
    setTimeout(() => {
      console.log(this.name); // "Test" (preserved)
    }, 100);
  }
};

// When to use:
// Arrow: Callbacks, array methods, when you need lexical 'this'
// Regular: Methods, constructors, when you need 'arguments'
```
