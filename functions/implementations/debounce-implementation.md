How do you implement `debounce` from scratch (basic → web use case → medium/complex)?
?

`debounce` makes a function wait until a burst of calls **stops**.

- `debounce`: “run after the user stops doing the thing”
- common uses: search-as-you-type, autosave, window resize recalcs

## Basic `debounce` key components (what matters)

- **closure state (`timerId`)**: `timerId` lives in the outer scope so every call to the returned function shares the same timer.
- **returned wrapper function**: `debounce` returns `debounced(...)` so you call the wrapper many times, but it schedules the original `fn` only once at the end of a burst.
- **cancel previous work (`clearTimeout`)**: each call cancels the previous pending timer, so only the *latest* call can win.
- **schedule the trailing run (`setTimeout`)**: start a new timer that waits `waitMs`, then calls `fn`.
- **forward `this` and args (`fn.apply(this, args)`)**: preserves the caller’s `this` and passes through arguments; without this, methods like `obj.onChange` can break when debounced.
- **trailing-edge behavior**: because the call happens inside `setTimeout`, the function runs **after** the last call, not immediately.

---

## Basic `debounce` from scratch (trailing edge)

This is the simplest useful form: it only runs on the **trailing edge** (after the last call).

```js
function debounce(fn, waitMs) {
  let timerId;

  return function debounced(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), waitMs);
  };
}
```

Key idea: each call cancels the previous timer and schedules a new one.

---

## Walkthrough + simple web app use case (search input)

Imagine a tiny page with:

```html
<input id="q" placeholder="Search..." />
<pre id="out"></pre>
```

You want to call the API only when the user pauses typing for 300ms.

```js
function render(text) {
  document.querySelector("#out").textContent = text;
}

async function fetchResults(query) {
  // demo stub (pretend network)
  await new Promise(r => setTimeout(r, 150));
  return ["apple", "apricot", "avocado"].filter(x => x.includes(query));
}

async function onSearch(query) {
  const results = await fetchResults(query);
  render(JSON.stringify({ query, results }, null, 2));
}

const debouncedOnSearch = debounce(onSearch, 300);

document.querySelector("#q").addEventListener("input", (e) => {
  const query = e.target.value.trim();
  if (query.length < 2) return render("Type 2+ chars…");
  debouncedOnSearch(query);
});
```

### What happens when you type “cat” quickly?

Calls arrive like: `c` → `ca` → `cat`

- **Type `c`**: schedule `onSearch("c")` for \(t + 300ms\)
- **Type `a`**: cancel the previous schedule, schedule `onSearch("ca")`
- **Type `t`**: cancel again, schedule `onSearch("cat")`
- **Stop typing**: after 300ms, only the **last** call executes

---

## Medium/complex `debounce` (leading/trailing + maxWait + cancel/flush)

This version supports:

- `leading`: run immediately on the first call in a burst
- `trailing`: run after the burst ends
- `maxWait`: guarantee it runs at least every N ms even if calls keep coming
- `.cancel()`: drop pending work
- `.flush()`: run the pending trailing call immediately (if any)

```js
function debounceAdvanced(fn, waitMs, options = {}) {
  const leading = !!options.leading;
  const trailing = options.trailing !== false; // default true
  const maxWait = typeof options.maxWait === "number" ? options.maxWait : null;

  let timerId = null;
  let maxTimerId = null;
  let lastArgs = null;
  let lastThis = null;
  let lastResult;
  let hasPendingTrailing = false;

  function invoke() {
    const args = lastArgs;
    const ctx = lastThis;
    lastArgs = lastThis = null;
    hasPendingTrailing = false;
    lastResult = fn.apply(ctx, args);
    return lastResult;
  }

  function startWaitTimer() {
    timerId = setTimeout(() => {
      timerId = null;
      if (trailing && hasPendingTrailing) invoke();
      if (maxTimerId) {
        clearTimeout(maxTimerId);
        maxTimerId = null;
      }
    }, waitMs);
  }

  function startMaxTimer() {
    if (maxWait == null || maxTimerId != null) return;
    maxTimerId = setTimeout(() => {
      maxTimerId = null;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      if (trailing && hasPendingTrailing) invoke();
      // if calls continue after this, the next call will schedule timers again
    }, maxWait);
  }

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;
    hasPendingTrailing = true;

    const isCold = timerId == null; // no active wait window

    if (isCold) {
      if (leading) {
        hasPendingTrailing = false; // consume this call as leading
        lastResult = fn.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }
      startWaitTimer();
      startMaxTimer();
      return lastResult;
    }

    // warm: extend the wait window
    clearTimeout(timerId);
    startWaitTimer();
    startMaxTimer();
    return lastResult;
  }

  debounced.cancel = () => {
    if (timerId) clearTimeout(timerId);
    if (maxTimerId) clearTimeout(maxTimerId);
    timerId = null;
    maxTimerId = null;
    lastArgs = lastThis = null;
    hasPendingTrailing = false;
  };

  debounced.flush = () => {
    if (!timerId || !trailing || !hasPendingTrailing) return lastResult;
    clearTimeout(timerId);
    timerId = null;
    if (maxTimerId) {
      clearTimeout(maxTimerId);
      maxTimerId = null;
    }
    return invoke();
  };

  return debounced;
}
```

### Example: autosave with “save now” button

```js
const saveDraft = debounceAdvanced(async () => {
  await fetch("/api/draft", { method: "POST", body: "..." });
}, 1000, { trailing: true, maxWait: 5000 });

document.querySelector("#editor").addEventListener("input", saveDraft);
document.querySelector("#saveNow").addEventListener("click", () => saveDraft.flush());
```

Mental model:

- wait timer makes it “run after things stop”
- maxWait makes it “run at least sometimes even if they never stop”
