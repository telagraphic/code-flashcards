How do you create a higher-order function that returns a function?
?

```javascript
// Higher-order function that returns a function
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

// Create specific multipliers
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Practical example: create event handlers
function createEventHandler(action) {
  return function(event) {
    event.preventDefault();
    action(event);
  };
}

const handleSubmit = createEventHandler((e) => {
  console.log('Form submitted');
});

const handleCancel = createEventHandler((e) => {
  console.log('Form cancelled');
});

document.getElementById('submit').addEventListener('click', handleSubmit);
document.getElementById('cancel').addEventListener('click', handleCancel);
```
