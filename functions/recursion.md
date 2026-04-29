## Recursion: a practical guide (JavaScript)

Recursion is when a function **solves a problem by calling itself** (directly or indirectly), typically by:

- **defining a base case** (when to stop), and
- **making progress** toward that base case with each call.

In practice, recursion is most useful when your data is **naturally nested** (trees, graphs, JSON) or when a problem is easiest to define as “the same problem, but smaller”.

---

## The mental model

Every recursive function needs:

- **Base case**: “If we’re done, return the answer.”
- **Recursive case**: “Do one small step, then ask the same function to solve the rest.”

### Example: sum an array

```js
function sum(nums, i = 0) {
  if (i === nums.length) return 0; // base case
  return nums[i] + sum(nums, i + 1); // recursive case (progress: i+1)
}

console.log(sum([1, 2, 3])); // 6
```

---

## When recursion is a great fit

### 1) Trees (DOM, component trees, ASTs)

Trees are the “home turf” of recursion: each node has children, and each child is a smaller tree.

```js
function countTextNodes(node) {
  let count = 0;

  if (node.nodeType === Node.TEXT_NODE) count++;

  for (const child of node.childNodes) {
    count += countTextNodes(child);
  }

  return count;
}
```

### 2) Nested JSON (menus, comments, org charts)

Common in modern web apps: nested navigation, threaded comments, category trees.

```js
function flattenIds(items) {
  const ids = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children?.length) {
      ids.push(...flattenIds(item.children));
    }
  }
  return ids;
}
```

### 3) Backtracking / search (interview-style)

Examples: permutations, combinations, Sudoku, maze solving, “choose or skip” problems.

### 4) Divide-and-conquer (merge sort, quick sort, binary search on trees)

Split the problem, solve subproblems, combine results.

---

## Recursion in modern web apps (practical applications)

Recursion isn’t just “math problems”. It shows up naturally in UI + data:

- **UI rendering of nested structures**: tree views, nested lists, threaded comments.
- **DOM traversal**: walk descendants, find matches, compute properties.
- **Config expansion**: nested feature flags, permission rules, route trees.

### requestAnimationFrame: recursion-like scheduling

`requestAnimationFrame` is not recursion on the call stack, but it often looks *recursion-shaped*: a function schedules itself again for the next frame until a stop condition is reached.

```js
function animate(durationMs, onFrame) {
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / durationMs, 1);
    onFrame(t);

    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

animate(500, (t) => {
  // t goes from 0 -> 1 over 500ms
  // update styles, draw to canvas, etc.
});
```

Why this matters:

- This “self-scheduling loop” **does not grow the call stack** (each frame is a new event-loop turn).
- It’s a safe pattern for long-running UI work compared to deep synchronous recursion.

### Other self-scheduling patterns

These are similar in spirit: do work, then schedule the “rest” later.

```js
// setTimeout loop (often used for polling)
function poll(getData, intervalMs) {
  let stopped = false;

  async function tick() {
    if (stopped) return;
    await getData();
    setTimeout(tick, intervalMs);
  }

  tick();
  return () => {
    stopped = true;
  };
}
```

---

## Recursion vs iteration (pros/cons)

### Recursion: advantages

- **Matches nested data**: trees and recursion “fit” conceptually.
- **Can be clearer**: base case + recursive case can read like the problem statement.
- **Natural for backtracking**: the call stack is a convenient “path” structure.

### Recursion: disadvantages

- **Call stack limits**: deep recursion can throw (e.g. `RangeError: Maximum call stack size exceeded`).
- **Overhead**: function calls add overhead compared to tight loops.
- **Harder debugging**: stepping through recursion can be mentally expensive without good base cases and invariants.

### Iteration: advantages

- **No stack overflow**: loops handle very large inputs safely.
- **Often faster**: fewer function calls, better JIT optimizations in many cases.
- **Explicit control**: easier to add logging, counters, early exits (though recursion can do these too).

### Iteration: disadvantages

- **Manual stack/queue**: tree/graph problems often require building your own stack, which can reduce clarity.
- **More bookkeeping**: you may manage indices + state that recursion “bundles” naturally.

---

## Limitations and common pitfalls

### 1) Stack overflow

JavaScript engines have finite call stacks. A few thousand nested calls can be enough to crash depending on environment and function shape.

If recursion depth can be large (big arrays, linked lists, deep trees), prefer:

- iteration,
- recursion with **trampolining** (below),
- or asynchronous scheduling (`requestAnimationFrame`, `setTimeout`) if appropriate.

### 2) Missing or incorrect base case

Most recursion bugs are:

- base case never triggers, or
- progress toward base case isn’t guaranteed.

Rule of thumb: you should be able to point to one line and say:

> “This makes the problem strictly smaller.”

### 3) Repeated work (e.g., naive Fibonacci)

Naive recursion can explode in time complexity if it recomputes the same subproblems.
Fix it with:

- memoization,
- dynamic programming,
- or iteration.

---

## Tail calls, tail recursion, and how to “implement” it in JS

### Tail recursion (definition)

A function is **tail-recursive** when the recursive call is the **final action** (nothing left to do after it returns).

```js
// Tail-recursive (the recursive call is returned directly)
function sumTail(nums, i = 0, acc = 0) {
  if (i === nums.length) return acc;
  return sumTail(nums, i + 1, acc + nums[i]);
}
```

### Tail-call optimization (TCO): reality check

Even if your function is tail-recursive, **most modern JS runtimes do not reliably optimize tail calls** in general-purpose code, so tail recursion can still overflow the stack.

So instead of “relying on TCO”, you typically:

- rewrite to iteration, or
- use a trampoline (turn recursion into a loop explicitly).

### Trampoline (safe tail-recursion without growing the stack)

The idea: have your recursive function return a **thunk** (a function) that represents “the next step”, and run those steps in a loop.

```js
function trampoline(thunk) {
  let step = thunk;
  while (typeof step === "function") step = step();
  return step;
}

function sumTramp(nums, i = 0, acc = 0) {
  if (i === nums.length) return acc;
  return () => sumTramp(nums, i + 1, acc + nums[i]);
}

console.log(trampoline(() => sumTramp([1, 2, 3, 4]))); // 10
```

This is a practical way to “get” tail-call-like behavior in JS when depth could be large.

---

## Quick pick: recursion, iteration, or scheduling?

- **Nested structures (tree/JSON) and depth is modest**: recursion is often clearest.
- **Potentially huge depth / large lists**: prefer iteration or a trampoline.
- **UI updates over time** (animations, progressive rendering): prefer `requestAnimationFrame` or time-slicing patterns.

