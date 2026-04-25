# Overview: Callbacks in JavaScript

A teaching document for **what callbacks are**, **when they run**, **how they relate to scope, `this`, and execution contexts**, **common use cases**, **mental models**, **misconceptions**, and **anti-patterns**.

---

## What is a callback?

A **callback** is a function you **pass to another piece of code** so that code can **invoke it later**—either **immediately** in the same synchronous turn (e.g. `Array.prototype.map`) or **after something happens** (e.g. timers, DOM events, I/O completion).

| Idea | Meaning |
|------|--------|
| **Inversion of control** | The **host** (browser API, runtime, library, array method) decides **when** and **how often** your function runs. |
| **Registration vs invocation** | **Registration**: you pass the function. **Invocation**: the host calls it—possibly never, once, or many times. |
| **Lexical scope / closures** | The callback is still a normal function: it resolves free variables via the **lexical environment chain** (closures). |
| **`this`** | For normal functions, **`this` is determined by how the host calls the callback**, not by where you wrote your code (unless you used `bind`, or an arrow function). |

---

## Synchronous vs asynchronous callbacks

| Kind | When it runs | Examples |
|------|----------------|----------|
| **Synchronous** | Before the caller returns; same “turn” of the stack | `map`, `filter`, `reduce`, `forEach`, `sort` comparator |
| **Asynchronous** | After scheduling: timer, I/O, promise reaction, event | `setTimeout`, `addEventListener`, `fs.readFile` (Node), `.then()` |

Bugs often come from **assuming async callbacks run “right after the next line”**—they run when the **event loop** (and microtask vs macrotask ordering) allows.

---

## Common use cases

| Use case | Typical API / pattern | Sync vs async | What the callback represents |
|----------|----------------------|---------------|------------------------------|
| Transform / filter / aggregate | `map`, `filter`, `reduce`, `sort` | Usually **sync** | “Do this **per item**” |
| Iteration with side effects | `forEach` | **Sync** | “Run **for each** element” |
| Delayed or repeated work | `setTimeout`, `setInterval` | **Async** | “Run **after** time / **between** tasks” |
| User / system events | `addEventListener` | **Async** (event-driven) | “Run **when** X happens” |
| I/O completion | Node-style `(err, result) => …` | **Async** | “Continue **when** data is ready” |
| Framework lifecycle | hooks, middleware, cleanup | Mixed | “Run at a **phase** boundary” |
| Custom algorithms | your own higher-order functions | Either | “Plug behavior **into** my control flow” |

---

## Execution contexts when a callback runs “later”

Separate two ideas:

| Layer | What it answers |
|--------|------------------|
| **Call stack** | Which execution context is **actively running right now**. |
| **Queues / hosts** | What work is **waiting** (timers, task queue, microtasks, event dispatch). |

When you register a callback (for example `setTimeout(fn, 100)`):

1. Your code runs in **some** execution context on the stack.
2. The host **stores** the function value (and any captured arguments). The function object retains its **`[[Environment]]`** link—so it can still resolve outer variables (**closure**).
3. When the host is ready, the engine **pushes a new function execution context** for the callback and runs it—often **after** the code that registered it has **returned**.

**Takeaway:** the stack trace at **registration time** is not the stack trace at **invocation time**. Same callback, **new invocation**, **new** frame on the stack, **same** captured lexical chain (unless you closed over the wrong binding or stale data).

**Microtasks vs macrotasks:** Promise reactions (`.then`) run as **microtasks**, typically **before** the next timer/macrotask—ordering surprises are a common source of “impossible” bugs until you model the queues.

---

## Mental models and metaphors

| Metaphor | Intuition |
|----------|-----------|
| **Phone number** | You hand over a number (function); they call you when ready—not when you hand over the paper. |
| **Restaurant pager** | You register; your callback runs when the “table ready” event fires. |
| **Plugin slot** | The framework owns the loop; your callback is the plugin invoked at the right time. |
| **Two timelines** | **Registration time** vs **invocation time**—debugging is often about mixing these up. |

Technical model (often better than metaphors for debugging):

- **Who calls me?** Identify the **host** and its contract (sync vs async, error shape, return value ignored or not).
- **What did I close over?** Closures + mutable outer state explain many “stale” or “shared loop variable” bugs.

---

## How callbacks are commonly misunderstood

| Misconception | Reality |
|---------------|---------|
| “It runs immediately after this line.” | It runs when the **host** says so—maybe next tick, maybe on every click, maybe never. |
| “It still runs ‘inside’ my function on the stack.” | Later callbacks get a **new** invocation; the outer frame is often **gone**. |
| “My loop variable will be captured correctly.” | `var` in a loop often shares **one** binding; timing can expose the final value. |
| “Returning from the callback returns from the caller.” | Return values are often **ignored** by hosts (e.g. many event APIs). |
| “Callbacks mean parallel threads.” | JS on the main thread is **single-threaded** concurrency—**interleaving**, not free parallelism (workers aside). |

---

## Anti-patterns and common errors

| Anti-pattern / error | Symptom | Safer pattern |
|----------------------|---------|----------------|
| Closing over **`var`** in a loop + async | Every callback sees the **final** `i` | `let`, IIFE, or pass `i` as an argument |
| Wrong **`this`** when passing methods | `undefined` / wrong object | `bind`, wrap `() => obj.method()`, or avoid arrows for dynamic `this` |
| **Arrow as object method** when you need `this` from the call | Method does not receive the object as receiver | Use a normal method; bind when passing as callback |
| **Callback hell** (deep nesting) | Hard to read, hard errors | Named functions, modules, `async/await` where appropriate |
| **Node error-first** ignored | Silent failures, double handling | Always branch `if (err)`; document the contract |
| **Heavy work** in input/scroll/resize handlers | Jank | Debounce/throttle, `requestAnimationFrame`, reduce work |
| **Stale closure** over mutable shared state | “Why didn’t it see the update?” | Snapshot primitives, immutable updates, pass fresh data |
| **Leaks** (listeners, intervals) | Memory growth | `removeEventListener`, `clearInterval`, `AbortController`, `once` |
| **Microtask vs macrotask** confusion | Order-dependent bugs | Learn promise vs timer ordering; keep side effects explicit |

### Quick code: loop + async (classic)

```javascript
// Anti-pattern: var shares one binding across iterations
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3
}

// Fix: per-iteration binding with let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}
```

### Quick code: losing `this`

```javascript
const obj = {
  x: 1,
  getX() { return this.x; }
};

const getX = obj.getX;
getX(); // strict: undefined — not a method call

const bound = obj.getX.bind(obj);
bound(); // 1
```

---

## One-sentence summary

Callbacks are **functions you hand to a host**; the host **inverts control** of timing, while **lexical scope and closures** still govern variable lookup, **`this`** still follows **invocation rules** (except arrows), and **later** callbacks run in **new** execution contexts on the stack—often long after the code that registered them has finished.

---

## Related material in this repo

- Flashcards in this folder (`callback-basics-*.md`, `callback-browser-api-*.md`, `callback-modern-pattern-*.md`) drill specific APIs and patterns.
- For execution contexts, the scope chain, and the call stack, see `scope/model-execution-contexts-scope-chain-call-stack.md`.
