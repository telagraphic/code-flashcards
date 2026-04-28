When do arrow functions need curly braces and explicit return?
?

```javascript
// Single expression - implicit return (no braces)
const double = x => x * 2;

// Multiple statements - braces REQUIRED, explicit return
const process = x => {
  const doubled = x * 2;
  const squared = doubled * doubled;
  return squared;
};

// No return value - braces REQUIRED
const log = message => {
  console.log(message);
  console.log('Logged at:', new Date());
};

// Conditional logic - braces REQUIRED
const getStatus = age => {
  if (age >= 18) {
    return 'adult';
  } else {
    return 'minor';
  }
};

// Loops - braces REQUIRED
const sumArray = arr => {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum;
};

// Try-catch - braces REQUIRED
const safeParse = json => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return null;
  }
};

// Practical examples:
const validateEmail = email => {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const formatUser = user => {
  const name = user.name || 'Anonymous';
  const age = user.age || 0;
  return `${name} (${age})`;
};
```
