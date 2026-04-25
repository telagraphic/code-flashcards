Write a function that that takes a number and a functin that calls that number to repeat n times.

```javascript
repeat(5, console.log)
```
?

```javascript
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}
```