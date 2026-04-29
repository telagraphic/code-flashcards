# Basic Promise (bare minimum) — from scratch (JavaScript)

This is a **learning-only** implementation of a tiny Promise-like class.

It intentionally does the bare minimum:

- **3 states**: pending → fulfilled OR rejected (settles once)
- **`then`**: register success/failure callbacks (works before/after settlement)
- **`catch`**: sugar for `.then(undefined, onRejected)`
- **Simple chaining**: `.then()` returns a new promise
- **Async handlers**: callbacks run asynchronously (microtask if available)

What it **does not** try to do (on purpose):

- Full Promises/A+ behavior (thenable assimilation, cycle detection, etc.)
- `finally`, `all`, `race`, etc.
- Spec-accurate microtask ordering in every edge case

---

## The code

```js
const STATE = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});

function enqueue(fn) {
  // Native Promises schedule callbacks asynchronously (microtasks).
  // `queueMicrotask` is the closest simple primitive; `setTimeout` is a coarse fallback.
  if (typeof queueMicrotask === "function") queueMicrotask(fn);
  else setTimeout(fn, 0);
}

/**
 * BasicPromise: a tiny, study-focused Promise implementation.
 */
class BasicPromise {
  #state = STATE.PENDING;
  #value = undefined; // fulfillment value OR rejection reason (interpret via #state)
  #handlers = []; // queued "then" subscribers while pending

  constructor(executor) {
    const resolve = (value) => this.#settle(STATE.FULFILLED, value);
    const reject = (reason) => this.#settle(STATE.REJECTED, reason);

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  #settle(nextState, value) {
    // Settle exactly once.
    if (this.#state !== STATE.PENDING) return;

    this.#state = nextState;
    this.#value = value;

    // Drain queued handlers asynchronously.
    enqueue(() => {
      const q = this.#handlers;
      this.#handlers = [];
      q.forEach((h) => this.#runHandler(h));
    });
  }

  #runHandler(handler) {
    const { onFulfilled, onRejected, resolveNext, rejectNext } = handler;

    try {
      if (this.#state === STATE.FULFILLED) {
        if (typeof onFulfilled !== "function") {
          resolveNext(this.#value); // passthrough
          return;
        }

        const out = onFulfilled(this.#value);
        this.#resolveNext(resolveNext, rejectNext, out);
        return;
      }

      if (this.#state === STATE.REJECTED) {
        if (typeof onRejected !== "function") {
          rejectNext(this.#value); // propagate error
          return;
        }

        const out = onRejected(this.#value);
        this.#resolveNext(resolveNext, rejectNext, out);
      }
    } catch (err) {
      rejectNext(err);
    }
  }

  #resolveNext(resolveNext, rejectNext, out) {
    // Minimal chaining rule:
    // - if the handler returns another BasicPromise, adopt it
    // - otherwise resolve with the returned value
    if (out instanceof BasicPromise) {
      out.then(resolveNext, rejectNext);
    } else {
      resolveNext(out);
    }
  }

  then(onFulfilled, onRejected) {
    return new BasicPromise((resolveNext, rejectNext) => {
      const handler = { onFulfilled, onRejected, resolveNext, rejectNext };

      if (this.#state === STATE.PENDING) {
        // Subscribe for later.
        this.#handlers.push(handler);
        return;
      }

      // Already settled: still run asynchronously.
      enqueue(() => this.#runHandler(handler));
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}

// --- Example ---
const p = new BasicPromise((resolve) => {
  setTimeout(() => resolve("done"), 200);
});

p.then((v) => {
  console.log("1:", v);
  return "next";
})
  .then((v) => {
    console.log("2:", v);
    // return another BasicPromise to show adoption
    return new BasicPromise((resolve) => resolve("final"));
  })
  .then((v) => console.log("3:", v))
  .catch((e) => console.error("err:", e));
```

---

## Walkthrough (what happens, step-by-step)

### 1) Construction runs the executor immediately

When you do:

```js
new BasicPromise((resolve, reject) => {
  // ...
});
```

- The constructor creates two functions, `resolve` and `reject`.
- It calls your executor right away: `executor(resolve, reject)`.
- If your executor throws, we treat that as a rejection.

### 2) `resolve` / `reject` settle the promise once

Inside `#settle(state, value)`:

- If we already settled (not pending), we ignore it.
- Otherwise we store:
  - `#state = "fulfilled"` or `"rejected"`
  - `#value = value` (either the fulfillment value or the rejection reason)
- Then we schedule an async task that drains `#handlers`.

### 3) `then()` registers a “handler record”

`then(onFulfilled, onRejected)` always returns a **new** `BasicPromise`.

Internally, it creates a handler object:

- `onFulfilled` / `onRejected`: the user callbacks
- `resolveNext` / `rejectNext`: the resolver functions for the *new* promise we returned

If the current promise is:

- **pending**: we push that handler into `#handlers` and wait
- **already settled**: we schedule `#runHandler(handler)` asynchronously

### 4) `#runHandler` is the whole “bridge” of chaining

When the original promise settles, `#runHandler` decides:

- Which callback to call (fulfilled → `onFulfilled`, rejected → `onRejected`)
- What to do when the callback is missing:
  - missing `onFulfilled` → pass the value through
  - missing `onRejected` → propagate the error through
- What to do with the callback result:
  - if it returns a `BasicPromise`, we adopt it
  - otherwise we resolve the next promise with that returned value
- If the callback throws, we reject the next promise with that thrown error

That’s enough behavior to model the core mental idea of Promises:

> Every `.then(...)` returns a new promise representing “the eventual result of running this callback.”

