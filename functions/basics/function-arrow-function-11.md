How do you use arrow functions with higher-order functions and currying?
?

```javascript
// Arrow function returning arrow function (currying)
const multiply = a => b => a * b;
const double = multiply(2);
console.log(double(5)); // 10

// Multiple levels of currying
const add = a => b => c => a + b + c;
const add5 = add(5);
const add5And10 = add5(10);
console.log(add5And10(3)); // 18

// Arrow function as higher-order function
const withLogging = fn => (...args) => {
  console.log('Calling function with:', args);
  const result = fn(...args);
  console.log('Result:', result);
  return result;
};

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3); // Logs and returns 5

// Arrow function composition
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
const double = x => x * 2;
const square = x => x * x;
const addOne = x => x + 1;

const transform = pipe(double, square, addOne);
console.log(transform(3)); // ((3 * 2) ^ 2) + 1 = 37

// Arrow function as callback factory
const createValidator = (min, max) => value => {
  return value >= min && value <= max;
};

const validateAge = createValidator(18, 100);
console.log(validateAge(25)); // true
console.log(validateAge(15)); // false

// Practical example: event handler factory
const createHandler = (action) => (event) => {
  event.preventDefault();
  action(event.target.value);
};

const handleSubmit = createHandler(value => console.log('Submitted:', value));
```
