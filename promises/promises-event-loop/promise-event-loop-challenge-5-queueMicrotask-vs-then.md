What gets logged (`queueMicrotask` vs `.then`)?
?

```javascript
console.log("start");

queueMicrotask(() => console.log("microtask-1"));

Promise.resolve().then(() => console.log("then"));

queueMicrotask(() => console.log("microtask-2"));

console.log("end");
```

