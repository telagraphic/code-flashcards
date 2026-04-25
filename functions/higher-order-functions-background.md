## Higher-order functions (HOFs): purpose, patterns, trade-offs

Higher-order functions are functions that **take a function as input**, **return a function as output**, or both.

In JavaScript, functions are values (first-class). A HOF is how you treat “behavior” like data: you can pass it around, configure it, combine it, and apply it consistently.

---

## What problem do HOFs solve?

They solve “I want the same outer logic around many different actions” without copy/pasting.

Common “outer logic” examples:
- Logging / instrumentation
- Error handling and retries
- Caching / memoization
- Timeouts / cancellation / rate limiting (debounce, throttle)
- Input validation / normalization
- Authorization / feature flags
- Resource management (open/close, lock/unlock)

The “action” stays customizable: you pass in a function (or get one back) for the specific behavior.

---

## Why “take a function”?

When a function takes another function, it usually means:
- **You’re abstracting a control flow** (when/how often/how to run something)
- **You’re injecting a variable part** (the “what”) into a reusable skeleton (the “how”)

Example: you don’t want to rewrite “try/catch + logging + rethrow” around every async call.

```js
function withErrorReporting(fn, { label } = {}) {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (err) {
      console.error(`[${label ?? fn.name ?? "anonymous"}] failed`, err);
      throw err;
    }
  };
}
```

---

## Why “return a function”?

When a function returns a function, it usually means:
- **You’re configuring behavior once**, then reusing it many times.
- You’re using a **closure** to remember configuration.

Example: build specialized formatters/validators/handlers.

```js
function createMinLengthValidator(min) {
  return function (value) {
    return typeof value === "string" && value.length >= min;
  };
}

const isPasswordLongEnough = createMinLengthValidator(12);
```

---

## Web patterns that use HOFs (and why)

### Express / Koa middleware factories
Why: configure once (options), reuse per-route; wrap common concerns (auth, logging).

```js
function requireRole(role) {
  return function (req, res, next) {
    if (!req.user?.roles?.includes(role)) return res.status(403).end();
    next();
  };
}

// app.get("/admin", requireRole("admin"), handler)
```

### `fetch` wrappers (retries, timeouts, headers)
Why: centralize network behavior; keep call-sites simple.

```js
function withJson(fn) {
  return async function (...args) {
    const res = await fn(...args);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  };
}

const fetchJson = withJson(fetch);
```

### Event handler factories (DOM + React)
Why: avoid duplicating small variations; close over IDs, analytics labels, etc.

```js
function createClickTracker(track) {
  return function (label) {
    return function onClick(event) {
      track({ type: "click", label, ts: Date.now() });
    };
  };
}
```

### React patterns: Higher-Order Components (HOCs) and hooks
Why: share behavior across components/hooks without repeating the logic.

- **HOC**: `withX(Component) -> NewComponent` (less common in new code, but still exists)
- **Hooks**: not always “HOF” by definition, but often *use the same idea*: they encapsulate reusable behavior and sometimes accept callbacks (e.g. `useEffect(fn, deps)`), or return functions (e.g. `useCallback` returns a function).

```js
function withFeatureFlag(flagName) {
  return function (Component) {
    return function FeatureFlagged(props) {
      if (!props.flags?.[flagName]) return null;
      return Component(props);
    };
  };
}
```

### Redux / state libraries: middleware and enhancers
Why: wrap dispatch/handlers so you can add cross-cutting behavior (logging, async, metrics).

---

## Pros / cons vs “basic functions”

### Pros
- **Reusability without inheritance**: share behavior without class hierarchies.
- **Separation of concerns**: “outer” concerns (logging, retries) live in one place.
- **Composability**: small units snap together into bigger behavior (see below).
- **Testability**: wrappers can be unit-tested with simple stub functions.

### Cons / risks
- **Harder debugging**: stack traces and function names can get noisy.
- **Over-abstraction**: too many wrappers can hide what really runs.
- **Readability tax**: especially with heavy currying and point-free style.
- **Type complexity** (TypeScript): generic HOF typing can get tricky.

Rule of thumb: if a wrapper makes call-sites *simpler and more consistent*, it’s usually a win. If it makes simple flows feel “indirect”, it’s probably too much.

---

## What “composable code” means (practically)

**Composable** means you can build complex behavior by combining small, predictable pieces, where:
- each piece has a clear contract (inputs/outputs)
- pieces don’t rely on hidden global state
- you can rearrange/stack pieces without rewriting them

For HOFs, composition usually looks like “wrapping” a base function with multiple concerns.

```js
function compose(...wrappers) {
  return function (fn) {
    return wrappers.reduceRight((acc, wrap) => wrap(acc), fn);
  };
}

const withTiming = (fn) => async (...args) => {
  const t0 = performance.now();
  try {
    return await fn(...args);
  } finally {
    const t1 = performance.now();
    console.log(`${fn.name || "fn"} took ${Math.round(t1 - t0)}ms`);
  }
};

const withRetry = (fn, { retries = 2 } = {}) => async (...args) => {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn(...args);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
};

const withRetry2 = (fn) => withRetry(fn, { retries: 2 });

const enhance = compose(withTiming, withRetry2);
const enhancedFetch = enhance(fetch);
```

Now you can reuse `withTiming`, `withRetry2`, etc. on *any* async function—not just `fetch`.

---

## Modern, practical HOF utilities you’ll actually use

### `once(fn)` (ensure a function only runs once)

```js
function once(fn) {
  let called = false;
  let value;
  return function (...args) {
    if (called) return value;
    called = true;
    value = fn(...args);
    return value;
  };
}
```

Use cases: one-time initialization, event listener setup, lazy singletons.

### `debounce(fn, ms)` (delay until user stops triggering)

```js
function debounce(fn, ms) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), ms);
  };
}
```

Use cases: search-as-you-type, resize handlers, autosave.

### `throttle(fn, ms)` (limit to at most once per window)

```js
function throttle(fn, ms) {
  let last = 0;
  let trailingTimer;
  return function (...args) {
    const now = Date.now();
    const remaining = ms - (now - last);
    if (remaining <= 0) {
      last = now;
      fn(...args);
      return;
    }
    clearTimeout(trailingTimer);
    trailingTimer = setTimeout(() => {
      last = Date.now();
      fn(...args);
    }, remaining);
  };
}
```

Use cases: scroll tracking, pointer move handlers, expensive UI updates.

### `memoize(fn)` (cache results by argument key)

```js
function memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  return function (...args) {
    const key = keyFn(...args);
    if (cache.has(key)) return cache.get(key);
    const value = fn(...args);
    cache.set(key, value);
    return value;
  };
}
```

Use cases: expensive pure computations, derived data selectors.

---

## When NOT to reach for a HOF

- When it’s only used once (a normal function is clearer).
- When the wrapper obscures critical business logic.
- When it adds layers that make error handling or tracing harder than necessary.

---

## Mental model to keep it simple

Think of HOFs as **adapters**:
- Input: a function that does the “core job”
- Output: a new function that does the same job, but with **extra rules** around it

If the adapter removes duplication and makes call-sites consistent, it’s doing its job.

