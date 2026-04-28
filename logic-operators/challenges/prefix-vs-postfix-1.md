What’s the difference between `++a` and `a++`?
?

## Challenge: predict final values

```javascript
let a = 1, b = 1;

let c = ++a; // ?
let d = b++; // ?

// Final values of a, b, c, d?
```

## Challenge: spot the bug

```javascript
let counter = 1;
const result = 2 * counter++; // ?

// What is result, and what is counter after this line?
```

## Rule of thumb

- Use `++i` when you need the incremented value immediately.
- Avoid mixing `++` inside larger expressions if it harms readability.

