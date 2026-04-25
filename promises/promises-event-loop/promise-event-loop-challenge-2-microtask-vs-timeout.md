What gets logged (microtasks vs macrotasks)?
?

```javascript
console.log("A");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => console.log("then-1"))
  .then(() => console.log("then-2"));

console.log("B");
```

