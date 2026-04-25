Create a higher-order function `withRetry(fn, options)` for async functions.
It should retry calling `fn` up to `retries` times when it throws/rejects.
?

```javascript
function withRetry(fn, { retries = 2, delayMs = 0 } = {}) {
  // TODO
}

// Demo: fails twice, then succeeds
let attempts = 0;
const sometimesFails = async () => {
  attempts++;
  if (attempts < 3) throw new Error("try again");
  return "ok";
};

const safe = withRetry(sometimesFails, { retries: 5, delayMs: 10 });

safe()
  .then((value) => {
    console.log(value); // "ok"
    console.log(attempts); // 3
  })
  .catch((err) => console.error("should not reach", err));

// Extra check: retries exhausted should reject
let attempts2 = 0;
const alwaysFails = async () => {
  attempts2++;
  throw new Error("nope");
};

withRetry(alwaysFails, { retries: 2 })()
  .then(() => console.log("unexpected"))
  .catch((err) => {
    console.log(err.message); // "nope"
    console.log(attempts2); // 3 (1 initial + 2 retries)
  });
```

