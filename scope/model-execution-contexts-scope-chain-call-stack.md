# Model: Execution contexts, lexical environments, scope chain, and the call stack (JavaScript)

This is a “complete picture” teaching document that ties together:

- **Lexical scope** (static structure in the source code)
- **Lexical environments / environment records** (runtime structures for name lookup)
- **Execution contexts** (runtime frames that run code)
- **The scope chain** (environment links used during identifier resolution)
- **The call stack** (the stack of active execution contexts)
- **Closures** (functions keeping outer environments alive)

It also ends with **anti-patterns and common debugging traps** that usually come from mixing these concepts up.

---

## The core distinction: “lexical scope” vs “execution context”

### Lexical scope (static)
**Lexical scope** is determined by where code is *written* (the nesting of blocks/functions/modules in the source).

- It answers: **“Which declarations are *in principle* visible from this line of code?”**
- It does **not** depend on how functions are called.

### Execution context (dynamic)
An **execution context** is created when the engine *begins running* a particular chunk of code (global/script, module, or a function invocation).

- It answers: **“What runtime frame is currently executing?”**
- It *does* depend on runtime behavior: **each function call** creates a new execution context.

**Key teaching sentence:** lexical scope is about *where code is written*; execution contexts are about *what is running right now*.

---

## The “runtime data structures” mental model

Modern JS specs describe this using **execution contexts** and **lexical environments**. You don’t need to memorize spec names, but the *shape* matters.

### Execution context (what it carries)
At a high level, an execution context contains:

- **LexicalEnvironment**: the *current* environment used for resolving identifiers (includes block scopes).
- **VariableEnvironment**: the environment for `var`-declared bindings (historically distinct; often effectively the function/global environment).
- **ThisBinding**: what `this` is for this execution context (varies by call style and function type).
- **Realm / module info / strictness / new.target / super**: other per-context semantics (important, but secondary to variable lookup for most learners).

### Lexical environment (what name lookup walks)
A **lexical environment** is a pair:

- **Environment Record**: a mapping from names → bindings/values (plus rules like mutability).
- **Outer (parent) environment reference**: a pointer to the next environment outward.

That “outer pointer” is what people colloquially call the **scope chain** at runtime.

### The scope chain (runtime view)
When code refers to an identifier like `x`, the engine effectively does:

1. Look for `x` in the **current environment record**.
2. If not found, follow **Outer** to the next environment.
3. Repeat until found, or until the chain ends (then it’s an error).

This is the operational meaning of “lexical scoping” at runtime: *lookup follows the lexical environment links.*

---

## The call stack: where execution contexts live (while active)

The **call stack** is a stack of **active execution contexts**.

- Calling a function **pushes** a new context on top.
- Returning from a function **pops** the top context.
- The currently running code is always the **top** of the stack.

When you see a synchronous stack trace, it is essentially a snapshot of this stack.

### Crucial nuance: stacks are about “who is executing now,” not “what data still exists”
Even after a function returns and its execution context is popped, some of its data can still live on via **closures** (explained below). So:

- **Call stack**: “active right now”
- **Heap + referenced environments**: “still reachable / still alive”

---

## Function creation vs function invocation (the closure bridge)

This is where many confusions vanish.

### When a function is *created*
When the engine evaluates a function expression / declaration, it creates a **function object**.
That function object carries a hidden reference to the lexical environment where it was created (often described as `[[Environment]]`).

This is why “lexical scope” is stable: **a function remembers where it was defined**, not where it is called from.

### When a function is *invoked*
When you call the function, the engine creates a **new execution context** for *that invocation*.
That context’s outer environment is set based on the function object’s saved `[[Environment]]`.

So, for a function call, the engine combines:

- **Dynamic**: a fresh execution context (locals/parameters for *this call*)
- **Static**: a fixed outer environment chain (from where the function was **defined**)

---

## Lifecycle: “creation/instantiation” phase vs “execution” phase

Many teaching resources call this “two phases,” and it’s a useful model:

1. **Instantiation (creation) phase**: create bindings (names exist), set up environments, set `this`, initialize some things.
2. **Execution phase**: run the code top-to-bottom, performing assignments and expressions.

This model explains **hoisting** and **TDZ** clearly.

### What “hoisting” really means
In the instantiation phase, the engine creates **bindings** for declarations so the name exists in the environment record *before* execution reaches that line.

Different declaration forms have different instantiation and initialization rules:

| Construct | Binding created when? | Initialized when? | Reads before init? | Notes |
|----------|------------------------|-------------------|--------------------|------|
| `function f() {}` (function declaration) | Instantiation | Instantiation | ✅ (callable) | The binding points at the function object immediately. |
| `var x` | Instantiation (function/global env) | Instantiation → `undefined` | ✅ (`undefined`) | The name exists early; assignment happens during execution. |
| `let x` / `const x` | Instantiation (block env) | Execution (at declaration) | ❌ `ReferenceError` | This is the **TDZ** rule. `const` also requires an initializer. |
| `class C {}` | Instantiation (block env) | Execution (at declaration) | ❌ `ReferenceError` | Similar TDZ behavior to `let`/`const`. |
| `import { x } from ...` | Module instantiation | Module instantiation | ✅ (live binding) | Imports are “live” bindings, not copies. |

### TDZ (Temporal Dead Zone) in one sentence
For `let`/`const`/`class`, the **binding exists** as soon as the block environment is created, but it is **uninitialized** until execution reaches the declaration; touching it earlier throws `ReferenceError`.

### Blocks create environments (not new execution contexts)
A common mistake is to think “entering a block creates a new execution context.” It usually does not.

- **Blocks** (`{ ... }`) can create a new **lexical environment** (for `let`/`const`/`class`) *within the same* execution context.
- **Function calls** create a new **execution context** (and also a new lexical environment for locals/params).

---

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

This is why arrows are often great for callbacks inside methods, and also why arrows are often *wrong* as object methods (they don’t get a dynamic receiver).

---

## Closures: why returned functions can still “see” locals

A **closure** happens when a function uses variables from an outer lexical environment, and the function object outlives the outer call.

### What actually stays alive
The outer **execution context** is popped off the call stack when the function returns, but the outer **lexical environment** can remain reachable because the returned inner function still references it.

If nothing references the environment anymore, it can be garbage-collected.

---

## Async: why the call stack “is empty” but your variables still exist

When async work runs later (timers, promise reactions, event handlers), the engine:

- finishes the current synchronous call stack (stack unwinds back to global/module)
- later, runs the callback in a **new** execution context

The callback still resolves free variables using its captured lexical environment chain.

### Debugging implication
You often cannot read an async bug by staring at the caller’s stack trace, because the caller’s context is gone. You have to ask:

- **What did the callback close over?**
- **What values changed between scheduling and running?**
- **What `this` will the callback have when it runs?**

---

## A concrete walkthrough: stack + environments + scope chain

Consider this program:

```js
const x = 10;

function outer(a) {
  let y = 20;

  function inner(b) {
    return x + a + y + b;
  }

  return inner;
}

const f = outer(1);
f(2);
```

### What happens, conceptually

1. **Global/module context is created**
   - Bindings are created for `x`, `outer`, and `f` (with TDZ rules for `const` and initialization timing).
2. **`outer(1)` is called**
   - A new execution context is pushed.
   - It creates its own environment record with `a` and `y`.
   - It also creates the function object `inner`, and `inner.[[Environment]]` points to `outer`’s environment.
3. **`outer` returns `inner`**
   - `outer`’s execution context is popped.
   - But `inner` still exists, so the environment containing `a` and `y` stays alive.
4. **`f(2)` is called**
   - New execution context for `inner` is pushed.
   - Resolving names inside `inner`:
     - `b` is found in `inner`’s local environment.
     - `a` and `y` are found by following the **outer environment link** into `outer`’s preserved environment (closure).
     - `x` is found by continuing outward to the global/module environment.

### The “complete picture” takeaway
- **Call stack** explains *which code is executing now*.
- **Scope chain (outer links)** explains *how identifiers resolve*.
- **Closures** explain *why an outer environment can outlive its call*.

---

## Global vs module: small differences that matter in debugging

### Global script (browser-style)
- Top-level `var` becomes a property on the global object in many environments (historically `window.x`).
- Top-level `let`/`const` create bindings in the global lexical environment but are **not** properties on the global object.

### ES modules
- Top-level scope is a module environment.
- Top-level `this` in modules is typically `undefined`, not the global object.
- Imports are **live bindings**, so imported names update as the exporter updates.

These differences often show up as “works in a script tag, breaks in a module” issues.

---

## Anti-patterns and common debugging traps

These are problems that commonly “break the rules” in your mental model (or exploit parts people forget), leading to errors.

### 1) Treating the call stack as “where variables live”
**Symptom:** “But `outer` already returned—how can `inner` still access `a`?”

- **Reality:** variables live in environments; stack frames are just active contexts.
- **Debugging move:** inspect what the callback/inner function closes over; don’t assume “returned” means “gone.”

### 2) Using `var` and expecting block scope
**Symptom:** loop callbacks all see the same index.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3
}
```

- **Reality:** `var` is function-scoped; there’s one binding shared across iterations.
- **Fix patterns:** `let i`, an IIFE, or pass `i` as an argument to a function to create a fresh binding.

### 3) TDZ surprises with `let`/`const`/`class`
**Symptom:** `ReferenceError: Cannot access 'x' before initialization`.

```js
{
  console.log(x); // ReferenceError (TDZ)
  let x = 1;
}
```

- **Reality:** the binding exists but is uninitialized until the declaration runs.
- **Debugging move:** look for shadowing (an inner `let x`) causing an unexpected TDZ.

### 4) Shadowing that changes meaning (especially in blocks)
**Symptom:** “Why is `x` undefined here?” / “Why is the outer `x` ignored?”

```js
let x = 5;
if (true) {
  let x = 0;      // shadows outer x
  // ...
}
```

- **Reality:** identifier resolution finds the nearest binding in the chain.
- **Debugging move:** in DevTools, expand “Scopes” and verify *which* environment record you’re reading.

### 5) Losing `this` by detaching a method
**Symptom:** `TypeError` or `this` is `undefined`.

```js
const obj = {
  x: 1,
  getX() { return this.x; }
};

const getX = obj.getX;
getX(); // undefined in strict mode
```

- **Reality:** `this` is set by the call-site; `getX()` isn’t a method call.
- **Fix patterns:** `obj.getX()`, or `obj.getX.bind(obj)`, or wrap in an arrow that calls the method.

### 6) Using arrow functions as methods (and expecting dynamic `this`)
**Symptom:** `this` is not the object.

```js
const obj = {
  x: 1,
  getX: () => this.x
};
obj.getX(); // usually undefined (captures outer this)
```

- **Reality:** arrow `this` is lexical, not dynamic.

### 7) Assuming “async preserves the current stack trace”
**Symptom:** stepping into a promise/timer callback feels like “teleportation.”

- **Reality:** async callbacks run in new contexts later.
- **Debugging move:** log/capture the data you need at scheduling time; use async stack traces tooling if available, but keep the model: **new stack, same closure chain**.

### 8) Accidental globals (sloppy mode)
**Symptom:** code “works” but leaks variables; later code mysteriously changes them.

```js
function f() {
  x = 10; // creates/assigns a global in sloppy mode
}
```

- **Reality:** without `let`/`const`/`var`, assignment can target the global object in non-strict scripts.
- **Fix patterns:** strict mode, linters, always declare.

### 9) `eval` / `with`: dynamic scope-like behavior
**Symptom:** unpredictable variable resolution; performance cliffs.

- **Reality:** these constructs can make identifier resolution depend on runtime strings/objects, undermining lexical assumptions.
- **Guideline:** avoid them in production; they complicate reasoning and debugging.

### 10) Recursion and stack overflow
**Symptom:** `RangeError: Maximum call stack size exceeded`.

- **Reality:** each recursive call pushes a new execution context.
- **Fix patterns:** iterative rewrite, trampoline, or rely on engines/features that optimize tail calls (not generally available in JS engines as a guarantee).

---

## One-sentence “complete picture” summary

JavaScript is **lexically scoped** (functions remember where they were defined), the engine executes code in **execution contexts** (stack frames), identifier resolution walks the **scope chain** (linked lexical environments), and **closures** keep outer environments alive even after their contexts leave the **call stack**—while async code runs later on a fresh stack but with the same captured environment links.
