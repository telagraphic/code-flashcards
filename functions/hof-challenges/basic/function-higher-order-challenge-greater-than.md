Return a function that is assigned to another let/block and called with a value that checks if it is greater than a certain number?


```javascript
greaterThan10(11);
```
?
```javascript

const greaterThan = limit => testNumber => testNumber > limit;
const greaterThan10 = greaterThan(10);
console.log(greaterThan10(11))


// or longer format

function greaterThan(limit) {
    return function(testNumber) {
        return testNumber > limit;
    }
}

const greaterThan10 = greaterThan(10);
console.log(greaterThan10(11))

```