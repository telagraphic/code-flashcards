# `this` in JavaScript: lexical arrows vs dynamic calls

A compact guide to how `this` is chosen at runtime, how that differs from **lexical** variable lookup, and how **classes**, **ordinary functions**, and **arrow functions** interact with those rules.

---

## Warm-up: two different questions on the same line

If you already understand **closures**, you are used to asking: “Where was this function **written** in the source?” That decides which outer variables it can read. That lookup is **lexical** (static structure of the code), and it is the same idea for **every call** unless you shadow names or reassign bindings.

`this` (for **non-arrow** functions) asks a different question: “**Who is calling** this function **right now**?” or, more precisely, “What is the **receiver** of this call?” That answer is mostly decided at the **call site**, so the **same function object** can run with **different** `this` values on different calls.

On many lines you are doing **both** checks at once:

- **`userId`** → walk lexical scopes until you find the right binding.
- **`this`** → ignore “where the function text lives” (mostly) and look at **how** the function was invoked (`user.save()` vs `save()`).

That split is the core confusion: **lexical names** “travel with” the function’s definition; **ordinary `this`** “hands off” depending on the **latest** call.

---

## Side-by-side: a lexical name vs `this`

Here one function reads a **lexical** `id` (stable) and also reads **`this.label`** (changes per call):

```javascript
"use strict";

let id = "lexical-id";

function line(prefix) {
  console.log(prefix, "id =", id); // always the outer `id` (lexical)
  console.log(prefix, "this.label =", this?.label); // depends on the call
}

const a = { label: "A", run: line };
const b = { label: "B", run: line };

a.run("call 1"); // same function text, `this` is `a`
b.run("call 2"); // same function text, `this` is `b`
```

Nothing about `line`’s **source location** changed between calls. **`id` followed lexical scope.** **`this` followed the receiver** (`a` vs `b`) chosen by `a.run(...)` vs `b.run(...)`.

---

## How `this` gets “wired” on a simple call (beginner steps)

Think of the engine doing a tiny checklist **each time** a non-arrow function **starts running**.

**Method style:** `user.log()`

1. Evaluate `user` → some object (the **receiver** candidate).
2. Look up `log` → a function.
3. Because the call is `receiver.method(...)`, the engine enters `log` with **`this` = that receiver** (`user` here).

**Detached style:** `const f = user.log; f();`

1–2. Same function value as before.
3. The call is `f()` — **no** `receiver.` in front of the parentheses, so this is a **bare call**. In **strict mode**, `this` is usually **`undefined`** (no automatic “global object” fallback).

So **`this` is bound per invocation**: each entry into the function body gets a fresh `this` value chosen from the call (or from `call` / `apply` / `bind`, or from `new`, etc.). That is different from resolving `let` / `const` names, which follows the **nested scopes written in the file**.

---

## Basic scenarios (beginner → medium)

These are small “story beats” you can pattern-match in real code.

**1) Dot call — `this` is “what’s left of the dot”**  
After the left side is evaluated, `this` is that value (except for primitives, which get boxed in rare cases—ignore until later).

```javascript
const cart = { total: 0, add(n) { this.total += n; } };
cart.add(3); // `this` is `cart`
```

**2) Bracket call is still a method call**  
`cart["add"](2)` behaves like a dot call for `this` purposes: **`this` is `cart`**.

**3) Storing the method in a variable loses the dot**  
`const add = cart.add; add(1)` is a **bare call** → strict `this` is **`undefined`** → usually throws when the body touches `this.total`.

**4) Passing a method as a callback**  
`setTimeout(cart.add, 100)` eventually does something equivalent to calling the function **without** `cart.` in front of it, so you hit the same “lost receiver” problem. Fixes: `() => cart.add(1)`, `cart.add.bind(cart)`, or a class **field** arrow (see Classes).

**5) Arrow inside a method (common fix)**  
The arrow does **not** get a new `this` from the timer/`map`/HTTP library. It **reuses** the `this` from the **enclosing** function **for that invocation**. In the snippet below, the enclosing function is `addLater`; when you call `cart.addLater()`, that enclosing `this` is **`cart`**, so the arrow sees **`cart`** when it eventually runs.

```javascript
const cart = { total: 0, addLater() {
  setTimeout(() => { this.total++; }, 0); // `this` follows `addLater`’s call
}};
cart.addLater(); // when the arrow runs, outer `this` was `cart`
```

**6) Optional medium detail: some APIs take `thisArg`**  
For example, `array.forEach(fn, thisObj)` will call `fn` with **`this` set to `thisObj`** for each iteration. That is **not** magic—just that specific API threading a receiver through. If you omit `thisArg`, you get the usual rules for whatever `fn` is.

---

## The one-sentence model

- For **non-arrow functions**, `this` is a **dynamic receiver**: it is determined mostly by **how the function is invoked** (or by `call` / `apply` / `bind`), not by where the function text appears in the source file.
- For **arrow functions**, `this` is **lexically inherited** from the nearest enclosing **non-arrow** function or other `this`-establishing scope (global/module, class field initializer context, etc.), and **cannot** be changed with `call` / `apply` / `bind`.

**Important vocabulary:** `this` is not a “variable” resolved through the scope chain like `x`. The engine sets a **this binding** for each ordinary function call (and a few special cases). Arrows **do not** get their own `this` binding; they see the outer one.

---

## Lexical scoping vs `this` (slightly longer view)

**Lexical scoping** answers: “Which binding does `count` refer to?”  
That follows nested blocks/functions/modules in the **source text** and is stable regardless of who calls the function.

**`this`** answers: “Who is the **receiver** of this call?”  
For ordinary functions, that is decided at the **call site** (dynamic), so the **same function object** can run with different `this` values on different calls.

So: **lexical scope** is about identifier lookup; **`this`** is a separate mechanism that often *changes per invocation* for plain functions.

**Tiny contrast in one place:**

```javascript
function outer() {
  const hidden = 1;
  return function inner() {
    return hidden; // lexical: always `outer`’s `hidden` for this closure
  };
}

const inner = outer();
inner(); // `hidden` is still found lexically

// Compare to a method-style function that also reads `this`:
const tool = {
  n: 10,
  read() {
    return this.n; // NOT lexical to `tool` — depends on call shape
  },
};
```

`inner` always finds `hidden` the same way. `read` can return `10` **or** throw, depending on whether you call `tool.read()` or `const r = tool.read; r()`.

---

## Ordinary functions: how `this` is set

Typical rules (strict mode assumed for teaching; sloppy mode differs mainly for “bare” calls):

| Call form | `this` inside the callee |
|-----------|---------------------------|
| `obj.method()` | `obj` (the object before the dot / bracket) |
| `method()` (bare call) | `undefined` in strict mode (often `globalThis` in sloppy non-class code) |
| `new Ctor()` | the new object under construction |
| `fn.call(receiver, …)` / `fn.apply(receiver, …)` | `receiver` |
| `bound = fn.bind(receiver)` then `bound()` | `receiver` |
| `obj?.method()` | `obj` when the call actually happens (short-circuits before the call if `obj` is nullish) |

**Detached methods** lose the receiver:

```javascript
const obj = {
  tag: "obj",
  readThis() { return this; },
};

const detached = obj.readThis;
detached(); // undefined in strict mode — not a method call anymore
```

**Fixes** people use: `detached.call(obj)`, `obj.readThis.bind(obj)`, wrap in an arrow at creation time, or use a class **field** initializer with an arrow (see below).

---

## Arrow functions: lexical `this`

An arrow function **does not** define its own `this`. It closes over the `this` value of the **lexically enclosing** scope where the arrow was **created** (when that outer scope’s `this` is already fixed for that moment).

Consequences:

1. **`call` / `apply` / `bind` on an arrow** only affect arguments (if any); they **do not** retarget `this`.
2. An arrow inside a method still sees the **outer** function’s `this` — which is usually correct **if** the outer function was invoked as a method **before** the arrow runs (e.g. timer or `map` callback).

```javascript
const timer = {
  name: "timer",
  start() {
    setTimeout(() => {
      // `this` is `timer` because `start` was called as timer.start()
      console.log(this.name);
    }, 0);
  },
};
```

If you define an arrow at **module top level** or **object literal** initialization time, its `this` is whatever `this` was **there** (often `undefined` in ES modules, or `globalThis` in a sloppy script).

---

## Classes

### Instance methods

Non-static methods behave like functions assigned on the prototype: **`this` is the instance** when called as `instance.method()`, and is **wrong** if the method is passed around unbound (same “detached method” issue as objects).

```javascript
class Counter {
  n = 0;
  inc() { this.n++; }
}

const c = new Counter();
const inc = c.inc;
inc(); // strict: `this` is undefined — runtime error when touching `this.n`
```

### Constructors

Inside `constructor`, `this` is the **instance being constructed** (before `return` unless you replace it in exotic cases).

### Static methods

`static m()` uses **`this` as the constructor function** (`Counter`) when invoked as `Counter.m()`, not an instance.

### Field initializers and arrows

**Public instance fields** run per instance. If a field is an **arrow function**, that arrow captures `this` from the **initializer environment** — effectively the instance — so `this` stays stable when the arrow is later used as a callback.

```javascript
class Button {
  label = "ok";
  onClick = () => {
    // `this` is always the instance for this arrow
    console.log(this.label);
  };
}
```

That trades a **new function per instance** for predictable `this`.

---

## Does `this` hold a “reference”?

Colloquially people say `this` “points to” an object. In practice:

- `this` is a **binding** fixed for a given invocation (or inherited lexically for arrows).
- Reassigning **properties** on `this` mutates whatever object it names; **rebinding** `this` itself is not something user code does — you get a **new** `this` on the **next** ordinary call.

---

## Quick decision checklist

1. Is the callee an **arrow**? → Take `this` from the **lexically enclosing** `this` binding; ignore `call`/`apply`/`bind` for `this`.
2. Otherwise, was it called with **`new`**? → `this` is the new instance.
3. Otherwise, is there an explicit **`call` / `apply` / `bind`**? → use that receiver.
4. Otherwise, is it a **method call** `base.fn()`? → `this` is `base` (after optional chaining rules).
5. Otherwise, **bare call** → `undefined` in strict mode / module-ish contexts (learn sloppy rules separately if needed).

---

## Teaching pitfalls

- Assuming `this` “belongs to” the object literal or class where the function **text** appears — it belongs to the **call**, except for arrows.
- Using **object method shorthand** with arrows expecting dynamic `this` — arrows freeze outer `this` at creation time.
- Forgetting **strict mode** changes bare-call `this` from `globalThis` to `undefined`.

For deeper ties to execution contexts and the scope chain, see `briefing-execution-contexts.md` and `model-execution-contexts-scope-chain-call-stack.md` in this folder.

---

## Practice

See `this-challenges/` in this folder for short “what is `this`?” scenarios (strict mode, classes, arrows, `super`, optional chaining, promises, and common traps).
