# `this` overview (master cheat sheet)

This document is a single place to solidify:

- **How `this` is chosen** (dynamic vs lexical)
- How **call/apply/bind** change `this`
- How this relates to **execution contexts** vs **lexical scope**
- Common “looks like scope, but is actually `this`” traps (like the challenges in `scope/this-challenges/`)

If you want the longer versions, these are the two “source of truth” docs this overview is built from:

- `scope/this-lexical-vs-dynamic-receiver.md`
- `scope/model-execution-contexts-scope-chain-call-stack.md`

---

## One sentence that fixes most confusion

For **non-arrow** functions, **`this` is determined at the call-site** (it’s a *receiver*, not a lexically-scoped variable).  
For **arrow** functions, **`this` is lexically inherited** from the surrounding `this` at creation time.

Your repo already states this clearly:

```9:18:scope/this-lexical-vs-dynamic-receiver.md
If you already understand **closures**, you are used to asking: “Where was this function **written** in the source?” That decides which outer variables it can read. That lookup is **lexical** (static structure of the code), and it is the same idea for **every call** unless you shadow names or reassign bindings.

`this` (for **non-arrow** functions) asks a different question: “**Who is calling** this function **right now**?” or, more precisely, “What is the **receiver** of this call?” That answer is mostly decided at the **call site**, so the **same function object** can run with **different** `this` values on different calls.
```

---

## `this` is not “scope”: where it lives at runtime

Lexical scope/name lookup and `this` are *different mechanisms*:

- **lexical scope**: resolves identifiers like `x` by walking the **scope chain** (lexical environments)
- **`this`** (for non-arrows): comes from the **execution context** created for *this invocation*

```137:153:scope/model-execution-contexts-scope-chain-call-stack.md
## `this`: per-call binding (except arrows)

`this` is not part of lexical scope; it’s part of the execution context’s call semantics.

### Normal functions: `this` depends on *how you call it*
Roughly:

- `obj.method()` → `this === obj`
- `fn()` (strict mode) → `this === undefined`
- `fn()` (sloppy mode) → `this === globalThis` (browser: `window`)
- `fn.call(x)` / `fn.apply(x)` / `fn.bind(x)` → `this` is forced to `x`
- `new Fn()` → `this` is the newly created instance

### Arrow functions: `this` is lexical
Arrow functions do not create their own `this`. They **capture** `this` from the surrounding (outer) execution context at creation time.
```

If you remember only one “bridge” sentence:

- **Scope chain** answers “which `x` is this?”
- **`this` binding** answers “which object is the receiver of *this call*?”

---

## The call-site decision tree (how the engine picks `this`)

When an invocation begins, a `this` value is chosen for that *invocation*.

### 1) Is the function an arrow?

- **Yes** → `this` is **lexically inherited** (cannot be changed by `call/apply/bind`)
- **No** → keep going (dynamic receiver rules)

### 2) Was it called with `new`?

- `new Fn()` → `this` is the **new instance**
- (Note: `new` interacts with `bind`, but conceptually: `new` creates the instance receiver.)

### 3) Was it invoked with an explicit receiver override?

- `fn.call(receiver, ...)` → `this = receiver`
- `fn.apply(receiver, [...])` → `this = receiver`
- `bound = fn.bind(receiver)` then `bound()` → `this = receiver` (for normal calls)

### 4) Was it invoked as a property call?

- `obj.method()` / `obj["method"]()` → `this = obj` (the value to the left of `()` after evaluation)

### 5) Otherwise: bare call

- `fn()` → `this = undefined` in **strict mode** / ES modules; in sloppy scripts it may become `globalThis`

This decision tree is the same idea used across the “what is `this`?” challenge set in `scope/this-challenges/` (method vs bare call, destructuring, optional chaining, promise callbacks, etc.).

---

## Your Button example: why `this.label` is the instance (not “the class”)

In your file `scope/use-cases/call-usecase-2.md`, the method reads `this.label`:

```21:39:scope/use-cases/call-usecase-2.md
// Practical: Event handler with context
class Button {
  constructor(label) {
    this.label = label;
    this.clickCount = 0;
  }
  
  handleClick() {
    this.clickCount++;
    console.log(`${this.label} clicked ${this.clickCount} times`);
  }
}

const button1 = new Button('Submit');
const button2 = new Button('Cancel');

// Call same method with different contexts
button1.handleClick.call(button1); // 'Submit clicked 1 times'
button2.handleClick.call(button2); // 'Cancel clicked 1 times'
```

### What you expected (and why it’s a common expectation)

It’s natural to think “the method is written inside `class Button`, so `this` should refer to `Button`”.

That expectation is **lexical-scope thinking** (“where is the function written?”), but **`this` for non-arrow methods is not lexical**. It’s chosen by **how the method is invoked**.

### What actually happens

- `new Button('Submit')` creates an **instance object**.
- Inside `constructor`, `this` is that **new instance**, so `this.label = label` puts `label` on the **instance**.
- Later, when you call the method with receiver `button1`, the method’s `this` is `button1`, so `this.label` means `button1.label`.

### So why use `call` here at all?

In *this exact snippet*, `call` is **not required**, because:

- `button1.handleClick()` already sets `this` to `button1`
- `button2.handleClick()` already sets `this` to `button2`

`call` becomes necessary when the receiver would otherwise be **lost** (a detached method / callback situation). The core bug pattern is:

- **Works**: `button1.handleClick()` (property call keeps the receiver)
- **Breaks**: `const f = button1.handleClick; f()` (bare call has no receiver → `this` becomes `undefined` in strict mode)
- **Fix**: `f.call(button1)` or `const bound = f.bind(button1)`

### What “detached” means (what happened on the **Breaks** line)

In JavaScript, `button1.handleClick` is just a **property lookup** that evaluates to a **function value**.

So the “Breaks” line is two steps:

- **Step 1 (read a value)**: `const f = button1.handleClick;`  
  Store the function in a variable. No call happened yet, so no `this` was chosen yet.
- **Step 2 (call without a receiver)**: `f()`  
  This call expression has **no receiver**, so it’s a **bare call**. In strict mode, that means `this === undefined` inside `handleClick`.

This is why people say the method got “detached”: the function was **pulled off the object** and later called **without** `button1.` in front of it.

### Why JavaScript works this way

- **Functions don’t “belong to” objects**. Objects just store references to values, and those values can be functions.
- For **non-arrow** functions, **`this` is not captured at property-read time**. It’s chosen at **call time** from the call-site shape (`obj.method()` vs `method()`).

### Common real-world detachment patterns

- **Assignment**: `const m = obj.method; m()`
- **Destructuring**: `const { method } = obj; method()`
- **Callbacks**: `setTimeout(obj.method, 0)` (later it runs like a bare call)
- **Handlers**: `el.addEventListener("click", obj.method)` (the platform calls it; not as `obj.method()`)

### Fix patterns (choose one)

- **Call as a property**: `obj.method()` (keep the receiver)
- **One-off receiver**: `method.call(obj, ...)`
- **Pre-bind for later**: `const method = obj.method.bind(obj)`
- **Wrap**: `() => obj.method(...)`

That “receiver can be lost” is the exact same mechanism behind the `this` challenge files like:

- `scope/this-challenges/this-binding-challenge-method-vs-bare.md`
- `scope/this-challenges/this-binding-challenge-destructure-method.md`

---

## `call` vs `apply` vs `bind` (what changes, what doesn’t)

All three exist to do **one** thing: provide a receiver (`this`) for a **normal** function call (and optionally help with argument passing).

Use your existing baseline comparison as the API reminder:

```14:31:scope/basics/call-apply-bind-basics.md
// call() - calls function with specific 'this' and individual arguments
const result1 = person.greet.call({ name: 'Bob' }, 'Hello', '!');

// apply() - calls function with specific 'this' and array of arguments
const result2 = person.greet.apply({ name: 'Charlie' }, ['Hi', '?']);

// bind() - creates new function with bound 'this' and optional arguments
const boundGreet = person.greet.bind({ name: 'Diana' });
const result3 = boundGreet('Hey', '!');
```

### The “mental model” differences

- **`call`**: “Run *now* with this receiver; args are listed”
- **`apply`**: “Run *now* with this receiver; args come as an array”
- **`bind`**: “Make me a new function that will *later* run with this receiver” (and supports partial application)

### What they do *not* do

- They do **not** change lexical scope (closures still close over the same outer variables).
- They do **not** change `this` for **arrow functions** (arrows ignore `call/apply/bind` for `this`).

---

## “Looks like scope” traps that are really `this` traps

When you’re stuck, classify the bug:

- **If the problem is a name like `x`**: it’s lexical scope / environments / TDZ / shadowing.
- **If the problem is `this`**: it’s almost always “what did the call-site look like when this invocation started?”

High-yield call-site shapes (all represented in `scope/this-challenges/`):

- **Detached method**: `const m = obj.method; m()` (receiver lost)
- **Destructure method**: `const { method } = obj; method()` (receiver lost)
- **Chained property**: `(obj.getObj()).method()` (receiver is *result of expression*, not the original `obj`)
- **Optional chaining**: `obj?.method()` (either short-circuit, or receiver is `obj`)
- **Promise/timer callbacks**: the library calls your function later; if you pass `obj.method` directly, it becomes a bare call

---

## Defensive / best practices (modern JS) to avoid detachment bugs

Detachment is not “always a problem” — if you always call methods as `obj.method()`, you’ll be fine. It becomes a recurring issue in **callbacks, event handlers, destructuring, and higher-order APIs**, where it’s easy to pass around `obj.method` as a plain function value.

### Prefer patterns that don’t depend on dynamic `this`

- **Pass explicit values instead of relying on `this`**: write functions as `fn(obj, ...)` (or `fn({ ... })`) instead of `obj.fn(...)` when the function is meant to be reused broadly.
- **Use closures instead of `this` for private state** when appropriate (especially outside classes).

### When you do use methods, keep the receiver attached

- **Call it as a property at the call-site**: prefer `obj.method()` over extracting then calling.
- **When handing a method to something else, don’t pass `obj.method` directly** unless you know that API will call it with the right receiver.
  - **Wrap**: `() => obj.method(arg1, arg2)`
  - **Or bind once**: `const onClick = obj.method.bind(obj)`

### In classes: make callback-shaped methods stable

If a method is commonly used as a callback (handlers, timers, promise callbacks), pick one of these conventions:

- **Instance field arrow** (stable `this`, common in React/DOM handlers):
  - `onClick = (e) => { this.handle(e); }`
  - Trade-off: one function per instance (usually acceptable).
- **Bind once in the constructor** (classic approach):
  - `this.handleClick = this.handleClick.bind(this)`
  - Trade-off: slightly more boilerplate, but one-time cost and stable identity.

### Avoid the “arrow as method” trap

Don’t use arrow functions as object literal “methods” if you expect `obj.method()` to give you `this === obj`. Arrows don’t get a dynamic receiver; they inherit `this` from where they were created (see `scope/this-lexical-vs-dynamic-receiver.md`).

### Use tooling to catch it early

- **Use modules / strict mode** so bare-call `this` becomes `undefined` (fail fast instead of silently using `globalThis`).
- **Linting / TypeScript** can flag suspicious `this` usage and unbound method passing (especially when destructuring methods or passing them as callbacks).

---

## A practical “debug checklist” for `this`

When a line reads `this.something`:

- **Step 1**: Find the *exact call-site* that invoked the current function.
- **Step 2**: Decide which bucket it’s in:
  - arrow (lexical `this`)
  - `new`
  - `call/apply/bind`
  - property call `base.fn()`
  - bare call `fn()`
- **Step 3**: If the receiver is wrong, choose one fix:
  - call as a property: `obj.method()`
  - force receiver: `method.call(obj, ...)`
  - pre-bind: `const method = obj.method.bind(obj)`
  - wrap: `() => obj.method(...)`
  - for classes used as callbacks often: use an instance field arrow (see `scope/this-lexical-vs-dynamic-receiver.md` “Field initializers and arrows” section)

---

## Suggested “study path” in this repo

- **Start**: `scope/this-lexical-vs-dynamic-receiver.md`
- **Bridge to scope**: `scope/briefing-execution-contexts.md` then `scope/model-execution-contexts-scope-chain-call-stack.md`
- **Practice**: pick 3–5 from `scope/this-challenges/` (especially `method-vs-bare`, `destructure-method`, `call-apply-bind`)
- **Use-cases**: `scope/use-cases/call-usecase-1.md` and `scope/use-cases/call-usecase-2.md`
