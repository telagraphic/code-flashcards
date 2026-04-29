How do you implement `reduce` from scratch (enough to understand it)?
?

`reduce` is the “accumulator” method.

- `map`: turns each element into a new element
- `filter`: keeps or discards elements
- `reduce`: **combines** many elements into **one** accumulated result

The callback you pass to `reduce` is usually called a **reducer**.

---

## The core idea in one sentence

`reduce` repeatedly does:

```js
acc = reducer(acc, value, index, array);
```

and returns the final `acc`.

---

## The reducer function (you should see this first)

The callback you pass to `reduce` is called a **reducer**.

### Reducer “shape”

```js
(accumulator, currentValue, index, array) => nextAccumulator
```

Most of the time you only use `(acc, value)`, but the extra args are there if you need them.

### A concrete reducer we’ll use in walkthroughs

```js
const sumReducer = (acc, value) => acc + value;
```

Key point: the reducer’s **return value becomes the next `acc`**.

---

## Implement `reduce(array, reducer, initialValue)` (utility function)

This version is not “fully spec-complete”, but it includes the most important concept: **optional `initialValue`**.

```js
function reduce(array, reducer, initialValue) {
  let hasInitialValue = arguments.length >= 3;

  // 1) Decide starting accumulator + starting index
  let acc;
  let startIndex;

  if (hasInitialValue) {
    // If you pass an `initialValue`, that becomes the very first accumulator.
    // That means the reducer still needs to run for *every* array element:
    //
    //   acc = initialValue
    //   acc = reducer(acc, array[0], 0, array)
    //   acc = reducer(acc, array[1], 1, array)
    //   ...
    //
    // So we start at index 0.
    acc = initialValue;
    startIndex = 0;
  } else {
    // Minimal safety: this simplified version assumes a non-empty array
    // If you *don't* pass an `initialValue`, `reduce` uses the first element
    // as the starting accumulator:
    //
    //   acc = array[0]
    //
    // If we started the loop at index 0 now, we'd double-count the first value
    // by doing `reducer(acc, array[0])` where `acc` is already `array[0]`.
    // So we start at index 1 (the "second" element).
    acc = array[0];
    startIndex = 1;
  }

  // 2) Walk forward, updating the accumulator each time
  for (let i = startIndex; i < array.length; i++) {
    const value = array[i];
    acc = reducer(acc, value, i, array);
  }

  // 3) Return the final accumulated value
  return acc;
}
```

---

## Implement `array.myReduce(reducer, initialValue)` (prototype method)

```js
Array.prototype.myReduce = function (reducer, initialValue) {
  const hasInitialValue = arguments.length >= 2;

  let acc;
  let startIndex;

  if (hasInitialValue) {
    // Same idea as the utility version:
    // - initialValue provided  → acc starts as initialValue, loop from 0
    // - no initialValue        → acc starts as this[0], loop from 1
    acc = initialValue;
    startIndex = 0;
  } else {
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = reducer(acc, this[i], i, this);
  }

  return acc;
};
```

---

## Step-by-step walkthrough: how accumulation happens

We’ll use:

```js
const nums = [1, 2, 3];
const sumReducer = (acc, value) => acc + value;
```

### Mental model (tiny flow)

```mermaid
flowchart TD
  A[Pick starting acc + startIndex] --> B[For each element from startIndex...]
  B --> C[acc = reducer(acc, value, index, array)]
  C --> B
  B --> D[Return final acc]
```

### Case A: WITHOUT `initialValue`

```js
const sum = reduce(nums, sumReducer);
// expected: 6
```

**Bootstrap**

- no `initialValue` provided
- `acc = nums[0] = 1`
- `startIndex = 1` (so we do NOT double-count index 0)

**Table of iterations**

| step | i | value = nums[i] | acc before | reducer call           | acc after |
|------|---|------------------|------------|------------------------|----------|
| 1    | 1 | 2                | 1          | sumReducer(1, 2) = 3   | 3        |
| 2    | 2 | 3                | 3          | sumReducer(3, 3) = 6   | 6        |

Return `6`.

### Case B: WITH `initialValue`

```js
const sum = reduce(nums, sumReducer, 0);
// expected: 6
```

**Bootstrap**

- `initialValue = 0`
- `acc = 0`
- `startIndex = 0` (process every element)

**Table of iterations**

| step | i | value = nums[i] | acc before | reducer call           | acc after |
|------|---|------------------|------------|------------------------|----------|
| 1    | 0 | 1                | 0          | sumReducer(0, 1) = 1   | 1        |
| 2    | 1 | 2                | 1          | sumReducer(1, 2) = 3   | 3        |
| 3    | 2 | 3                | 3          | sumReducer(3, 3) = 6   | 6        |

Return `6`.

---

## Why `initialValue` matters (main takeaway)

Without `initialValue`, `reduce` needs a place to start, so it uses the first element:

- start `acc = array[0]`
- start loop at index 1

With `initialValue`, you control the starting accumulator:

- start `acc = initialValue`
- start loop at index 0

This is why it’s common to use:

- `0` for sums
- `1` for products
- `""` for string concatenation
- `[]` for building arrays
- `{}` for building objects

---

## Common reducer mistakes

A reducer function must answer one question every time it’s called:

> “Given the current accumulator and the next value, what should the next accumulator be?”

That means **your reducer must return the next accumulator**.

### The #1 mistake: forgetting to return

This looks like it “does work”, but it returns `undefined`:

```js
const badSumReducer = (acc, value) => {
  acc + value; // computed then thrown away
};
```

If your reducer returns `undefined`, then after the first iteration:

- `acc` becomes `undefined`
- everything after that typically becomes `NaN` (for numeric math) or just stays `undefined`

Fix it by returning:

```js
const sumReducer = (acc, value) => {
  return acc + value;
};
// or implicit return:
// const sumReducer = (acc, value) => acc + value;
```

---

## Using the utility `reduce(array, reducer, initialValue)`

### Example 1: sum (number accumulator)

```js
const nums = [1, 2, 3];

const sumReducer = (acc, value) => acc + value;
const sum = reduce(nums, sumReducer, 0);
// sum === 6
```

### Example 2: build an array (array accumulator)

This shows the pattern “accumulator is an array, return the array”.

```js
const nums = [1, 2, 3];

const doubleIntoArray = (acc, value) => {
  acc.push(value * 2);
  return acc;
};

const doubled = reduce(nums, doubleIntoArray, []);
// doubled === [2, 4, 6]
```

### Example 3: build an object (object accumulator)

```js
const nums = [1, 2, 3];

const indexByValue = (acc, value, index) => {
  acc[value] = index;
  return acc;
};

const dict = reduce(nums, indexByValue, {});
// dict === { "1": 0, "2": 1, "3": 2 }
```

---

## Using the prototype `array.myReduce(reducer, initialValue)`

Same reducer functions, different call site.

### Example 1: sum

```js
const nums = [1, 2, 3];

const sumReducer = (acc, value) => acc + value;
const sum = nums.myReduce(sumReducer, 0);
// sum === 6
```

### Example 2: build an array

```js
const nums = [1, 2, 3];

const doubleIntoArray = (acc, value) => {
  acc.push(value * 2);
  return acc;
};

const doubled = nums.myReduce(doubleIntoArray, []);
// doubled === [2, 4, 6]
```

### Example 3: build an object

```js
const nums = [1, 2, 3];

const indexByValue = (acc, value, index) => {
  acc[value] = index;
  return acc;
};

const dict = nums.myReduce(indexByValue, {});
// dict === { "1": 0, "2": 1, "3": 2 }
```

---

## Object “reduce” from scratch (because objects don’t have `.reduce()`)

Same accumulator idea, but you iterate over keys.

### Implementation: `reduceObject`

```js
function reduceObject(obj, reducer, initialValue) {
  let acc = initialValue;

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    acc = reducer(acc, value, key, obj);
  }

  return acc;
}
```

Reducer signature for objects:

```js
(accumulator, value, key, obj) => newAccumulator
```

### Iteration walkthrough (object with 3 properties)

Example: build a list of “passing names” into an array accumulator:

```js
const scores = { alice: 10, bob: 3, cara: 7 };

const passingNames = reduceObject(
  scores,
  (acc, value, key) => {
    if (value >= 7) acc.push(key);
    return acc;
  },
  []
);
// expected: ["alice", "cara"]
```

What happens conceptually:

**Start**

- `acc = []`

**Visit `alice`**

- `key = "alice"`, `value = 10`
- reducer call → `reducer([], 10, "alice", scores)`
- value >= 7 → push `"alice"`
- reducer returns the same array reference (now `["alice"]`)
- `acc` now `["alice"]`

**Visit `bob`**

- call reducer → `reducer(["alice"], 3, "bob", scores)`
- 3 >= 7 is false → no push
- return `["alice"]`
- `acc` still `["alice"]`

**Visit `cara`**

- call reducer → `reducer(["alice"], 7, "cara", scores)`
- push `"cara"`
- return `["alice", "cara"]`

Return final `acc` → `["alice", "cara"]`.

---

## One mental model

With `reduce`, you should be able to point at one line and say:

> “This line computes the next accumulator value.”

That line is:

```js
acc = reducer(acc, value, indexOrKey, source);
```

