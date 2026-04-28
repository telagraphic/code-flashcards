How do you implement `memoize` from scratch (basic → web use case → medium/complex)?
?

`memoize` caches the result of a function call so repeated calls with the “same input” can return instantly.

- best when: deterministic function, same inputs repeat, computation is expensive
- be careful: caching grows memory; “same input” depends on your key strategy

---

## Basic `memoize` from scratch (1-arg, primitive key)

This simplest version assumes:

- function takes **one primitive argument** (string/number/boolean)
- the argument itself can be used as a Map key

```js
function memoize(fn) {
  const cache = new Map();

  return function memoized(arg) {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn.call(this, arg);
    cache.set(arg, result);
    return result;
  };
}
```

---

## Walkthrough + simple web app use case (rendering derived data)

Suppose you have an expensive formatting function for a “live preview”.

HTML:

```html
<textarea id="src"></textarea>
<pre id="preview"></pre>
```

JS:

```js
function expensiveFormat(text) {
  // simulate expense
  const end = Date.now() + 25;
  while (Date.now() < end) {}
  return text.trim().toUpperCase();
}

const memoizedFormat = memoize(expensiveFormat);

function renderPreview() {
  const input = document.querySelector("#src").value;
  const output = memoizedFormat(input);
  document.querySelector("#preview").textContent = output;
}

document.querySelector("#src").addEventListener("input", renderPreview);
```

### What memoization changes

- Without memoization, `expensiveFormat` runs on every input event.
- With memoization, if the user toggles between the same few strings (undo/redo, copy/paste), repeats can return instantly.

---

## Medium/complex `memoize` (multi-arg + resolver + cache controls)

Real memoization needs:

- multiple args support
- a **resolver** to compute a cache key
- an escape hatch to clear cache / cap cache size

```js
function memoizeAdvanced(fn, options = {}) {
  const resolver = typeof options.resolver === "function"
    ? options.resolver
    : (...args) => JSON.stringify(args);

  const maxSize = typeof options.maxSize === "number" ? options.maxSize : null;
  const cache = new Map();

  function setWithEviction(key, value) {
    if (maxSize != null && cache.size >= maxSize) {
      // simple FIFO eviction (not true LRU, but good enough for learning)
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    cache.set(key, value);
  }

  function memoized(...args) {
    const key = resolver(...args);

    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    setWithEviction(key, result);
    return result;
  }

  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  memoized.delete = (key) => cache.delete(key);

  return memoized;
}
```

### Resolver example: stable key for two args

```js
const memoAdd = memoizeAdvanced((a, b) => a + b, {
  resolver: (a, b) => `${a}|${b}`,
});
```

---

## Medium/complex variant: memoizing async work (Promise de-dupe)

Common real-world need: if 5 callers ask for the same resource at once, you want **one** in-flight request.

This version caches Promises, and if the Promise rejects, it removes it so future calls can retry.

```js
function memoizePromise(fn, options = {}) {
  const resolver = typeof options.resolver === "function"
    ? options.resolver
    : (...args) => JSON.stringify(args);

  const cache = new Map(); // key -> Promise

  return function memoizedAsync(...args) {
    const key = resolver(...args);
    if (cache.has(key)) return cache.get(key);

    const p = Promise.resolve().then(() => fn.apply(this, args));
    cache.set(key, p);

    p.catch(() => {
      cache.delete(key);
    });

    return p;
  };
}
```

### Example: de-dupe user fetches

```js
const fetchUser = memoizePromise(async (id) => {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("bad response");
  return res.json();
});

// These will share the same in-flight Promise:
fetchUser(123);
fetchUser(123);
fetchUser(123);
```

Mental model:

- memoize sync: cache values
- memoize async: cache the Promise so callers “join” the same work
