Write a higher-order function `callFn(fn)` that returns the result of calling `fn`.
This is the simplest “takes a function” HOF.
?

```javascript
function callFn(fn) {
  // TODO
}

console.log(callFn(() => 123)); // 123
console.log(callFn(() => "hi")); // "hi"
```



```javascript
function callFn(fn) {
  return fn();
}
```