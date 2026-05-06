# References vs Values in JavaScript (Modern + Edge Cases)

JavaScript can feel confusing here because people mix two different ideas:

- **Value categories** (primitive values vs objects/functions)
- **What variables hold** (a variable holds *a value*; that value might be a primitive, or it might be a *reference value* that points to an object)

This doc explains what “by value” and “by reference” mean in JavaScript, how to recognize each case, and why it matters for correctness, performance, and “behind the scenes” behavior (heap/GC/execution contexts).

---

## What is a “value” in JavaScript?

In JavaScript, **everything you manipulate is a value**.

### Primitive values (copied by value)

Primitives are immutable values:

- `string`
- `number`
- `bigint`
- `boolean`
- `undefined`
- `symbol`
- `null`

When you assign a primitive to a new variable, you get a **copy of the value**.

```js
let a = 5;
let b = a;   // copy the number value 5
b = 6;
console.log(a); // 5
```

### Object values (the value is a reference)

Objects include:

- object literals `{}`, arrays `[]`
- functions `() => {}`
- dates, regexes, maps, sets, errors, typed arrays, etc.

When you assign an object to a new variable, you copy the **reference value** (think: “pointer-like handle”) that points to the same underlying object.

```js
const original = { count: 0 };
const alias = original;     // copy the reference value

alias.count += 1;           // mutate the same object
console.log(original.count); // 1
```

**Key idea:** the “reference” itself is still a value. JavaScript does not expose raw memory addresses, but conceptually the reference value identifies the object.

---

## Why this is tricky: mutation vs reassignment

Most confusion comes from mixing up:

- **Reassignment**: changing what a variable points to
- **Mutation**: changing the contents of the object being pointed to

### Reassignment changes only that variable binding

```js
let x = { n: 1 };
let y = x;

y = { n: 2 };     // reassignment: y now points elsewhere
console.log(x.n); // 1
```

### Mutation affects all references to that object

```js
const x = { n: 1 };
const y = x;

y.n = 2;          // mutation: same object
console.log(x.n); // 2
```

### `const` does NOT make objects immutable

`const` prevents reassignment, not mutation.

```js
const settings = { theme: "light" };
settings.theme = "dark"; // ok (mutation)
// settings = {};        // TypeError (reassignment)
```

---

## Are objects “passed by reference” in function calls?

In JavaScript, **arguments are passed by value**.

But when the value is an object reference, it can *feel* like pass-by-reference because mutations are visible outside the function.

### Example: mutating an object parameter

```js
function addFlag(obj) {
  obj.enabled = true; // mutates the object
}

const cfg = {};
addFlag(cfg);
console.log(cfg.enabled); // true
```

### Example: reassigning the parameter does NOT affect the caller

```js
function replace(obj) {
  obj = { enabled: true }; // only changes the local parameter binding
}

const cfg = {};
replace(cfg);
console.log(cfg.enabled); // undefined
```

**Mental model:** the function receives a copy of the value stored in the variable. For objects, that copied value is a reference to the same object.

---

## How to tell: is this “reference” behavior or “value” behavior?

Use these heuristics.

### 1) Primitives behave like independent copies

If reassigning one variable does not affect another, you’re likely dealing with primitives (or you made a real copy).

```js
let a = "hi";
let b = a;
b = b.toUpperCase();
console.log(a); // "hi"
```

### 2) If you mutate a shared object, you’ll see changes through other variables

Any operation that modifies an object in-place will be observable via all references.

- Arrays: `push`, `pop`, `sort`, `reverse`, `splice`, direct index assignment
- Objects: property assignment/deletion, nested mutation
- Maps/Sets: `set`, `delete`, `clear`, `add`

```js
const arr1 = [3, 1, 2];
const arr2 = arr1;
arr2.sort(); // in-place
console.log(arr1); // [1, 2, 3]
```

### 3) The biggest tell: `===` compares references for objects

Primitives: `===` compares actual value.
Objects: `===` compares whether both variables hold the *same reference value*.

```js
console.log(1 === 1); // true
console.log({} === {}); // false (different objects)

const a = {};
const b = a;
console.log(a === b); // true (same object)
```

### 4) Watch for “copying” operations

These create new objects (new references), but might still share nested references:

- Shallow copies: `{ ...obj }`, `[...arr]`, `Object.assign({}, obj)`, `arr.slice()`
- Deep copies: `structuredClone(obj)` (best default), or libraries, or custom logic

```js
const state1 = { user: { name: "A" } };
const state2 = { ...state1 }; // shallow copy

state2.user.name = "B"; // mutates nested object shared by both
console.log(state1.user.name); // "B"
```

---

## Common confusing edge cases

### 1) “But strings are objects sometimes?”

Strings are primitives, but the language temporarily “boxes” them so you can access methods:

```js
const s = "abc";
console.log(s.toUpperCase()); // "ABC"
```

That does not mean the string is mutable:

```js
let s = "abc";
s[0] = "z";
console.log(s); // "abc"
```

### 2) Equality surprises: `NaN`, `-0`, and `Object.is`

`NaN` is the only value not equal to itself with `===`.

```js
console.log(NaN === NaN); // false
```

`Object.is` handles a couple of edge cases differently:

```js
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, 0)); // false
console.log(-0 === 0); // true
```

These are “value semantics” edge cases (not references), but they often get mixed into “value vs reference” confusion.

### 3) Arrays and objects are mutable by default

Even if you copy a reference, you can still accidentally mutate shared data:

```js
function addItem(list, item) {
  list.push(item); // mutates caller's array
}

const items = [];
addItem(items, "x");
console.log(items); // ["x"]
```

If you want “value-like” behavior, return a new array instead:

```js
const addItemImmutable = (list, item) => [...list, item];
```

### 4) `sort()` mutates; `toSorted()` does not (modern JS)

This is a real-world source of bugs in React/state management.

```js
const a = [3, 1, 2];
const b = a.sort();   // mutates a
console.log(a, b);    // both [1, 2, 3]
```

Prefer immutable helpers when available:

```js
const a = [3, 1, 2];
const b = a.toSorted(); // new array
console.log(a); // [3, 1, 2]
console.log(b); // [1, 2, 3]
```

Similarly:

- `reverse()` mutates vs `toReversed()`
- `splice()` mutates vs `toSpliced()`

### 5) `Object.freeze` is shallow

`Object.freeze` prevents adding/removing/changing *top-level* properties, but nested objects can still mutate unless they are also frozen.

```js
const obj = Object.freeze({ nested: { x: 1 } });
obj.nested.x = 2; // allowed (nested not frozen)
console.log(obj.nested.x); // 2
```

### 6) “I copied it”… but it’s still shared (shallow copy trap)

```js
const a = [{ id: 1 }, { id: 2 }];
const b = [...a];     // new array, same object elements

b[0].id = 99;
console.log(a[0].id); // 99
```

### 7) `structuredClone` deep-copies, but not everything

Modern runtimes provide `structuredClone` which deep-copies many built-ins safely.

```js
const a = { d: new Date(), set: new Set([1, 2]) };
const b = structuredClone(a);
console.log(a === b); // false
```

But it cannot clone everything (notably, functions):

```js
// structuredClone({ fn: () => {} }) throws a DataCloneError
```

### 8) “Reference” bugs with closures

Closures capture variables (bindings), not “snapshots” of primitive values—so you can get surprising behavior in loops if you accidentally share a single binding.

Modern `let` fixes a classic pitfall:

```js
const fns = [];
for (let i = 0; i < 3; i++) {
  fns.push(() => i);
}
console.log(fns.map(fn => fn())); // [0, 1, 2]
```

But with `var` you get one shared binding:

```js
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}
console.log(fns.map(fn => fn())); // [3, 3, 3]
```

This isn’t “object reference vs primitive value” exactly, but it is “shared binding vs independent bindings,” which feels similar in practice.

---

## Why knowing the difference matters

### 1) Avoid unintended side effects (bugs)

Shared references are a major source of “action at a distance” bugs:

- Sorting an array that other code assumes is unchanged
- Mutating a config object passed into a utility
- Mutating nested state in UI frameworks (React, Vue) and breaking update detection

### 2) Correctness in state management (React, reducers, stores)

Many patterns rely on **immutability** (returning new objects) to detect changes cheaply:

```js
// reducer-style update
function reducer(state, action) {
  switch (action.type) {
    case "rename":
      return { ...state, user: { ...state.user, name: action.name } };
    default:
      return state;
  }
}
```

If you mutate existing objects, “did it change?” checks like `prev === next` become unreliable.

### 3) Performance and memory trade-offs

- Mutating in place can be faster and allocate less, but is riskier.
- Copying (especially deep copying) can be safer, but may allocate more and cost time.

Knowing whether you’re copying a reference or creating a new object helps you choose the right approach deliberately.

### 4) API design

When you write functions, you should decide:

- **Mutating API**: `pushItem(list)` changes the list argument
- **Non-mutating API**: `withItem(list)` returns a new list

Clear conventions reduce bugs.

---

## How this relates to memory (heap, stack) and garbage collection

JavaScript engines are free to implement details differently, but the conceptual model is:

- **Primitives**: stored directly as values (often kept in registers/stack/inline slots)
- **Objects/functions**: allocated on the **heap**
- **References**: small values that let the engine find the heap object

### The important practical takeaway

If something is reachable (referenced) from a “root” (like:

- global variables
- currently-running stack frames
- closures that are still reachable
- objects reachable from those)

…then it cannot be garbage-collected.

### Example: when objects can be collected

```js
let obj = { big: new Array(1_000_000).fill(0) };
obj = null; // if no other references exist, it's now eligible for GC
```

If you had another reference, it stays alive:

```js
let obj = { big: new Array(1_000_000).fill(0) };
const keepAlive = obj;
obj = null;
// keepAlive still points to the object, so GC cannot reclaim it
```

### Reference chains keep data alive (accidental memory retention)

If you keep a reference to a big object inside a long-lived structure, you keep the big object alive too:

```js
const cache = new Map();

function remember(user) {
  cache.set(user.id, user); // keeps user reachable
}
```

Sometimes you want that; sometimes it’s a memory leak.

### Weak references (when you *don’t* want to keep it alive)

`WeakMap` and `WeakSet` do not prevent garbage collection of their keys.

```js
const meta = new WeakMap();

function tag(obj) {
  meta.set(obj, { seenAt: Date.now() });
}

// If obj becomes unreachable elsewhere, it can be GC'd, and WeakMap entry disappears.
```

This is a “references” feature that directly impacts memory management behavior.

---

## Does this connect to execution contexts and “how JS works behind the scenes”?

Yes—mostly through **variable bindings**, **closures**, and **reachability**.

### Execution contexts and bindings

When JavaScript executes code, it creates an execution context that includes an environment of bindings (variables). Those bindings hold values:

- primitive values, or
- reference values pointing to heap objects

When a function returns, its stack frame can go away—but if it created a closure that is still reachable, some bindings must remain available.

### Closures keep references alive (and can keep big objects alive)

```js
function makeHandler() {
  const big = new Array(1_000_000).fill(0);
  return () => big.length;
}

const handler = makeHandler();
// big remains reachable through handler's closure, so it can't be GC'd yet.
```

This is often correct (you need the data), but it’s also a common way to accidentally retain memory.

### “Pass-by-value” fits execution contexts nicely

When you call a function, the parameter binding in the callee’s context gets a value copied from the caller:

- if it’s a primitive, you copied the primitive
- if it’s an object reference, you copied the reference value

Either way, the call semantics are consistent: **pass-by-value**.

---

## Strict mode (`"use strict"`) and why it matters

Strict mode is a language “dialect” that makes JavaScript **more predictable** by turning some silent failures into errors, disallowing some legacy/ambiguous syntax, and changing a few runtime semantics.

### How you enable it (modern perspective)

- **ES modules are strict by default**. If a file has `import` / `export`, you’re in strict mode automatically.
- **Classic scripts** (no module syntax) can opt in with `"use strict";` at the top of a file or function.

```js
// file-level strict mode (classic script)
"use strict";
```

### Example 1: accidental globals (silent bug vs error)

Non-strict mode can create implicit globals by assigning to an undeclared identifier. Strict mode forbids it.

```js
function f() {
  leaked = 123; // no let/const/var
  return leaked;
}

console.log(f());
```

- **Non-strict**: logs `123` and creates a global `leaked` (easy to miss, hard to debug)
- **Strict**: throws `ReferenceError: leaked is not defined`

### Example 2: `this` inside functions (global object vs `undefined`)

In classic non-strict code, calling a plain function sets `this` to the global object (browser: `window`). In strict mode, `this` stays `undefined`.

```js
function whoIsThis() {
  return this;
}

console.log(whoIsThis());
```

- **Non-strict (script)**: returns the global object
- **Strict**: returns `undefined`

This difference matters for correctness and security: code that accidentally relies on global `this` often behaves differently across environments (browser vs Node) and is a common source of subtle bugs.

### Example 3: writing to read-only properties (silent no-op vs error)

In non-strict mode, certain invalid assignments fail silently. Strict mode makes them throw.

```js
const obj = {};
Object.defineProperty(obj, "x", { value: 1, writable: false });

obj.x = 2;
console.log(obj.x);
```

- **Non-strict**: logs `1` (assignment is ignored)
- **Strict**: throws `TypeError` on the invalid assignment

### Example 4: duplicate parameter names (allowed vs syntax error)

```js
function sum(a, a) {
  return a + a;
}
```

- **Non-strict**: allowed (but confusing and error-prone)
- **Strict**: `SyntaxError` (disallowed)

### Example 5: `with` is forbidden (scope ambiguity)

```js
with ({ x: 1 }) {
  console.log(x);
}
```

- **Non-strict**: allowed (but makes scope resolution unpredictable and slow)
- **Strict**: `SyntaxError`

### Example 6: deleting variables/functions (no-op vs error)

```js
var x = 1;
delete x;
console.log(x);
```

- **Non-strict**: `delete x` is `false` (fails silently), logs `1`
- **Strict**: `SyntaxError`

### Example 7: octal literals (legacy) are restricted

```js
console.log(010); // legacy octal literal in sloppy mode
```

- **Non-strict**: may parse as octal (often `8`) depending on context
- **Strict**: `SyntaxError`

Prefer explicit modern forms:

```js
console.log(0o10); // 8
```

### Why strict mode connects to “values vs references”

Strict mode doesn’t change “primitives vs object references”, but it *does* reduce reference-related footguns by:

- preventing accidental global references (implicit globals)
- making `this` binding less surprising (so you don’t accidentally mutate globals)
- surfacing mutation errors that would otherwise fail silently (read-only properties)

---

## Practical rules of thumb (quick checklist)

- **Primitives**: “value” semantics, copied on assignment, immutable.
- **Objects/functions**: variables store a *reference value*; assignment copies that reference; mutation is shared.
- **Function args**: always passed by value; object references are values too.
- **`===`**: compares values for primitives, compares identity (same reference) for objects.
- **Copy consciously**:
  - Shallow copy is easy and common, but nested objects remain shared.
  - Deep copy: prefer `structuredClone` when it applies.
- **GC**: an object is collectible when nothing reachable references it.
- **Closures**: can keep objects alive by holding references in preserved bindings.

---

## A few “modern code” patterns to reduce reference-related bugs

### Prefer non-mutating array methods in state-like code

```js
const next = prev.toSorted((a, b) => a.rank - b.rank);
```

### Use “update helpers” that return new objects

```js
const setTheme = (settings, theme) => ({ ...settings, theme });
```

### Freeze only if you understand it’s shallow

Use `Object.freeze` for guarding invariants at the boundary of your app, but don’t mistake it for deep immutability.

### Use `WeakMap` for metadata without retention

```js
const meta = new WeakMap();
meta.set(domNode, { measuredAt: performance.now() });
```

---

## Summary

- JavaScript has **primitive values** and **object values**.
- Variables always hold **values**; object values are **references to heap objects**.
- Assigning/calling copies the value; with objects you copy the *reference value*.
- The difference matters because it controls **who observes changes**, how you **reason about side effects**, how you **design APIs**, and how you avoid **accidental memory retention** via long-lived references and closures.

