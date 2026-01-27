What is the Function type in JavaScript and how is it used?
?

```javascript
// Function: Callable object, first-class citizen
// Can be assigned, passed as arguments, returned

// Function creation
function declaration() { } // Function declaration
const expression = function() { }; // Function expression
const arrow = () => { }; // Arrow function

// Functions are objects
function test() { }
test.property = 'value';
console.log(test.property); // 'value'

// Function properties
function example(a, b) {
  return a + b;
}
console.log(example.name); // 'example'
console.log(example.length); // 2 (number of parameters)

// Practical: Higher-order functions
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}
const double = createMultiplier(2);

// Practical: Callbacks
function processData(data, callback) {
  const processed = data.map(item => item * 2);
  callback(processed);
}

processData([1, 2, 3], (result) => {
  console.log(result); // [2, 4, 6]
});

// Practical: Event handlers
function handleClick(event) {
  console.log('Clicked:', event.target);
}
button.addEventListener('click', handleClick);

// Practical: Async functions
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

// Practical: Function composition
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const addOne = x => x + 1;
const multiplyTwo = x => x * 2;
const composed = compose(addOne, multiplyTwo);
console.log(composed(5)); // 11 (5 * 2 + 1)

// Practical: Method binding
const obj = {
  value: 10,
  getValue() {
    return this.value;
  }
};

const unbound = obj.getValue;
console.log(unbound()); // undefined (lost context)

const bound = obj.getValue.bind(obj);
console.log(bound()); // 10

// Function type checking
console.log(typeof function() {}); // 'function'
console.log(typeof () => {}); // 'function'
```
