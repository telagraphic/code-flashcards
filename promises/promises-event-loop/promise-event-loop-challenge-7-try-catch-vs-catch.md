What gets logged (why `try/catch` doesn’t catch Promise errors)?
?

```javascript
try {
  Promise.resolve().then(() => {
    throw new Error("boom");
  });
  console.log("after-scheduling");
} catch (err) {
  console.log("caught", err.message);
}

Promise.resolve()
  .then(() => console.log("microtask"))
  .catch((err) => console.log("promise-caught", err.message));
```

