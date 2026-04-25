What gets logged (nested `.then`)?
?

```javascript
console.log(1);

Promise.resolve().then(() => {
  console.log(2);

  Promise.resolve().then(() => {
    console.log(4);
  });

  console.log(3);
});

console.log(5);
```

