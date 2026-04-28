What do call, apply, and bind do and how do they differ?
?

```javascript
// call(), apply(), and bind() are methods that control 'this' context

const person = {
  name: 'Alice',
  greet: function(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
  }
};

// call() - calls function with specific 'this' and individual arguments
const result1 = person.greet.call({ name: 'Bob' }, 'Hello', '!');
console.log(result1); // 'Hello, I'm Bob!'

// apply() - calls function with specific 'this' and array of arguments
const result2 = person.greet.apply({ name: 'Charlie' }, ['Hi', '?']);
console.log(result2); // 'Hi, I'm Charlie?'

// bind() - creates new function with bound 'this' and optional arguments
const boundGreet = person.greet.bind({ name: 'Diana' });
const result3 = boundGreet('Hey', '!');
console.log(result3); // 'Hey, I'm Diana!'

// Key differences:
// - call(): immediate execution, arguments passed individually
// - apply(): immediate execution, arguments passed as array
// - bind(): returns new function, can be called later

// Practical: All three change 'this' context
const obj1 = { value: 10 };
const obj2 = { value: 20 };

function getValue() {
  return this.value;
}

console.log(getValue.call(obj1)); // 10
console.log(getValue.apply(obj2)); // 20
console.log(getValue.bind(obj1)()); // 10
```
