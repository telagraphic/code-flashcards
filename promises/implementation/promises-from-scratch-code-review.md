# Promises-from-scratch code review (`PromiseCustom`)

Below are answers to the questions at the top of your snippet, plus a refactor you can use as a studying template.

---

## Quick correctness notes (important)

Your snippet is close to a working “mini-promise”, but there are several bugs/typos that will confuse the mental model:

- **`constructor` catch block**:
  - `this.#onFail(e)` uses `e` but the variable is named `error`.
  - also you probably want to *reject with the thrown error* (and not `console.log` in a Promise implementation).
- **`#onFail` state guard is wrong**:
  - it currently says `if (this.#state !== STATE.REJECTED) return;`
  - it should be **pending guard**: `if (this.#state !== STATE.PENDING) return;`
- **`then()` has unreachable code**:
  - you `return new PromiseCustom(...)` and then call `this.#runCallbacks();` after the return (never runs).
  - you likely intended `this.#runCallbacks()` to run **before** returning.
- **`then()` has a missing `)` / `}` in the pasted snippet**
  - the first `this.#thenCallbacks.push(...)` isn’t closed before starting the catch push.
- **`finally()` rejection branch uses `result` but it doesn’t exist**
  - you wrote `}, () => { callback(); throw result; });` but `result` isn’t defined there.
  - also `finally` must rethrow the original error *after* `callback()` finishes.

I’ll answer your questions based on the *intended design*, and I’ll also show how those bugs affect the timing/state.

---

## 1) Pseudocode walkthrough: how calls relate to state and methods

### The intended moving parts

- **State fields**
  - `#state`: `"PENDING" | "FULFILLED" | "REJECTED"`
  - `#value`: stores either:
    - the fulfillment value, *or*
    - the rejection reason (your code uses one slot for both)
- **Callback queues**
  - `#thenCallbacks`: functions to call when fulfilled
  - `#catchCallbacks`: functions to call when rejected
- **Resolver functions**
  - `#onSuccess(value)` is the “resolve”
  - `#onFail(reason)` is the “reject”

### Timeline pseudocode (high level)

```text
new PromiseCustom(executor):
  create empty then queue + catch queue
  state = PENDING
  value = undefined

  try:
    call executor(resolveBound, rejectBound)
  catch err:
    rejectBound(err)

resolveBound(x):
  schedule microtask:
    if state is not PENDING: return
    if x is PromiseCustom:
      x.then(resolveBound, rejectBound)     // "adopt" x
      return
    value = x
    state = FULFILLED
    runCallbacks()

rejectBound(e):
  schedule microtask:
    if state is not PENDING: return
    if e is PromiseCustom:
      e.then(resolveBound, rejectBound)     // (unusual but allowed)
      return
    value = e
    state = REJECTED
    runCallbacks()

runCallbacks():
  if state == FULFILLED:
    for each fn in thenQueue: fn(value)
    clear thenQueue
    clear catchQueue            // optional

  if state == REJECTED:
    for each fn in catchQueue: fn(value)
    clear catchQueue
    clear thenQueue             // optional

then(onFulfilled, onRejected):
  return new PromiseCustom((resolveNext, rejectNext) => {
    add a wrapper into thenQueue:
      wrapper(result):
        if onFulfilled missing: resolveNext(result)
        else:
          try:
            out = onFulfilled(result)
            resolveNext(out)    // (if out is promise-like, resolveNext adopts it)
          catch err:
            rejectNext(err)

    add a wrapper into catchQueue:
      wrapper(reason):
        if onRejected missing: rejectNext(reason)   // intended
        else:
          try:
            out = onRejected(reason)
            resolveNext(out)
          catch err:
            rejectNext(err)
  })

  runCallbacks() // if already settled, flush immediately (async wrappers handle microtask)
```

### How this ties together

- The **constructor** runs the executor immediately, giving it `resolve`/`reject`.
- `resolve`/`reject` do **not** run callbacks immediately. They schedule a microtask to:
  - settle the state/value
  - flush queued handlers using `#runCallbacks()`
- `.then()` **registers** work to do later:
  - it pushes wrapper functions into queues
  - it returns a *new promise* representing “the result of running those wrappers”

---

## 2) “How is `#value` being set in `#onSuccess` / `#onFail`?”

Think of `#value` as the promise’s “single mailbox slot”:

- When you call `resolve("we good")`, the promise will (in a microtask) do:
  - `this.#value = "we good"`
  - `this.#state = FULFILLED`
- When you call `reject("nope")`, the promise will (in a microtask) do:
  - `this.#value = "nope"`
  - `this.#state = REJECTED`

### Why it feels confusing

- Real Promises conceptually have “fulfillment value” vs “rejection reason”.
- Your implementation stores **either one** in the same field `#value`.
  - This is fine, but you must interpret it based on `#state`.

### Mini concrete trace (your bottom example)

```js
const promise = new PromiseCustom((resolve, reject) => {
  resolve("we good");
  reject("nope");
});
```

What *should* happen:

1. `resolve("we good")` schedules a microtask to fulfill later.
2. `reject("nope")` schedules a microtask to reject later.
3. First microtask runs:
   - state is `PENDING` → allowed to settle
   - sets `#value = "we good"`, `#state = FULFILLED`
4. Second microtask runs:
   - state is no longer `PENDING` → ignored

So you end with:

- `#state === FULFILLED`
- `#value === "we good"`

---

## 3) Why call `#runCallbacks()` inside `.then()`? (Timing issue)

This is about the “late subscriber” problem:

```js
const p = new PromiseCustom((resolve) => resolve(123));

// attach later
setTimeout(() => {
  p.then(v => console.log(v));
}, 0);
```

If the promise already settled **before** you attach `.then()`, then:

- the promise has already run `#runCallbacks()` at settle-time
- but at that moment the queues were empty

So `.then()` usually does:

- enqueue wrappers
- then call `#runCallbacks()` to “flush immediately if already settled”

### The microtask detail

Native Promises guarantee `.then()` callbacks run asynchronously (microtasks), even when already settled:

```js
const logs = [];
Promise.resolve().then(() => logs.push("then"));
logs.push("sync");
// logs becomes ["sync", "then"]
```

Your code uses `queueMicrotask` inside `#onSuccess/#onFail`, which helps ensure “settlement + callback execution” occurs in microtasks.

But **you still need `#runCallbacks()` in `.then()`** for this scenario:

```js
const p = new PromiseCustom((resolve) => {
  // settle on a microtask
  resolve("ok");
});

// attach after the promise is already fulfilled
queueMicrotask(() => {
  p.then(v => console.log(v));
});
```

By the time that second microtask runs, the promise is already `FULFILLED`. If `.then()` only pushed into the queue and didn’t “flush”, nothing would trigger draining the queue anymore.

---

## 4) Why we need bound functions for `this` binding

In JavaScript, a method’s `this` depends on *how it’s called*, not where it was defined.

In your constructor you do:

```js
callback(this.#onSuccessBound, this.#onFailBound)
```

Inside the executor, the interviewee typically writes:

```js
resolve("value");
```

That’s a **plain function call**. If you passed the raw private method `this.#onSuccess` without binding:

- it would be invoked with `this === undefined` (in strict mode)
- accessing `this.#state` would throw, because `this` is not your instance

Binding fixes that by permanently attaching the instance:

```text
onSuccessBound(value)  --> calls #onSuccess with this = PromiseCustom instance
```

Alternative patterns that also work:

- define resolver functions as arrow fields (auto-capture `this`)
- create local closures in the constructor:
  - `const resolve = (v) => this.#onSuccess(v)`

---

## 5) Explain the `.then()` “result callback” wrapper

This part:

```js
this.#thenCallbacks.push(result => {
  if (thenCallback == null) {
    resolve(result);
    return;
  }
  try {
    resolve(thenCallback(result));
  } catch (error) {
    reject(error);
  }
});
```

…is the core of chaining.

### What it’s doing conceptually

When you call:

```js
const p2 = p1.then(fn);
```

You are creating a *new promise* `p2` that represents:

- “run `fn` when `p1` fulfills”
- “if `fn` returns a value → fulfill `p2` with it”
- “if `fn` throws → reject `p2` with that error”
- “if `fn` returns a promise-like → adopt that promise-like for `p2`”

So the wrapper is a bridge from:

- the old promise’s eventual value (`result`)
to
- the new promise’s resolution (`resolve`/`reject`)

### Why the wrapper is needed (not just storing `thenCallback`)

Because `.then()` must return a **new promise** and wire up the rules:

- default handler passthrough
- try/catch around handler execution
- resolving the next promise based on handler output

If you only stored the raw user callback, you’d have nowhere to:

- catch errors
- decide how to resolve the returned promise

### One key bug in your rejection wrapper

In your snippet, the catch wrapper does:

```js
if (catchCallback == null) {
  resolve(result);
  return;
}
```

For correct propagation it should be:

- if there is no catch handler, **reject** the next promise with the same reason

So it should be `reject(reason)`, not `resolve(reason)`.

---

## 6) Refactored version (enclosed in class, easier to follow, with JSDoc)

This refactor keeps your “learning promise” scope:

- private fields for state/value
- queues for handlers
- microtask scheduling
- adoption of `PromiseCustom` instances (and a minimal thenable adoption)

It also fixes the bugs mentioned above and makes the flow more explicit.

```js
const STATE = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});

/**
 * A small Promise-like implementation for study purposes.
 * Not production-ready, but it demonstrates the core mechanics:
 * - pending/fulfilled/rejected state
 * - handler queues
 * - chaining via then/catch/finally
 * - adopting returned promise-like values
 */
class PromiseCustom {
  #state = STATE.PENDING;
  #value = undefined; // fulfillment value OR rejection reason (interpret via #state)
  #thenQueue = [];
  #catchQueue = [];

  // Passing these into the executor requires stable `this`.
  #resolve = (value) => this.#settleFulfilled(value);
  #reject = (reason) => this.#settleRejected(reason);

  /**
   * @param {(resolve: (value:any)=>void, reject: (reason:any)=>void) => void} executor
   */
  constructor(executor) {
    try {
      executor(this.#resolve, this.#reject);
    } catch (err) {
      this.#reject(err);
    }
  }

  #enqueueMicrotask(fn) {
    if (typeof queueMicrotask === "function") queueMicrotask(fn);
    else setTimeout(fn, 0);
  }

  #isPromiseLike(x) {
    return (
      x != null &&
      (typeof x === "object" || typeof x === "function") &&
      typeof x.then === "function"
    );
  }

  #settleFulfilled(value) {
    this.#enqueueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;
      this.#adopt(value, STATE.FULFILLED);
    });
  }

  #settleRejected(reason) {
    this.#enqueueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;
      this.#adopt(reason, STATE.REJECTED);
    });
  }

  /**
   * Adopt another promise/thenable, or settle with a plain value/reason.
   * @param {any} x
   * @param {"fulfilled"|"rejected"} targetState
   */
  #adopt(x, targetState) {
    // If resolving with a PromiseCustom, adopt its eventual state.
    if (x instanceof PromiseCustom) {
      x.then(this.#resolve, this.#reject);
      return;
    }

    // Minimal thenable adoption (optional for learning; useful for finally chaining)
    if (targetState === STATE.FULFILLED && this.#isPromiseLike(x)) {
      let called = false;
      try {
        x.then(
          (v) => {
            if (called) return;
            called = true;
            this.#resolve(v);
          },
          (e) => {
            if (called) return;
            called = true;
            this.#reject(e);
          }
        );
      } catch (err) {
        this.#reject(err);
      }
      return;
    }

    this.#value = x;
    this.#state = targetState;
    this.#drainQueues();
  }

  #drainQueues() {
    if (this.#state === STATE.FULFILLED) {
      const q = this.#thenQueue;
      this.#thenQueue = [];
      this.#catchQueue = []; // drop catch handlers once fulfilled
      q.forEach((fn) => fn(this.#value));
      return;
    }

    if (this.#state === STATE.REJECTED) {
      const q = this.#catchQueue;
      this.#catchQueue = [];
      this.#thenQueue = []; // drop then handlers once rejected
      q.forEach((fn) => fn(this.#value));
    }
  }

  /**
   * @param {(value:any)=>any} [onFulfilled]
   * @param {(reason:any)=>any} [onRejected]
   * @returns {PromiseCustom}
   */
  then(onFulfilled, onRejected) {
    return new PromiseCustom((resolveNext, rejectNext) => {
      this.#thenQueue.push((value) => {
        if (typeof onFulfilled !== "function") {
          resolveNext(value);
          return;
        }
        try {
          resolveNext(onFulfilled(value));
        } catch (err) {
          rejectNext(err);
        }
      });

      this.#catchQueue.push((reason) => {
        if (typeof onRejected !== "function") {
          rejectNext(reason); // propagate rejection
          return;
        }
        try {
          resolveNext(onRejected(reason));
        } catch (err) {
          rejectNext(err);
        }
      });

      // If already settled, flush now (handlers still run async due to microtask settle)
      this.#drainQueues();
    });
  }

  /**
   * @param {(reason:any)=>any} onRejected
   * @returns {PromiseCustom}
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * @param {()=>any} onFinally
   * @returns {PromiseCustom}
   */
  finally(onFinally) {
    return this.then(
      (value) => {
        const r = typeof onFinally === "function" ? onFinally() : undefined;
        return PromiseCustom.resolve(r).then(() => value);
      },
      (reason) => {
        const r = typeof onFinally === "function" ? onFinally() : undefined;
        return PromiseCustom.resolve(r).then(() => {
          throw reason;
        });
      }
    );
  }

  /**
   * @param {any} value
   * @returns {PromiseCustom}
   */
  static resolve(value) {
    if (value instanceof PromiseCustom) return value;
    return new PromiseCustom((resolve) => resolve(value));
  }

  /**
   * @param {any} reason
   * @returns {PromiseCustom}
   */
  static reject(reason) {
    return new PromiseCustom((_, reject) => reject(reason));
  }
}
```

### What to study in the refactor

- The *only* places that mutate state/value are `#adopt()` and the settle helpers.
- `.then()` creates a new promise and pushes **wrappers** that resolve/reject that next promise.
- Binding is handled via arrow fields (`#resolve`, `#reject`) instead of `.bind`.
- `finally()` is built using `.then()` and `PromiseCustom.resolve(...)` to support waiting on cleanup.


