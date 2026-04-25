Write a function that returns a function via currying to check what the minimum number is?

```javascript
console.log(numCheck(Math.min)(3,2,1));
```
?

```javascript

function numCheck(fn) {
    return function(...args) {
        let result = fn(...args);
        return result;
    }
}

numCheck(Math.min)(3,2,1)


// formatted differently

const numCheck = fn => {
    return (...args) => {
        let result = fn(...args);
        return result;
    }
}

numCheck(Math.min)(3,2,1);


```