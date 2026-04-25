What gets logged (`Promise.all` + microtasks)?
?

```javascript
console.log("A");

const p1 = Promise.resolve().then(() => {
  console.log("p1");
  return 1;
});

const p2 = Promise.resolve().then(() => {
  console.log("p2");
  return 2;
});

Promise.all([p1, p2]).then((values) => {
  console.log("all", values.join(","));
});

console.log("B");
```

