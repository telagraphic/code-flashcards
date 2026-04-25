Write a function unless() that is used in the repeat function to console.log if the number is even or not?


```javascript
repeat(2); // even
repeat(3); // odd
```
?

```javascript

function unless(condition, action) {
  if (!condition) action();
}

function repeatCallback(n) {
    unless(n % 2 === 1, () => {
       console.log(`${n} is even`); 
    })
}

function repeat(times, callback) {
    for (let i = 0; i < times; i++) callback(i);
});

repeat(2, repeatCallback);

```
