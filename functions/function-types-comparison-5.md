When should you use bind() vs arrow functions vs regular functions?
?

```javascript
// Regular Function - dynamic 'this'
const obj = {
  name: 'Test',
  regularMethod: function() {
    return this.name;
  }
};

// Arrow Function - lexical 'this'
const obj2 = {
  name: 'Test',
  arrowMethod: () => {
    return this.name; // 'this' is from outer scope
  }
};

// Bound Function - fixed 'this'
const boundMethod = obj.regularMethod.bind(obj);

// Comparison in callbacks:

// Problem: Lost 'this' context
class Button {
  constructor() {
    this.clicks = 0;
  }
  
  // Solution 1: Arrow function (preserves 'this')
  setupArrow() {
    document.addEventListener('click', () => {
      this.clicks++; // 'this' refers to Button instance
    });
  }
  
  // Solution 2: Bind (fixes 'this')
  setupBind() {
    document.addEventListener('click', this.handleClick.bind(this));
  }
  
  handleClick() {
    this.clicks++; // 'this' refers to Button instance
  }
  
  // Solution 3: Regular function (loses 'this')
  setupRegular() {
    document.addEventListener('click', function() {
      // this.clicks++; // Error: 'this' is not Button
    });
  }
}

// When to use:
// Arrow: Modern code, callbacks, when you need lexical 'this'
// Bind: When you need to reuse bound function, partial application
// Regular: Methods, constructors, when you need dynamic 'this'
```
