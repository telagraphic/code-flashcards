How do you implement `throttle` from scratch (basic → web use case → medium/complex)?
?

`throttle` limits how often a function can run.

- `throttle`: “run at most once every N ms”
- common uses: scroll/resize handlers, mousemove tracking, “rate limit” UI events

---

## Basic `throttle` from scratch (leading only)

This simplest version runs immediately, then ignores calls until the window ends.

```js
function throttle(fn, waitMs) {
  let inThrottle = false;

  return function throttled(...args) {
    if (inThrottle) return;

    fn.apply(this, args);
    inThrottle = true;

    setTimeout(() => {
      inThrottle = false;
    }, waitMs);
  };
}
```

Key idea: `inThrottle` is the “gate”.

---

## Walkthrough + simple web app use case (scroll handler)

HTML:

```html
<div id="meter" style="position:fixed;top:12px;left:12px"></div>
<div style="height:3000px"></div>
```

JS (update a little UI meter, but not on every scroll event):

```js
function setText(t) {
  document.querySelector("#meter").textContent = t;
}

function reportScroll() {
  setText(`scrollY=${window.scrollY} at ${new Date().toLocaleTimeString()}`);
}

const throttledReport = throttle(reportScroll, 200);
window.addEventListener("scroll", throttledReport, { passive: true });
```

Even if the browser fires dozens of scroll events per second, `reportScroll` runs about once every 200ms.

---

## Medium/complex `throttle` (leading + trailing + cancel/flush)

This version supports:

- `leading`: run immediately at the start of a throttle window
- `trailing`: run once at the end with the latest args
- `.cancel()`: drop pending trailing call
- `.flush()`: run pending trailing call immediately

Implementation uses `setTimeout` and keeps the “latest call” captured.

```js
function throttleAdvanced(fn, waitMs, options = {}) {
  const leading = options.leading !== false; // default true
  const trailing = !!options.trailing; // default false (explicitly opt-in)

  let timerId = null;
  let lastArgs = null;
  let lastThis = null;
  let lastResult;
  let didCallLeadingInWindow = false;

  function invoke() {
    const args = lastArgs;
    const ctx = lastThis;
    lastArgs = lastThis = null;
    lastResult = fn.apply(ctx, args);
    return lastResult;
  }

  function startWindow() {
    timerId = setTimeout(() => {
      timerId = null;
      const hasTrailing = trailing && lastArgs != null;
      didCallLeadingInWindow = false;
      if (hasTrailing) invoke();
    }, waitMs);
  }

  function throttled(...args) {
    lastArgs = args;
    lastThis = this;

    if (timerId == null) {
      // new window starts now
      didCallLeadingInWindow = false;

      if (leading) {
        didCallLeadingInWindow = true;
        invoke(); // consumes lastArgs/lastThis
      }

      startWindow();
      return lastResult;
    }

    // inside window: either ignore, or remember for trailing
    if (!trailing) {
      lastArgs = lastThis = null;
    }

    return lastResult;
  }

  throttled.cancel = () => {
    if (timerId) clearTimeout(timerId);
    timerId = null;
    lastArgs = lastThis = null;
    didCallLeadingInWindow = false;
  };

  throttled.flush = () => {
    if (!timerId || !trailing || lastArgs == null) return lastResult;
    clearTimeout(timerId);
    timerId = null;
    didCallLeadingInWindow = false;
    return invoke();
  };

  return throttled;
}
```

### Example: “mousemove analytics” with trailing update

```js
const send = (payload) => fetch("/api/track", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const trackMove = throttleAdvanced((e) => {
  send({ type: "move", x: e.clientX, y: e.clientY, t: Date.now() });
}, 1000, { leading: true, trailing: true });

document.addEventListener("mousemove", trackMove);
```

Mental model:

- leading gives you “immediate response”
- trailing gives you “latest state at the end of the window”
