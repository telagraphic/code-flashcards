Write a filter function that accepts an array and function. The function should check if it is true or not?


```javascript
function filter(array, test) {
    let passed = [];
    for (let item in array) {
        if (test(item)) {
            passed.push(passed);
        }
    }
    return passed;
}

filter(list, item = item.valid)
```