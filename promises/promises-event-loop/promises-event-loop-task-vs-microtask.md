

```javascript
let state = 0;

Promise.resolve().then(() => {
  state = 1;
});

setTimeout(() => {
  console.log(state);
}, 0);
```

If the task queue ran before microtasks, this could log 0.

But JavaScript guarantees it logs 1.

Why? Because .then() is conceptually “the next step” of the current computation—not a separate event.