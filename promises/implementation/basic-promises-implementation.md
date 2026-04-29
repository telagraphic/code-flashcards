# Basic Promises implementation (super minimal)

This file is a **learning implementation** of a Promise-like object.
It is intentionally small so you can understand the moving pieces.

It supports:

- `new BasicPromise((resolve, reject) => { ... })`
- `.then(onFulfilled, onRejected)` (chainable)
- `.catch(onRejected)` (sugar)
- async handler execution (microtask if available, else timer)

It does **not** fully match native Promises (see “What this does NOT implement”).

---

## The smallest mental model

A Promise is just:

- a **state machine**: `pending -> fulfilled` OR `pending -> rejected`
- a stored **result slot**: fulfillment value OR rejection reason
- two **queues** of callbacks to run once it settles
- a chaining rule: `.then()` returns a **new** promise whose outcome depends on your handler’s return value / thrown error

---

## Implementation (BasicPromise)

```js
const STATE = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});

class BasicPromise {
  state = STATE.PENDING;
  value = undefined; // fulfillment value OR rejection reason (interpret via state)
  onFulfilledQueue = [];
  onRejectedQueue = [];

  constructor(executor) {
    const settle = (nextState, nextValue) => {
      // Always settle async (like native Promises).
      const enqueue =
        typeof queueMicrotask === "function"
          ? queueMicrotask
          : (fn) => setTimeout(fn, 0);

      enqueue(() => {
        if (this.state !== STATE.PENDING) return; // settle once
        this.state = nextState;
        this.value = nextValue;
        this.#drain();
      });
    };

    const resolve = (value) => settle(STATE.FULFILLED, value);
    const reject = (reason) => settle(STATE.REJECTED, reason);

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  #drain() {
    if (this.state === STATE.FULFILLED) {
      const q = this.onFulfilledQueue;
      this.onFulfilledQueue = [];
      this.onRejectedQueue = [];
      q.forEach((fn) => fn(this.value));
      return;
    }

    if (this.state === STATE.REJECTED) {
      const q = this.onRejectedQueue;
      this.onRejectedQueue = [];
      this.onFulfilledQueue = [];
      q.forEach((fn) => fn(this.value));
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };

    return new BasicPromise((resolveNext, rejectNext) => {
      this.onFulfilledQueue.push((value) => {
        try {
          resolveNext(realOnFulfilled(value));
        } catch (err) {
          rejectNext(err);
        }
      });

      this.onRejectedQueue.push((reason) => {
        try {
          resolveNext(realOnRejected(reason));
        } catch (err) {
          rejectNext(err);
        }
      });

      // Late subscribers: if already settled, flush queues immediately.
      this.#drain();
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}
```

---

## How the code works (walkthrough)

### 1) Construction + executor runs immediately

When you do:

```js
const p = new BasicPromise((resolve, reject) => {
  // ...
});
```

the executor runs right away. Any thrown error is caught and becomes a rejection:

```js
new BasicPromise(() => {
  throw new Error("boom");
}).catch((e) => console.log(e.message)); // "boom"
```

### 2) Resolve/reject are “one-shot”

The `settle(...)` function guards settlement:

```js
if (this.state !== "pending") return;
```

So only the **first** call wins:

```js
new BasicPromise((resolve, reject) => {
  resolve("ok");
  reject("nope");
}).then(console.log); // "ok"
```

### 3) Callbacks are queued while pending

`then(...)` doesn’t run your handler immediately. It **registers** wrapper callbacks into queues:

- `onFulfilledQueue` for success handlers
- `onRejectedQueue` for error handlers

When the promise settles, `#drain()` runs the correct queue.

### 4) Async timing is enforced

Native Promises run `.then()` handlers asynchronously (microtasks).
This implementation mimics that by scheduling settlement using:

- `queueMicrotask(fn)` when available
- otherwise `setTimeout(fn, 0)`

### 5) Chaining: why `.then()` returns a NEW promise

This is the key rule:

```js
const p2 = p1.then(handler);
```

`p2` should represent **the result of running** `handler`.

That’s why `then(...)` returns a new `BasicPromise` and resolves/rejects it based on what happens inside the wrapper:

- if `handler` returns a value, `p2` fulfills with that value
- if `handler` throws, `p2` rejects with that error

Example:

```js
new BasicPromise((resolve) => resolve(1))
  .then((n) => n + 1)
  .then((n) => console.log(n)); // 2

new BasicPromise((resolve) => resolve(1))
  .then(() => {
    throw new Error("boom");
  })
  .catch((e) => console.log(e.message)); // "boom"
```

---

## What this does NOT implement (on purpose)

Native Promises have more rules than this tiny version. This minimal implementation does **not** cover:

- **Thenable assimilation** (if a handler returns another promise/thenable, native Promises “adopt” it)
  - In this BasicPromise, returning another promise becomes just a “value” (no waiting).
- **Cycle detection** (returning the same promise in a chain should reject with `TypeError`)
- **`finally`** behavior
- **Static helpers**: `Promise.resolve`, `Promise.all`, `Promise.race`, etc.
- **Unhandled rejection tracking** (browser/Node policy)

These omissions are why this file is “basic”: it’s focused on the smallest useful mental model.

---

## Concepts and patterns used (the mental model)

- **State machine**: `pending -> fulfilled/rejected` exactly once.
- **Observer pattern (publish/subscribe)**:
  - `.then()` “subscribes” callbacks
  - settlement “publishes” the value/reason by draining a queue
- **Queue / eventing model**:
  - callbacks are stored until settlement, then run in registration order
- **Continuation passing / chaining**:
  - `.then()` wires your handler into the continuation of async work
- **Error boundary**:
  - `try/catch` inside the wrapper converts thrown errors into promise rejections

If you want the next step up, add “thenable assimilation” (adopt returned promises) — that’s the core feature that makes native promises feel like “flattening async”.

