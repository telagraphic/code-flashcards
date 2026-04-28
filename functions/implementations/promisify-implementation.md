How do you implement `promisify` from scratch (basic → web use case → medium/complex)?
?

`promisify` converts a callback-style async function into one that returns a Promise.

The classic pattern (Node-style) is:

```js
callback(error, value)
```

- `error` is non-null → failure
- otherwise → success with `value`

---

## Basic `promisify` from scratch (Node-style: `(err, result)` callback)

```js
function promisify(fn) {
  return function promisified(...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}
```

Key points:

- returns a Promise
- preserves `this` via `fn.call(this, ...)`

---

## Walkthrough + simple web app use case (FileReader)

In the browser, `FileReader` is callback/event-driven, not Promise-based.
We can “promisify” a helper that uses callbacks.

HTML:

```html
<input id="file" type="file" />
<pre id="out"></pre>
```

Callback helper:

```js
function readFileAsText(file, cb) {
  const reader = new FileReader();
  reader.onload = () => cb(null, reader.result);
  reader.onerror = () => cb(reader.error || new Error("Read failed"));
  reader.readAsText(file);
}
```

Promisified:

```js
const readFileAsTextAsync = promisify(readFileAsText);

document.querySelector("#file").addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const text = await readFileAsTextAsync(file);
    document.querySelector("#out").textContent = text.slice(0, 2000);
  } catch (err) {
    document.querySelector("#out").textContent = String(err);
  }
});
```

What changed:

- before: you must pass a callback and handle success/error there
- after: you can `await` in normal `try/catch`

---

## Medium/complex `promisify` (multiple callback results + optional AbortSignal)

Real callback APIs sometimes call:

```js
cb(err, a, b, c)
```

This version supports:

- `multiArgs`: resolve with an array of results instead of just the first
- `signal`: abort before completion (if you wire it into your underlying API)

```js
function promisifyAdvanced(fn, options = {}) {
  const multiArgs = !!options.multiArgs;

  return function promisified(...args) {
    const signal = options.signal || null;

    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        return reject(signal.reason || new DOMException("Aborted", "AbortError"));
      }

      let settled = false;

      const onAbort = () => {
        if (settled) return;
        settled = true;
        reject(signal.reason || new DOMException("Aborted", "AbortError"));
      };

      if (signal) signal.addEventListener("abort", onAbort, { once: true });

      fn.call(this, ...args, (err, ...results) => {
        if (settled) return;
        settled = true;
        if (signal) signal.removeEventListener("abort", onAbort);

        if (err) return reject(err);
        resolve(multiArgs ? results : results[0]);
      });
    });
  };
}
```

### Example: callback returns multiple values

```js
function getCoords(cb) {
  navigator.geolocation.getCurrentPosition(
    (pos) => cb(null, pos.coords.latitude, pos.coords.longitude),
    (err) => cb(err)
  );
}

const getCoordsAsync = promisifyAdvanced(getCoords, { multiArgs: true });

const [lat, lng] = await getCoordsAsync();
```

---

## Medium/complex variant using Promises: `promisify` + timeout wrapper

Once you have a promisified function, you can compose it with Promise utilities like timeouts.

```js
function withTimeout(promise, ms, message = "Timed out") {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

const readFileAsTextAsync = promisify(readFileAsText);
const text = await withTimeout(readFileAsTextAsync(file), 2000);
```

Mental model:

- promisify gives you a Promise boundary
- once you’re in Promises, composition (timeout, retries, parallelism) becomes straightforward
