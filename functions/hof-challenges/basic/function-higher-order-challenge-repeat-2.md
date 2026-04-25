Use the repeat function to push to an array called labels and console log the values?

```javascript
console.log(labels) // 1,2,3,4,5
```
?

```javascript
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

let labels = [];
repeat(5, i => labels.push(i))
console.log(labels)

```