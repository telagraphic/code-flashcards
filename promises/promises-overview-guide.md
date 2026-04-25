# Promises: a practical modern guide (JavaScript)

Promises are the core building block for async code in modern JavaScript. Most APIs you use day-to-day already return Promises (like `fetch()`), and `async/await` is mostly “syntax over Promises”.

This guide focuses on: choosing `.then/.catch/.finally` vs `async/await`, using `try...catch` correctly, and practical patterns you’ll actually use (timeouts, debounce, throttle, retries, concurrency).

---

## Mental model (use this to avoid confusion)

- A **Promise** represents a value you don’t have *yet*.
- A Promise is always in one of three states: **pending**, **fulfilled**, **rejected**.
- A Promise settles **once**. After it’s fulfilled/rejected, it cannot change.
- **`.then()`** attaches a “what to do on success” continuation.
- **`.catch()`** attaches a “what to do on error” continuation.
- **`.finally()`** attaches “always run this cleanup”, regardless of success/error.
- **`async/await`** is syntax that lets you write the same continuation logic in a more linear style.

---

## When to use basic Promises (`then`, `catch`, `finally`)

Use `.then/.catch/.finally` when you want:

- **Simple single-step flows**: “do X, then do Y”.
- **Quick inline transformations**: map a result without changing surrounding code.
- **Library integration**: you’re already in a Promise-based API and want to return a Promise.
- **Parallel work**: it’s often clearer to build arrays of Promises and combine them (`Promise.all`, `allSettled`, `any`).
- **One-off cleanup**: `.finally()` for stop-spinners / close resources.

### Example: basic success/error/cleanup

```js
startSpinner();

fetch("/api/user")
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then((user) => {
    renderUser(user);
  })
  .catch((err) => {
    showError(err.message);
  })
  .finally(() => {
    stopSpinner();
  });
```

### Common pitfall: forgetting to return in a chain

```js
// BUG: the inner Promise isn't returned, so callers can't wait for it.
function saveUser(user) {
  return fetch("/api/user", { method: "POST", body: JSON.stringify(user) })
    .then((res) => res.json())
    .then((data) => {
      fetch(`/api/user/${data.id}/audit`, { method: "POST" }); // missing return
    });
}

// FIX: return the Promise so the chain waits for it.
function saveUserFixed(user) {
  return fetch("/api/user", { method: "POST", body: JSON.stringify(user) })
    .then((res) => res.json())
    .then((data) => {
      return fetch(`/api/user/${data.id}/audit`, { method: "POST" });
    });
}
```

---

## When to use `async/await`

Use `async/await` when you want:

- **Multiple sequential steps** with early exits, branching, loops, or intermediate variables.
- **`try...catch` error handling** that reads like synchronous code.
- **Readable control flow**: `if`, `for`, `while`, `return`, `throw` in the same block.
- **Complex error policy**: recover some errors, rethrow others, attach context.

### Example: readable multi-step flow

```js
async function submitForm(formData) {
  startSpinner();
  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const result = await res.json();
    showSuccess("Submitted!");
    return result;
  } catch (err) {
    showError("Submission failed");
    throw err; // rethrow if callers need to handle it
  } finally {
    stopSpinner();
  }
}
```

### Common pitfall: `await` in a loop that should be parallel

```js
// Sequential (often slower)
for (const id of ids) {
  const res = await fetch(`/api/items/${id}`);
  items.push(await res.json());
}

// Parallel (often faster)
const items = await Promise.all(
  ids.map(async (id) => {
    const res = await fetch(`/api/items/${id}`);
    return res.json();
  })
);
```

---

## When and how to use `try...catch` with Promises

### Key rule

- **`try...catch` only catches errors that occur in the same synchronous turn**.
- It *does* catch errors from awaited Promises because `await` “re-throws” the rejection at the `await` point.
- It *does not* catch errors that happen later inside a Promise chain unless you `await` it or attach `.catch()`.

### Correct: `try...catch` + `await`

```js
async function loadUser() {
  try {
    const res = await fetch("/api/user");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // Handles network errors, non-ok status thrown above, JSON parse errors, etc.
    console.error("loadUser failed:", err);
    return null; // or rethrow
  }
}
```

### Incorrect: `try...catch` around a Promise without awaiting

```js
try {
  // This returns immediately; errors happen later.
  fetch("/api/user").then((res) => res.json());
} catch (err) {
  // Won't run for fetch rejection or errors inside .then()
  console.log("not reached for async failures");
}
```

### Fix: either `await` or attach `.catch()`

```js
// Option A: await it
try {
  const data = await fetch("/api/user").then((r) => r.json());
} catch (err) {
  console.error(err);
}

// Option B: chain catch
fetch("/api/user")
  .then((r) => r.json())
  .catch((err) => console.error(err));
```

---

## Best use cases (what to pick and when)

| Approach | Best when | Avoid when | Notes |
|---|---|---|---|
| `.then()` | small transformations, minimal control flow | you need loops/branches/early returns | Return Promises from handlers to keep the chain “linked”. |
| `.catch()` | local error handling for a chain | you need different handling per step but the chain becomes hard to read | Prefer one `.catch()` at the end for a chain unless you are intentionally recovering mid-chain. |
| `.finally()` | cleanup (stop spinner, release lock, close resource) | you need the result value (finally doesn’t get it) | `.finally()` runs regardless; it doesn’t receive the resolved value. |
| `async/await` | sequential workflows, readable code, local variables | you need to build a big parallel pipeline and `await` scatters across functions | Use `Promise.all`/`allSettled` for parallelism; `await` for sequencing. |
| `try...catch` + `await` | error handling across multiple awaits | you’re not awaiting (try/catch won’t catch later rejections) | Use `finally` for cleanup; rethrow if callers need to know. |

---

## Other approaches you should know (commonly “missing”)

### Promise combinators (parallelism + error policy)

| Method | Purpose (multiple requests) | When to use | When to avoid | Result shape |
|---|---|---|---|---|
| `Promise.all([...])` | **Run in parallel, fail fast** if any reject | You need *all* results (e.g. load page data dependencies) | Partial success is acceptable; one failure shouldn’t kill everything | Resolves to `T[]` (in input order) or rejects with the **first rejection** |
| `Promise.allSettled([...])` | **Run in parallel, never fail fast**; wait for all outcomes | “Best effort” UIs (dashboards), collecting successes + errors | You actually want to stop on first failure (extra work) | Resolves to `{ status, value/reason }[]` (one per input) |
| `Promise.race([...])` | **First settled wins** (resolve *or* reject) | Timeouts, picking first response regardless of outcome, “first answer wins” logic | You specifically need the first **successful** result | Resolves/rejects with the first settled Promise’s value/reason |
| `Promise.any([...])` | **First fulfilled wins** (ignores rejections until all reject) | Multiple sources where any success is fine (cache vs network, redundant endpoints) | You need to know about *all* failures, or need “first settled” behavior | Resolves with first fulfilled value; rejects with `AggregateError` if all reject |



---

## Summary of Concurrency Methods


| Method | What it waits for | When it **resolves** | When it **rejects** | What you get back | Typical use case |
|---|---|---|---|---|---|
| **`Promise.all(promises)`** | Every promise to **fulfill** (but they all start immediately) | **Only if all fulfill** | **As soon as any promise rejects** (fail-fast for the combined result) | **Array of fulfilled values** in the same order as input | “I need *all* requests to succeed” (page dependencies, load required data) |
| **`Promise.allSettled(promises)`** | Every promise to **settle** (fulfill or reject) | **Always** (it never rejects due to input failures) | Only rejects if you pass something invalid (rare) | **Array of result objects**: `{ status: "fulfilled", value }` or `{ status: "rejected", reason }` | “Best effort”: show partial data + errors (dashboards, multi-widget pages) |
| **`Promise.any(promises)`** | The first promise to **fulfill** | **As soon as one fulfills** (ignores earlier rejections) | **Only if all reject** (rejects with `AggregateError`) | **Single fulfilled value** (from the first one that fulfills) | “First success wins” (redundant endpoints, cache vs network, mirrors) |
| **`Promise.race(promises)`** | The first promise to **settle** | If the first settled promise **fulfills** | If the first settled promise **rejects** | **Single value or error** from the first settled promise | “First response wins” or **timeouts** (often raced against a timeout promise) |

**Key nuance:** none of these automatically *cancel* the other promises; they only decide what the *combined* promise returns.



### Fullfill, Reject, Settled

- **Fulfilled**: the promise completed successfully (it has a value).  
- **Rejected**: the promise failed (it has a reason/error).  
- **Settled**: **either** fulfilled **or** rejected (i.e., it’s no longer pending).

#### How that maps to `any` vs `race`

- **`Promise.any([...])`** waits for the first **fulfilled** promise.
  - It **ignores rejections** while it waits.
  - It **rejects only if all promises reject** (with `AggregateError`).

- **`Promise.race([...])`** waits for the first **settled** promise.
  - If the first one settles by **fulfilling**, `race` fulfills with that value.
  - If the first one settles by **rejecting**, `race` rejects with that error.

So the key difference is: **`any` = first success**, **`race` = first outcome (success or failure)**.


## Use case Promise.Race

`Promise.race` is useful when you care about **“who finishes first”**, not necessarily “who succeeds first”. That sounds risky for “get data”, but it’s great for a few common patterns.

### Where `Promise.race` is the right tool

### 1) **Timeouts**
Race a real request against a timer that rejects:

```js
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timed out")), ms)
  );
}

const data = await Promise.race([
  fetch("https://api.github.com/users/telagraphic").then((r) => r.json()),
  timeout(2000),
]);
```

If the fetch is too slow, you *want* the rejection so you can fallback.

### 2) **“First response wins” regardless of success**
Sometimes you do want the *earliest answer* even if it’s an error (e.g., fastest health check, or picking the quickest service and failing fast).

### 3) **Cancellation / abort orchestration**
You can race an operation against an **AbortSignal**-driven promise (or other “stop condition”) so your code stops waiting when the user navigates away, closes a modal, etc.

### If you want “first successful data”, use `any`
For “give me the first endpoint that works”, you usually want:

- **`Promise.any`** (first fulfilled), not `race`.

So: `race` isn’t “uncertain” when used for the right thing—**timeouts and stop conditions**—where early failure is actually valuable information.

### Common real-world patterns for `Promise.race`

- **Timeout wrappers**: race a request against a timer so slow operations fail fast (or fall back).
- **User-cancel / “stop waiting”**: race a task against an abort/cancel signal so you stop awaiting when the user navigates away, closes a modal, etc.
- **Stale-while-revalidate UI**: race a fast cache read vs a network fetch to show *something* quickly, then update later with fresher data.
- **First-available resource**: race multiple mirrors/CDNs and take whichever responds first (often paired with manual cancellation for the losers).
- **Connection / health checks**: race several pings and proceed with whichever service responds first (even if it’s a failure—fast failure can be useful).
- **Guard against hangs**: race any async operation with a “watchdog” promise that rejects/logs if it’s taking too long.
- **UI gating**: race animations/transitions vs a max delay so the UI can’t get stuck waiting forever.
- **Competing strategies**: try an “optimistic” fast path and a “reliable” slow path in parallel; race for the first to settle, then continue accordingly.

If you tell me your scenario (browser UI, Node job, API aggregation), I can give a concrete `race` snippet that matches it (timeouts vs cancel vs cache vs mirrors).


```js
// All succeed or reject fast on first failure
const [a, b] = await Promise.all([fetchA(), fetchB()]);

// Wait for all outcomes (good for “best effort” dashboards)
const results = await Promise.allSettled([fetchA(), fetchB()]);
for (const r of results) {
  if (r.status === "fulfilled") console.log(r.value);
  else console.warn("failed:", r.reason);
}

// First fulfilled wins (ignore rejections unless all reject)
const fastest = await Promise.any([cacheHit(), networkFetch()]);

// First settled wins (fulfilled OR rejected)
const first = await Promise.race([fastService(), slowService()]);
```

### Converting callback APIs to Promises (promisify)

```js
// Node-style callback: (err, value) => void
function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
}
```

### Cancellation (modern): `AbortController` (especially for `fetch`)

```js
const controller = new AbortController();

const p = fetch("/api/search?q=js", { signal: controller.signal });

// Later: cancel (causes fetch Promise to reject with AbortError)
controller.abort();

try {
  const res = await p;
} catch (err) {
  if (err?.name === "AbortError") return; // ignore cancellation
  throw err;
}
```

---

## Practical promise patterns (copy/paste ready)

### `setTimeout` as a Promise (sleep/delay)

```js
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await sleep(250);
```

### Timeout a Promise (fail if it takes too long)

```js
export function withTimeout(promise, ms, message = "Timed out") {
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => reject(new Error(message)), ms);
    // Ensure clearing happens even if the original wins.
    promise.finally(() => clearTimeout(id));
  });
  return Promise.race([promise, timeout]);
}

const res = await withTimeout(fetch("/api/user"), 3000);
```

### Debounce that returns a Promise (resolve last call)

Use this when callers need the result of the “final” invocation (e.g., search-as-you-type).

```js
export function debouncePromise(fn, waitMs) {
  let timerId = null;
  let pending = [];

  return (...args) =>
    new Promise((resolve, reject) => {
      pending.push({ resolve, reject });

      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(async () => {
        const batch = pending;
        pending = [];
        timerId = null;

        try {
          const value = await fn(...args);
          batch.forEach((p) => p.resolve(value));
        } catch (err) {
          batch.forEach((p) => p.reject(err));
        }
      }, waitMs);
    });
}
```

### Throttle that returns a Promise (one at a time)

Use this to prevent overlapping calls (e.g., “save” button, rate-limited endpoint).

```js
export function throttlePromise(fn) {
  let inFlight = null;

  return (...args) => {
    if (!inFlight) {
      inFlight = Promise.resolve()
        .then(() => fn(...args))
        .finally(() => {
          inFlight = null;
        });
    }
    return inFlight;
  };
}
```

### Retry with backoff (transient errors)

```js
export async function retry(fn, { retries = 3, baseDelayMs = 200 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn({ attempt });
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      const delay = baseDelayMs * 2 ** attempt;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}
```

### Limit concurrency (don’t start too many Promises at once)

```js
export async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let i = 0;

  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await mapper(items[idx], idx);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return results;
}
```

---

## Quick rules of thumb

- Prefer **`async/await` + `try...catch`** for most app code (readability).
- Prefer **Promise combinators** (`all`, `allSettled`, `any`, `race`) for concurrency and policy.
- Use **`.finally()`** for cleanup, not for transforming values.
- Don’t wrap an existing Promise-returning function in `new Promise(...)` unless you truly must (it’s a common source of bugs).



# Promise + `fetch` best practices (copy/paste summary)

## Core rules
- **Promises are async placeholders**: if you assign `const x = fetch(...)`, `x` is a **Promise**, not the final data.
- **`.then(...)` always returns a new Promise** (even if you `return` a plain value inside).
- **`Response.json()` returns a Promise**. You must `return res.json()` (or `await res.json()`).
- **`try...catch` only catches async errors if you `await`**. Otherwise use `.catch(...)`.

---

## The “always works” `fetch` pattern (Promise chain)
```js
const namesPromise = fetch("https://api.github.com/users/telagraphic/repos")
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return res.json(); // IMPORTANT: return the Promise
  })
  .then((repos) => repos.map((repo) => repo.name)); // IMPORTANT: return value

namesPromise
  .then((names) => console.log(names))
  .catch((err) => console.error("Request failed:", err));
```

**Why this works**
- Each step **returns** something (a Promise or a value), so the chain stays linked.
- Errors propagate to the final `.catch()`.

---

## The “always works” `fetch` pattern (`async/await`)
```js
(async () => {
  try {
    const res = await fetch("https://api.github.com/users/telagraphic/repos");
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const repos = await res.json();
    const names = repos.map((repo) => repo.name);

    console.log(names);
  } catch (err) {
    console.error("Request failed:", err);
  }
})();
```

**Best for**
- Multi-step flows, branching, loops, early returns, more readable error handling.

---

## Don’t expect “outside” variables to update in time
```js
let names = [];

fetch("https://api.github.com/users/telagraphic/repos")
  .then((res) => res.json())
  .then((repos) => {
    names = repos.map((r) => r.name);
    console.log("inside then:", names); // correct
  });

console.log("outside then:", names); // [] (runs first)
```

**Best practice**
- Either keep it as a **Promise** (`const namesPromise = ...`) or only use the value **inside** the `.then()` / after `await`.

---

## Common mistakes (and fixes)

### 1) Forgetting to `return` inside `{ }`
```js
// WRONG: returns undefined
.then((repos) => { repos.map((r) => r.name); });

// RIGHT
.then((repos) => { return repos.map((r) => r.name); });

// ALSO RIGHT (implicit return)
.then((repos) => repos.map((r) => r.name));
```

### 2) Logging the Promise instead of its value
```js
const result = fetch("...").then((r) => r.json());
console.log(result); // Promise

result.then(console.log); // actual data
```

### 3) `try...catch` without `await` doesn’t catch async failures
```js
// WRONG
try {
  fetch("...").then((r) => r.json());
} catch (e) {
  // won't run for async rejection
}

// RIGHT (await)
try {
  const data = await fetch("...").then((r) => r.json());
} catch (e) {
  console.error(e);
}

// RIGHT (catch)
fetch("...")
  .then((r) => r.json())
  .catch(console.error);
```

---

## Practical “repo names” snippet (clean + reusable)
```js
function getRepoNames(username) {
  return fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((repos) => repos.map((repo) => repo.name));
}

getRepoNames("telagraphic")
  .then(console.log)
  .catch(console.error);
```

---

## Quick checklist
- **Return** `res.json()` from the first `.then()`.
- **Return** `map(...)` (or any derived value) from the next `.then()`.
- Put `console.log(...)` **in a `.then()`** or **after `await`**.
- Handle errors with **`.catch()`** (chains) or **`try...catch`** (async/await).
- Check `res.ok` and throw on non-2xx if you want failures to be catchable.


Here is the clean mental model.

## What is actually different?

**Nothing fundamental.** `async/await` is **syntax over Promises**. An `async` function **always returns a Promise**, and every `await` is basically “pause here until this Promise settles, then continue or throw”.

So the difference is **mostly writing style and control flow**, not a different execution model.

---

## `new Promise(...)` + `.then/.catch/.finally`

- **`new Promise((resolve, reject) => { ... })`** is how you **construct** a Promise when you are **bridging** something that is not already Promise-based (timers, DOM events, Node callbacks, legacy APIs), or when you are building a small Promise utility (`sleep`, manual cancellation wiring, etc.).
- **`.then/.catch/.finally`** is how you **attach continuations** to an existing Promise: “when this finishes, do that”.

**Style:** more **pipeline / expression** oriented. Good for short chains, library code, or when you want to stay fully in the Promise API.

---

## `async/await`

- **`async function`** declares “this function returns a Promise”.
- **`await`** is how you **consume** a Promise **inside** that function with **linear code** (`if`, loops, early `return`, local variables).

**Style:** more **imperative / synchronous-looking**. Usually easier to read for multi-step workflows and error handling (`try/catch/finally`).

---

## Is your understanding right?

Mostly, with one important correction:

- You **do not** need `new Promise` to “create promise functionality” for things like **`fetch`**, because **`fetch` already returns a Promise**.
- **`new Promise` is not the default way to write app logic**; it is mainly for **wrapping non-Promise async** or implementing **Promise helpers**.

A common pattern is:

1. **Expose** an `async function` (or a function that returns a Promise) as your API.
2. **Implement** it with `await` for readability.
3. **Use `new Promise` only** when you must adapt callbacks/events.

That is a **very common convention** in modern JS/TS codebases.

---

## Is mixing them “standard”?

Yes. Typical conventions:

- **App/business logic:** prefer **`async/await` + `try/catch`**.
- **Tiny transformations / library internals:** `.then` can still be fine.
- **`new Promise`:** use **sparingly** (wrapping legacy async, or small utilities like `sleep`).

Also: you can call Promise-returning functions with **either** style:

```js
// same underlying Promise
getRepoNames("x").then(console.log);

// or
console.log(await getRepoNames("x")); // inside async scope
```

---

## One sharp edge (why people warn about `new Promise`)

Avoid doing this when the underlying API already returns a Promise:

```js
// usually unnecessary and easier to get wrong
return new Promise((resolve, reject) => {
  fetch("/x")
    .then(resolve)
    .catch(reject);
});
```

Prefer:

```js
return fetch("/x").then(...);
// or
const res = await fetch("/x");
```

So: **`async/await` is not a separate “second phase” of Promises** — it is the same Promises, written in a more linear style, and **`new Promise` is mainly for construction/wrapping**, not the everyday way to express `fetch` workflows.


iYes—**in normal JavaScript, `await` is only allowed inside an `async` function body**.

There’s one modern exception: **top-level `await`** is allowed **only in ES modules**.

## Why `await` is restricted
`await` means: **pause this function’s execution until the Promise settles**, then:
- continue with the resolved value, or
- throw if it rejected.

That “pause” only makes sense if the surrounding code is in a context that can be paused **without freezing the whole program**. An `async` function provides that context: it can suspend and later resume, and it always returns a Promise to represent the eventual completion.

So:
- **Inside an `async` function**: `await` pauses *that function* and the function returns a Promise.
- **At top level in a classic script**: there’s no “async boundary” to pause safely, so it’s a syntax error.

## Valid examples

### 1) `await` inside `async function` (always valid)
```js
async function run() {
  const res = await fetch("/api/data");
  return await res.json();
}
```

### 2) `await` inside an async IIFE (works anywhere you can run JS)
```js
(async () => {
  const res = await fetch("/api/data");
  console.log(await res.json());
})();
```

### 3) Top-level `await` (only in modules)
```js
// Only valid if this file is treated as a module (e.g. <script type="module">)
const res = await fetch("/api/data");
console.log(await res.json());
```

## The rule of thumb
- **If you see `await`, you should also see `async` “above it”** (in the function declaration), *unless* you’re in a true **module top level**.



## Use Cases List

## Common modern web app Promise patterns (general)

- **API request lifecycle (load → render → cleanup)**: start a spinner, fetch, parse, update UI, stop spinner in `finally`.
- **Centralized error handling**: throw on `!res.ok`, catch once at the boundary (page/action handler), show toast, optionally rethrow.
- **Transform pipeline**: `fetch(...).then(validate).then(parse).then(mapToViewModel)`.
- **Parallel data loading**: kick off independent requests immediately, then await them together.
- **Sequential dependency**: second request depends on the first (user → user.repos_url).
- **Retry on transient errors**: exponential backoff for flaky networks or 5xx.
- **Timeouts**: fail fast on slow endpoints (usually `race` against a timer).
- **Cancellation**: `AbortController` to abort `fetch` when the user navigates away or changes search input.
- **Debounced async search**: debounce a promise-returning search function so only the last keystroke triggers work.
- **Concurrency limits**: batch or limit parallel fetches to avoid rate limits / saturating the browser.
- **Optimistic UI**: update UI immediately, then revert if the Promise rejects.

---

## Patterns by combinator

### `Promise.all` patterns (all-or-nothing)
- **Page data dependencies**: you must have user + permissions + settings before rendering.
- **Submit flows**: save multiple resources and only succeed if all saves succeed.
- **Fan-out then join**: create many requests (e.g. details for IDs) and await all.

Key behavior: resolves with **all values** only if **all succeed**; rejects on **first rejection**.

---

### `Promise.allSettled` patterns (best effort)
- **Dashboards / widgets**: show what loads, mark what fails, don’t blank the whole page.
- **Bulk actions**: “invite 50 users” and show per-item success/failure.
- **Telemetry / background tasks**: you want completion status, not fail-fast.

Key behavior: always resolves with **every outcome** (`fulfilled`/`rejected` objects).

---

### `Promise.any` patterns (first success)
- **Cache vs network**: try cached response and network; whichever succeeds first wins.
- **Redundant endpoints / mirrors**: multiple base URLs, take the first successful response.
- **Feature detection fallbacks**: attempt multiple strategies; proceed with first that works.

Key behavior: resolves with the **first fulfilled value**; rejects only if **all reject**.

---

### `Promise.race` patterns (first settled: success or failure)
- **Timeout wrapper**: race fetch vs timeout rejection to avoid hanging UI.
- **Abort / stop-waiting**: race work vs “user canceled / navigated away”.
- **Fast-fail health checks**: whichever responds first (even error) informs next step.
- **Watchdog**: race long task vs watchdog that logs/alerts if too slow.

Key behavior: settles with **first settled** promise (could be rejection).

---

## Quick picker
- Need **everything**? → `all`
- Need **status for each**? → `allSettled`
- Need **first success**? → `any`
- Need **first result or timeout/cancel**? → `race`


## Modern Promise patterns (copy/paste code examples)

### 1) API request lifecycle (load → render → cleanup)
```js
async function loadUser(userId) {
  startSpinner();
  try {
    const res = await fetch(`/api/users/${userId}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const user = await res.json();
    renderUser(user);
    return user;
  } catch (err) {
    showToast("Failed to load user");
    throw err;
  } finally {
    stopSpinner();
  }
}
```

### 2) Centralized error handling boundary
```js
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function onPageLoad() {
  try {
    const data = await fetchJson("/api/data");
    render(data);
  } catch (err) {
    renderErrorState(err);
  }
}
```

### 3) Transform pipeline (`then` chain)
```js
function fetchJson(url) {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
}

fetchJson("/api/items")
  .then((items) => items.filter((x) => x.active))
  .then((active) => active.map((x) => ({ id: x.id, label: x.name })))
  .then(renderList)
  .catch(console.error);
```

### 4) Parallel data loading (independent requests)
```js
async function loadDashboard() {
  const [user, settings, notifications] = await Promise.all([
    fetchJson("/api/me"),
    fetchJson("/api/settings"),
    fetchJson("/api/notifications"),
  ]);

  renderDashboard({ user, settings, notifications });
}
```

### 5) Sequential dependency (second request uses first response data)
```js
fetch("https://api.github.com/users/telagraphic", {
  headers: { Accept: "application/vnd.github+json" },
})
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then((user) => fetch(user.repos_url, { headers: { Accept: "application/vnd.github+json" } }))
  .then((res) => res.json())
  .then((repos) => console.log(repos.map((r) => r.name)))
  .catch(console.error);
```

### 6) Retry on transient errors (backoff)
```js
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function retry(fn, { retries = 3, baseDelayMs = 200 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn({ attempt });
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      await sleep(baseDelayMs * 2 ** attempt);
    }
  }
  throw lastErr;
}

// Example
const data = await retry(() => fetchJson("/api/flaky"), { retries: 4 });
```

### 7) Timeout wrapper (`Promise.race`)
```js
function timeout(ms, message = "Timed out") {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
}

const data = await Promise.race([
  fetchJson("/api/slow"),
  timeout(2000),
]);
```

### 8) Cancellation (`AbortController` with fetch)
```js
const controller = new AbortController();

fetch("/api/search?q=js", { signal: controller.signal })
  .then((res) => res.json())
  .then(console.log)
  .catch((err) => {
    if (err.name === "AbortError") return; // user canceled
    console.error(err);
  });

// Later (e.g., new search term typed)
controller.abort();
```

### 9) Debounced async search (Promise-based debounce)
```js
function debouncePromise(fn, waitMs) {
  let timerId = null;
  let pending = [];

  return (...args) =>
    new Promise((resolve, reject) => {
      pending.push({ resolve, reject });

      clearTimeout(timerId);
      timerId = setTimeout(async () => {
        const batch = pending;
        pending = [];
        try {
          const value = await fn(...args);
          batch.forEach((p) => p.resolve(value));
        } catch (err) {
          batch.forEach((p) => p.reject(err));
        }
      }, waitMs);
    });
}

const search = debouncePromise((q) => fetchJson(`/api/search?q=${encodeURIComponent(q)}`), 250);

search("react").then(renderResults).catch(console.error);
search("react p").then(renderResults).catch(console.error); // only last one runs
```

### 10) Concurrency limits (don’t start too many requests)
```js
async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let i = 0;

  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await mapper(items[idx], idx);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

// Example
const users = await mapWithConcurrency(
  ["telagraphic", "umami-software", "oven-sh"],
  2,
  (u) => fetchJson(`https://api.github.com/users/${encodeURIComponent(u)}`)
);
```

### 11) Optimistic UI (revert on failure)
```js
async function toggleLike(postId, nextLiked) {
  const prev = getLiked(postId);
  setLiked(postId, nextLiked); // optimistic update

  try {
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: nextLiked }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    setLiked(postId, prev); // revert
    showToast("Could not update like");
    throw err;
  }
}
```

---

## Combinator patterns (`all`, `allSettled`, `any`, `race`)

### `Promise.all` (all-or-nothing)
```js
const [user, repos] = await Promise.all([
  fetchJson("https://api.github.com/users/telagraphic"),
  fetchJson("https://api.github.com/users/telagraphic/repos"),
]);

console.log(user.login, repos.length);
```

### `Promise.allSettled` (best effort)
```js
const results = await Promise.allSettled([
  fetchJson("https://api.github.com/users/telagraphic"),
  fetchJson("https://api.github.com/users/DOES_NOT_EXIST_123"),
  fetchJson("https://api.github.com/users/telagraphic/repos"),
]);

const successes = results
  .filter((r) => r.status === "fulfilled")
  .map((r) => r.value);

const failures = results
  .filter((r) => r.status === "rejected")
  .map((r) => r.reason);

console.log({ successesCount: successes.length, failuresCount: failures.length });
```

### `Promise.any` (first success)
```js
const firstSuccess = await Promise.any([
  fetchJson("https://api.github.com/users/DOES_NOT_EXIST_123"), // reject
  fetchJson("https://api.github.com/this/endpoint/does/not/exist"), // reject
  fetchJson("https://api.github.com/users/telagraphic"), // fulfill
]);

console.log("winner:", firstSuccess);
```

### `Promise.race` (first settled) + timeout
```js
function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("Timed out")), ms));
}

try {
  const data = await Promise.race([
    fetchJson("https://api.github.com/users/telagraphic"),
    timeout(1000),
  ]);
  console.log("got:", data);
} catch (err) {
  console.log("race failed:", err.message);
}
```

---

### Minimal helper used above (copy once)
```js
async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}
```