# Closures + bindings: `var` vs `let` in loops (reference)

This note explains why loop callbacks often print the “final” value with `var`, but work as expected with `let`, using the mechanics of:

- closures and the function’s internal `[[Environment]]`
- lexical scope and identifier resolution
- lexical environments / environment records (bindings as “slots”)
- execution contexts (created on *call*, not on *creation*)

It uses the examples from `syntax-basics/block-scope-var-1.md`.

---

## Core idea (the whole bug in one line)

**Closures capture *bindings* (a variable “slot”), not a snapshot of the value.**

- With **`var`**, there is **one shared `i` binding slot** for the entire loop (function-scoped).
- With **`let`** in `for (let i = ...)`, there is **a fresh `i` binding slot per iteration**.

So when the callback runs later, it looks up `i` and reads whatever is in the slot *at that time*.

---

## Vocabulary (tight definitions)

### Execution context (EC)

Created **when code runs**:

- A function EC is created when the function is **called** (e.g., when a click handler fires).
- The EC contains pointers to environments used for resolving variables.

### Lexical environment (LE) + environment record (ER)

Think of an ER as a map of **identifier → binding slot**:

- A **binding slot** holds a value (and can be updated).
- Identifier resolution (“what is `i`?”) walks the current LE chain.

### Closure / `[[Environment]]`

When a function is **created**, it stores a hidden pointer often described as:

- `function.[[Environment]]` → the LE where the function was created

That’s the closure: **the function remembers *where* to resolve free variables later**.

Important: **creating** the function stores `[[Environment]]`; **calling** the function creates a new EC.

---

## Case A: `var` + async callback (prints `3, 3, 3`)

### Example

```js
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
```

### What the engine “stores”

During the loop, each iteration creates a new function object for the timeout callback. Each function object stores:

- the function body
- a `[[Environment]]` pointer to the surrounding environment where `i` is resolved

Because `i` is declared with **`var`**, the binding for `i` lives in a **function-scoped environment** (not a per-iteration block environment). That means:

- there is **one** binding slot for `i`
- each callback closes over the **same** environment record (same `i` slot)

### Timeline (why it prints the final value)

Assume the loop runs quickly:

1. Iteration 0: set `i = 0`, schedule callback (callback not executed yet)
2. Iteration 1: set `i = 1`, schedule callback
3. Iteration 2: set `i = 2`, schedule callback
4. Loop increment/check completes and exits with `i = 3`
5. ~100ms later: callbacks run; each resolves `i` via its `[[Environment]]` pointer
6. They all read the **same** `i` slot, whose value is now `3`

So the output is `3, 3, 3`.

---

## Case B: `var` + DOM click handlers (same bug, different trigger)

### Example (from your file)

```js
for (var i = 0; i < todos.length; i++) {
  div.querySelector('.delete-btn').addEventListener('click', function() {
    console.log('Deleting index:', i);
    todos.splice(i, 1);
    render();
  });
}
```

### Why `i === todos.length` when you click

Inside one call to `render()`:

- `var i` creates **one** shared binding slot for `i`
- each click handler function is created and stored (registered) but **not executed**
- the loop finishes, leaving the single shared `i` slot equal to `todos.length`

Later, on any click:

- the handler is **called** (new EC created)
- it resolves `i` by following its stored `[[Environment]]` pointer
- it reads the value in the single shared `i` slot → `todos.length`

This is why it can “feel like it should capture the current index,” but doesn’t: **it captured the binding, not the iteration’s value.**

---

## Case C: `let` in `for (...)` (works because bindings are per-iteration)

### Working version

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints 0, 1, 2
```

### What changes mechanically

With `for (let i = ...)`, the language creates a **new lexical environment / new binding slot for `i` each iteration**.

So the callbacks do *exactly the same* thing as before (they store `[[Environment]]`), but now:

- callback from iteration 0 points at an environment record where `i` slot is `0`
- callback from iteration 1 points at an environment record where `i` slot is `1`
- callback from iteration 2 points at an environment record where `i` slot is `2`

Each closure resolves `i` to a **different slot**, so it prints the expected values.

---

## Key corrections (common mental traps)

- **A closure does not “store the value of `i` inside the function.”**
  - It stores `[[Environment]]` (where to look up `i` later).
  - The “remembered value” effect comes from *which binding slot* the closure points to.

- **Execution contexts are created on call, not on creation.**
  - The handler’s EC is created when you click (or when the timeout fires).
  - The closure’s `[[Environment]]` pointer was saved earlier, when the function object was created.

---

## Fix patterns when you must use `var`

### 1) IIFE (your file’s fix)

```js
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 100);
  })(i);
}
```

Why it works: `j` is a **parameter binding** (a new slot per call to the IIFE). Each callback closes over a different `j` slot.

### 2) Pass data explicitly (DOM case)

Instead of relying on `i` in the closure, store the index on the element (or compute it from an id), then read that value in the handler.

---

## Quick summary

- **`var` in loops**: one function-scoped `i` binding slot → callbacks share it → they see the “final” value.
- **`let` in `for` loops**: a fresh per-iteration `i` binding slot → callbacks close over different slots → they see per-iteration values.

