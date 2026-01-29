What are the main characteristics of each function type?
?

```javascript
// Function Declaration
// ✓ Hoisted
// ✓ Named
// ✓ Can be called before definition
// ✓ Good for reusable utilities
function declared() {
  return 'declared';
}

// Function Expression
// ✗ Not hoisted
// ✓/✗ Can be named or anonymous
// ✓ Flexible assignment
// ✓ Good for conditional logic
const expressed = function() {
  return 'expressed';
};

// Arrow Function
// ✗ Not hoisted
// ✗ No 'this' binding (lexical)
// ✗ No 'arguments'
// ✗ Cannot be constructor
// ✓ Concise syntax
// ✓ Good for callbacks
const arrow = () => 'arrow';

// Anonymous Function
// ✗ No name
// ✗ Harder to debug
// ✓ Good for one-time use
setTimeout(function() {
  // Anonymous
}, 100);

// IIFE
// ✓ Executes immediately
// ✓ Creates private scope
// ✓ Runs once
// ✓ Good for modules
(function() {
  // Private scope
})();

// Bound Function
// ✓ Fixed 'this' context
// ✓ Partial application
// ✓ Good for callbacks
const bound = obj.method.bind(obj);
```
