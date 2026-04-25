# Briefing: Execution contexts in JavaScript

A short teaching document for explaining *what* execution contexts are, *why* the engine uses them, *when* they appear, how misunderstanding them shows up in debugging, and *analogies* that stick.

---

## What is an execution context?

An **execution context** is the internal “runtime setting” the JavaScript engine creates whenever it is about to run a chunk of code. It is where the engine keeps the information it needs to run that code correctly: how to **look up variables** (bindings and the scope chain), what **`this`** refers to, and (where relevant) how **`new.target`**, **`super`**, and **module** semantics behave.

You can think of it as **one frame of work** on the engine’s **call stack**: the code that is *currently* running (or the global program) has an active context; each function call adds another; returning from a function removes the top one.

**Important nuance for teaching:** Developers often say “scope” when they mean “where can I see this variable?” **Scope** (lexical structure in source code) and **execution contexts** (what the engine builds at runtime) are related but not the same word. Closures and the scope chain connect them: a function’s body is tied to lexical scopes, but **each invocation** of that function can get a **fresh** function execution context with its own local bindings.

---

## What purpose do they serve?

Execution contexts exist so the engine can:

1. **Resolve names** — When code reads or writes `x`, the engine knows which binding `x` refers to by walking the environment chain attached to the current context (and outer contexts still on the stack or closed over).
2. **Bind `this`** — The same function text can run with different `this` values depending on *how* it was called (`obj.method()`, `fn()`, `call`/`apply`/`bind`, arrow functions, classes, etc.). The active context carries the rules for `this` for that invocation.
3. **Manage the call stack** — Nested calls push contexts; returns pop them. That matches our mental model of “who called whom” and matches what stack traces show (at a high level).
4. **Separate global vs function vs special cases** — For example, **module code** and **`eval`** have distinct rules compared to a plain script or a normal function body; the engine models those with appropriate context kinds.

Without execution contexts (and the environments they carry), the engine could not implement **closures**, **recursion**, or **consistent variable lookup** across nested calls.

---

## When are they created?

Typical cases learners should know:

| Situation | What happens |
|-----------|----------------|
| **Start of a script** | A **global** execution context is created for that realm (e.g. browser window global, or Node’s main module global). |
| **Function call** | Each **invocation** creates a **function** execution context (new locals, arguments, and `this` binding for that call). |
| **`eval`** | A dedicated context is created for code run through `eval` (with implications for performance and, in strict mode, scope behavior). |
| **Modules** | Module code runs in a context with module scope rules (import/export bindings, top-level `this` in modules, etc.). |

**Not a separate “execution context” in the old three-type story, but critical today:** **`let` / `const` / `class` in a block** create **lexical environments** for that block. Learners often confuse “new block” with “new function call.” Blocks do not automatically mean a new function context; they mean **new lexical bindings** for those declarations inside the same running context until you enter a new function invocation or other boundary the spec treats specially.

---

## Common debugging issues when execution contexts are misunderstood

These show up constantly in real codebases:

1. **Wrong mental model of `this`** — Expecting `this` inside a callback or detached method to “stick” to the object that created the function. In reality, `this` is determined by the **call** (with exceptions such as arrow functions, which inherit `this` from the **surrounding lexical context**). Symptoms: `this` is `undefined` in strict mode, or the global object in sloppy mode, or an unexpected DOM node in handlers.

2. **Loops and delayed callbacks** — A classic: `var` in a loop plus async callbacks, or misunderstanding that each iteration might share one binding. Fix is usually `let`, an IIFE, or passing the index as an argument—each approach changes *what gets closed over* or *when* a new binding exists.

3. **Confusing stack traces with closure lifetime** — A function has **returned** (its execution context is gone from the stack), but **inner functions** still run later (timers, promises, event listeners). Errors like “Cannot read property of undefined” happen in the inner function while the learner is still staring at the outer function’s source as if it were still “on the stack.”

4. **Temporal dead zone (TDZ) with `let`/`const`** — `ReferenceError` when accessing a block-scoped binding before its declaration line. This is about **binding creation time** in the lexical environment, not hoisting in the `var` sense. Misunderstanding leads to “but I declared it later in the same function” confusion.

5. **Shadowing and “which `x`?”** — Same identifier in inner and outer scopes; the inner binding wins in the inner context’s environment chain. Debuggers show the right value, but learners misread nested scopes in the source.

6. **Strict vs sloppy global behavior** — Assigning to an undeclared variable or subtle `this` differences. The global context still exists, but the rules differ.

Teaching tip: when someone is stuck, ask **“Which function *invocation* is running when this line executes?”** and **“What environment chain does that invocation see?”** That usually collapses the mystery faster than re-reading the code linearly.

---

## Analogies to remember execution contexts

Use more than one; different people latch onto different images.

1. **Stack of desks** — Each function call is a **new desk** stacked on top. Only the top desk’s “papers” (local variables) are in easy reach. When the function finishes, that desk is **removed**; the caller’s desk is visible again. The **closure** is a worker who took **a photocopy** of an outer desk’s binder before that desk was cleared—they can still read those pages when working alone later.

2. **Nested phone calls** — You (global) call Alice; Alice calls Bob. While talking to Bob, **Bob’s question** is answered in **Bob’s conversation**. When Bob hangs up, you’re back to **Alice’s** context. Stack traces are the **call history** on the phone bill.

3. **Layers of transparency on a map** — Base map is global; each function call adds a **transparency sheet** with local labels. Looking up a name means checking the top sheet first, then peeling down until you find the name or run out of sheets.

4. **Theater stages** — Global is the **backdrop**. Each function call opens a **spotlight on a small stage** in front; props on that stage are locals. When the scene ends, the small stage folds away; the backdrop and earlier stages (still in memory via closures) remain for encores.

5. **`this` as the “current speaker” badge** — In a meeting, the **badge** (`this`) is passed to **whoever has the floor** when a method runs. Handing someone a function is not the same as handing them the badge—unless you **bind** it or use an arrow function (arrow: “whoever was speaking in the **outer** room when this function was defined”).

---

## Closing note for instructors

Modern engines also optimize aggressively (inline caches, hidden classes, etc.), but the **mental model** above—**contexts on a stack**, **environments for lookup**, **closures keeping outer environments alive**, **`this` per call**—remains what you want learners to carry into debugging and design decisions.

If you add one exercise, use a **small nested call** plus a **delayed callback** that closes over a loop variable; have learners predict `this`, the final values, and what the stack looks like at the moment the callback runs.
