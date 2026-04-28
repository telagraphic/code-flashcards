# Interview challenge: build `Promise` from scratch (JavaScript)

This is a progressive interview ladder. Each level asks you to implement a *subset* of Promise behavior, with increasing correctness requirements.

Rules of the interview:

- You are **not** allowed to use native `Promise` internally.
- You may use `queueMicrotask` (preferred) or `setTimeout(fn, 0)` (fallback) to schedule async callbacks.
- Focus on correctness and a clean API. Don’t over-optimize.

---

## Level 0: setup scaffolding (tiny warmup)

### Prompt

Create a class `MyPromise` that can be constructed like:

```js
const p = new MyPromise((resolve, reject) => {
  // call resolve(value) or reject(error)
});
```

For now, just store state and the settled value/reason. Don’t implement chaining yet.

### Acceptance criteria

- `new MyPromise(executor)` calls `executor(resolve, reject)` immediately.
- If `executor` throws, the promise becomes **rejected** with that error.
- A promise can settle **once**: subsequent `resolve/reject` calls do nothing.
- Internal states: `"pending" | "fulfilled" | "rejected"`.

### Hints

- Track:
  - `state`
  - `value` (for fulfilled)
  - `reason` (for rejected)
- Guard with `if (state !== "pending") return;`.

### Solution (Level 0)

```js
const STATE = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});

class MyPromise {
  #state = STATE.PENDING;
  #value = undefined; // fulfillment value OR rejection reason

  constructor(executor) {
    const resolve = (value) => {
      if (this.#state !== STATE.PENDING) return;
      this.#state = STATE.FULFILLED;
      this.#value = value;
    };

    const reject = (reason) => {
      if (this.#state !== STATE.PENDING) return;
      this.#state = STATE.REJECTED;
      this.#value = reason;
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
}
```

---

## Level 1 (basic): `.then()` for already-settled + pending

### Prompt

Implement `.then(onFulfilled, onRejected)` such that callbacks run when the promise is fulfilled/rejected.

At this level:

- `.then()` may return a *new* `MyPromise`, but you can keep the resolution logic simple (no thenable assimilation yet).
- You must support attaching `.then()` handlers *before* and *after* settlement.

### Acceptance criteria

- `onFulfilled` runs with the fulfillment value.
- `onRejected` runs with the rejection reason.
- If the promise is already settled, the handler still runs (async).
- If the promise is pending, handlers are queued and run on settlement (async).
- `.then()` returns a new `MyPromise` (chainable), and:
  - if the handler returns a value `x`, the next promise fulfills with `x`
  - if the handler throws, the next promise rejects with that thrown error
- If `onFulfilled` is not a function, treat it like `(v) => v`.
- If `onRejected` is not a function, treat it like `(e) => { throw e; }`.

### Hints

- Store arrays like `onFulfilledQueue` and `onRejectedQueue` while pending.
- Always schedule handlers asynchronously:
  - prefer `queueMicrotask(() => handler(value))`
  - fallback to `setTimeout(() => handler(value), 0)`
- Returning a chained promise is easiest if `.then()` constructs a new `MyPromise` and resolves/rejects it based on the handler outcome.

### Solution (Level 1)

```js
const STATE = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});

class MyPromise {
  #state = STATE.PENDING;
  #value = undefined;
  #onFulfilledQueue = [];
  #onRejectedQueue = [];

  constructor(executor) {
    const resolve = (value) => {
      queueMicrotask(() => {
        if (this.#state !== STATE.PENDING) return;
        this.#state = STATE.FULFILLED;
        this.#value = value;
        this.#runQueues();
      });
    };

    const reject = (reason) => {
      queueMicrotask(() => {
        if (this.#state !== STATE.PENDING) return;
        this.#state = STATE.REJECTED;
        this.#value = reason;
        this.#runQueues();
      });
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  #runQueues() {
    if (this.#state === STATE.FULFILLED) {
      const q = this.#onFulfilledQueue;
      this.#onFulfilledQueue = [];
      this.#onRejectedQueue = [];
      q.forEach((fn) => fn(this.#value));
      return;
    }

    if (this.#state === STATE.REJECTED) {
      const q = this.#onRejectedQueue;
      this.#onRejectedQueue = [];
      this.#onFulfilledQueue = [];
      q.forEach((fn) => fn(this.#value));
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

    return new MyPromise((resolve, reject) => {
      this.#onFulfilledQueue.push((value) => {
        try {
          resolve(realOnFulfilled(value));
        } catch (err) {
          reject(err);
        }
      });

      this.#onRejectedQueue.push((reason) => {
        try {
          resolve(realOnRejected(reason));
        } catch (err) {
          reject(err);
        }
      });

      // If already settled, flush immediately.
      this.#runQueues();
    });
  }
}
```

---

## Level 2 (basic): `.catch()` and `.finally()`

### Prompt

Add:

- `.catch(onRejected)` as sugar for `.then(undefined, onRejected)`
- `.finally(onFinally)` that runs regardless of outcome, and passes through the original value/reason

### Acceptance criteria

- `.catch(fn)` behaves like `.then(undefined, fn)`.
- `.finally(fn)`:
  - runs for both fulfillment and rejection
  - does **not** change the chain value unless `fn` throws or returns a rejecting thenable/promise
  - if `fn` throws, the chain becomes rejected with that error
  - if `fn` returns a promise-like, wait for it before continuing

### Hints

- You can implement `.finally(fn)` in terms of `.then()`:
  - success path: run `fn()`, then re-emit the original value
  - error path: run `fn()`, then rethrow the original error
- This is the first point where “wait for returned promise-like” matters. You can handle it minimally:
  - if `result` has a callable `.then`, treat it as thenable and chain it.

### Solution (Level 2)

```js
// This snippet is meant to be added to the Level 1 class.
class MyPromise {
  // ... Level 1 ...

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        const r = typeof onFinally === "function" ? onFinally() : undefined;
        return MyPromise.resolve(r).then(() => value);
      },
      (reason) => {
        const r = typeof onFinally === "function" ? onFinally() : undefined;
        return MyPromise.resolve(r).then(() => {
          throw reason;
        });
      }
    );
  }

  static resolve(x) {
    if (x instanceof MyPromise) return x;
    // Minimal thenable adoption (enough for finally chaining)
    if (x != null && (typeof x === "object" || typeof x === "function")) {
      try {
        const then = x.then;
        if (typeof then === "function") {
          return new MyPromise((resolve, reject) => then.call(x, resolve, reject));
        }
      } catch (err) {
        return MyPromise.reject(err);
      }
    }
    return new MyPromise((resolve) => resolve(x));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
```

---

## Level 3 (medium): correct error propagation + “thenable assimilation”

### Prompt

Make chaining behave like real Promises when handlers return:

- a plain value
- a thrown error
- the same promise (cycle)
- another `MyPromise`
- a thenable object `{ then(resolve, reject) { ... } }`

This is the heart of Promises/A+ style resolution.

### Acceptance criteria

- **Cycle detection**: if a handler returns the *same* promise you’re trying to resolve, reject with a `TypeError`.
- If a handler returns another promise/thenable, the next promise **adopts** its eventual state.
- If reading `then` throws (e.g. getter throws), reject with that error.
- If a thenable calls `resolve`/`reject` multiple times, only the first call wins.
- If `onRejected` is missing, rejections propagate down the chain unchanged.

### Hints

- Write a helper like `resolvePromise(nextPromise, x, resolve, reject)` (classic approach):
  - if `x === nextPromise` → reject `TypeError`
  - if `x` is object/function, try to read `then`
  - if `then` is a function, call it with `x` as `this`, and guard with a `called` flag
  - else resolve with `x`
- Treat “promise-like” as:
  - `x instanceof MyPromise` **or**
  - `x !== null && (typeof x === "object" || typeof x === "function") && typeof x.then === "function"`
- Keep handler invocation async, but resolution logic must be correct regardless of timing.

### Solution (Level 3)

```js
const STATE = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});

function resolvePromise(nextPromise, x, resolve, reject) {
  if (x === nextPromise) {
    reject(new TypeError("Chaining cycle detected"));
    return;
  }

  if (x != null && (typeof x === "object" || typeof x === "function")) {
    let then;
    try {
      then = x.then;
    } catch (err) {
      reject(err);
      return;
    }

    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(nextPromise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (err) {
        if (!called) reject(err);
      }
      return;
    }
  }

  resolve(x);
}

class MyPromise {
  #state = STATE.PENDING;
  #value = undefined;
  #onFulfilledQueue = [];
  #onRejectedQueue = [];

  constructor(executor) {
    const resolve = (value) => {
      queueMicrotask(() => {
        if (this.#state !== STATE.PENDING) return;
        this.#state = STATE.FULFILLED;
        this.#value = value;
        this.#runQueues();
      });
    };

    const reject = (reason) => {
      queueMicrotask(() => {
        if (this.#state !== STATE.PENDING) return;
        this.#state = STATE.REJECTED;
        this.#value = reason;
        this.#runQueues();
      });
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  #runQueues() {
    if (this.#state === STATE.FULFILLED) {
      const q = this.#onFulfilledQueue;
      this.#onFulfilledQueue = [];
      this.#onRejectedQueue = [];
      q.forEach((fn) => fn(this.#value));
      return;
    }
    if (this.#state === STATE.REJECTED) {
      const q = this.#onRejectedQueue;
      this.#onRejectedQueue = [];
      this.#onFulfilledQueue = [];
      q.forEach((fn) => fn(this.#value));
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

    const nextPromise = new MyPromise((resolve, reject) => {
      this.#onFulfilledQueue.push((value) => {
        try {
          const x = realOnFulfilled(value);
          resolvePromise(nextPromise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });

      this.#onRejectedQueue.push((reason) => {
        try {
          const x = realOnRejected(reason);
          resolvePromise(nextPromise, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      });

      this.#runQueues();
    });

    return nextPromise;
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => MyPromise.resolve(onFinally?.()).then(() => value),
      (reason) =>
        MyPromise.resolve(onFinally?.()).then(() => {
          throw reason;
        })
    );
  }

  static resolve(x) {
    if (x instanceof MyPromise) return x;
    return new MyPromise((resolve) => resolve(x));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
```

---

## Level 4 (medium+): executor edge cases + unhandled flows (policy choices)

### Prompt

Improve robustness around tricky behaviors:

- executor throws after calling resolve/reject
- handler throws inside queued callbacks
- multiple `.then()` registrations
- (optional) unhandled rejection tracking

### Acceptance criteria

- If executor calls `resolve(value)` and later throws, the promise stays fulfilled (throw is ignored).
- Multiple `.then()` handlers on the same promise all run in registration order.
- Errors thrown inside handlers reject the returned chained promise (not crash the process).

### Hints

- Remember: once settled, everything else is a no-op.
- Keep queues; on settle, drain them in order.
- Each `.then()` creates an independent “next promise” that must be resolved based on *that* handler’s result.

### Solution (Level 4)

If you use the Level 3 implementation above, you already satisfy the Level 4 acceptance criteria (except the optional “unhandled rejection tracking” policy).

---

## Level 5 (hard): static methods (core set)

### Prompt

Implement the static API on `MyPromise`:

- `MyPromise.resolve(value)`
- `MyPromise.reject(reason)`
- `MyPromise.all(iterable)`
- `MyPromise.race(iterable)`

### Acceptance criteria

- `resolve(value)`:
  - if `value` is a `MyPromise`, return it
  - if `value` is a thenable, adopt it
  - else return a fulfilled `MyPromise` with `value`
- `reject(reason)` returns a rejected `MyPromise`.
- `all(iterable)`:
  - resolves to an array of values in **input order**
  - rejects immediately on the first rejection
  - handles non-promise values by treating them as already-fulfilled
  - resolves `[]` for an empty iterable
- `race(iterable)` settles as soon as any input settles (including non-promise values).

### Hints

- Convert each item to a promise via `MyPromise.resolve(item)`.
- For `all`, you need:
  - a result array
  - a `remaining` counter
  - per-index assignment
- Watch the difference between **completion order** vs **result order** (must be input order).

### Solution (Level 5)

```js
// Add these statics onto the Level 3 class.
class MyPromise {
  // ... Level 3 ...

  static all(iterable) {
    return new MyPromise((resolve, reject) => {
      const items = Array.from(iterable);
      if (items.length === 0) {
        resolve([]);
        return;
      }

      const results = new Array(items.length);
      let remaining = items.length;

      items.forEach((item, i) => {
        MyPromise.resolve(item).then(
          (value) => {
            results[i] = value;
            remaining -= 1;
            if (remaining === 0) resolve(results);
          },
          (err) => reject(err)
        );
      });
    });
  }

  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      for (const item of iterable) {
        MyPromise.resolve(item).then(resolve, reject);
      }
    });
  }
}
```

---

## Level 6 (hard): the rest of the static methods

### Prompt

Add:

- `MyPromise.allSettled(iterable)`
- `MyPromise.any(iterable)`

### Acceptance criteria

- `allSettled(iterable)`:
  - always fulfills with an array of `{ status, value }` or `{ status, reason }`
  - preserves input order
  - resolves `[]` for an empty iterable
- `any(iterable)`:
  - fulfills on the first fulfillment
  - rejects only if *all* inputs reject
  - the rejection should be an `AggregateError` (or a reasonable polyfill) containing all rejection reasons
  - if iterable is empty, reject with `AggregateError([])` (matching the spirit of native behavior)

### Hints

- `allSettled` is like `all`, but you never early-reject—every input maps to a “settled record”.
- `any` is like the inverse of `all`:
  - count rejections
  - store reasons by index
  - when rejection count hits total, reject with aggregate
- If the environment doesn’t have `AggregateError`, you can implement a minimal one:
  - `class AggregateError extends Error { constructor(errors, message) { ... } }`

### Solution (Level 6)

```js
// Add these statics onto the Level 5 class.
class MyPromise {
  // ... Level 3 + Level 5 ...

  static allSettled(iterable) {
    return new MyPromise((resolve) => {
      const items = Array.from(iterable);
      if (items.length === 0) {
        resolve([]);
        return;
      }

      const results = new Array(items.length);
      let remaining = items.length;

      items.forEach((item, i) => {
        MyPromise.resolve(item).then(
          (value) => {
            results[i] = { status: "fulfilled", value };
            remaining -= 1;
            if (remaining === 0) resolve(results);
          },
          (reason) => {
            results[i] = { status: "rejected", reason };
            remaining -= 1;
            if (remaining === 0) resolve(results);
          }
        );
      });
    });
  }

  static any(iterable) {
    return new MyPromise((resolve, reject) => {
      const items = Array.from(iterable);
      if (items.length === 0) {
        const agg =
          typeof AggregateError === "function"
            ? new AggregateError([], "All promises were rejected")
            : Object.assign(new Error("All promises were rejected"), {
                name: "AggregateError",
                errors: [],
              });
        reject(agg);
        return;
      }

      const reasons = new Array(items.length);
      let rejectedCount = 0;

      items.forEach((item, i) => {
        MyPromise.resolve(item).then(
          (value) => resolve(value),
          (reason) => {
            reasons[i] = reason;
            rejectedCount += 1;
            if (rejectedCount === items.length) {
              const agg =
                typeof AggregateError === "function"
                  ? new AggregateError(reasons, "All promises were rejected")
                  : Object.assign(new Error("All promises were rejected"), {
                      name: "AggregateError",
                      errors: reasons,
                    });
              reject(agg);
            }
          }
        );
      });
    });
  }
}
```

---

## Suggested test cases (use these to self-check)

### Basic state + settlement

```js
new MyPromise((resolve) => resolve(1)).then((v) => console.log(v)); // 1
new MyPromise((_, reject) => reject("x")).catch((e) => console.log(e)); // x
```

### Async handler timing

```js
const logs = [];
new MyPromise((resolve) => resolve(1)).then(() => logs.push("then"));
logs.push("sync");
setTimeout(() => console.log(logs), 0); // ["sync", "then"]
```

### Value propagation

```js
new MyPromise((resolve) => resolve(1))
  .then((v) => v + 1)
  .then((v) => console.log(v)); // 2
```

### Error propagation

```js
new MyPromise((resolve) => resolve(1))
  .then(() => { throw new Error("boom"); })
  .catch((e) => console.log(e.message)); // boom
```

### Thenable assimilation (medium+)

```js
const thenable = { then(res) { res(42); } };
MyPromise.resolve(thenable).then((v) => console.log(v)); // 42
```

### `all` ordering

```js
const a = new MyPromise((r) => setTimeout(() => r("a"), 10));
const b = new MyPromise((r) => setTimeout(() => r("b"), 0));
MyPromise.all([a, b]).then((xs) => console.log(xs)); // ["a", "b"]
```

