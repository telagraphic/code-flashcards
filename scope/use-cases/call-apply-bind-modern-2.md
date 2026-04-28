How do you use call/apply/bind for functional programming patterns?
?

```javascript
// Functional programming patterns with call/apply/bind

// Practical: Function composition
function compose(...functions) {
  return function(...args) {
    return functions.reduceRight((result, fn) => {
      return Array.isArray(result)
        ? fn.apply(null, result)
        : fn(result);
    }, args);
  };
}

const add = (a, b) => a + b;
const multiply = (n) => n * 2;
const composed = compose(multiply, add);
console.log(composed(3, 4)); // 14

// Practical: Method extraction and reuse
const arrayUtils = {
  sum: function() {
    return Array.from(arguments).reduce((a, b) => a + b, 0);
  },
  
  average: function() {
    const args = Array.from(arguments);
    return this.sum.apply(this, args) / args.length;
  }
};

const numbers = [10, 20, 30];
console.log(arrayUtils.sum.apply(null, numbers)); // 60
console.log(arrayUtils.average.apply(null, numbers)); // 20

// Practical: Partial application utility
function partial(fn, ...boundArgs) {
  return function(...remainingArgs) {
    return fn.apply(this, [...boundArgs, ...remainingArgs]);
  };
}

function createUser(name, email, role, age) {
  return { name, email, role, age };
}

const createAdmin = partial(createUser, null, null, 'admin');
const admin = createAdmin('Alice', 'alice@example.com', 30);
console.log(admin); // { name: 'Alice', email: '...', role: 'admin', age: 30 }

// Practical: Memoization with context
function memoize(fn, context) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(context || this, args);
    cache.set(key, result);
    return result;
  };
}

const calculator = {
  multiply(a, b) {
    return a * b;
  }
};

const memoizedMultiply = memoize(calculator.multiply, calculator);
console.log(memoizedMultiply(5, 3)); // 15
console.log(memoizedMultiply(5, 3)); // 15 (from cache)
```
