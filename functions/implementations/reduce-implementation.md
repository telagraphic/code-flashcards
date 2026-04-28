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

## Array `reduce` from scratch (utility function)

This version is not “fully spec-complete”, but it includes the most important concept: **optional `initialValue`**.

```js
function reduce(array, reducer, initialValue) {
  let hasInitialValue = arguments.length >= 3;

  // 1) Decide starting accumulator + starting index
  let acc;
  let startIndex;

  if (hasInitialValue) {
    acc = initialValue;
    startIndex = 0;
  } else {
    // Minimal safety: this simplified version assumes a non-empty array
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

### Reducer signature

```js
(accumulator, currentValue, index, array) => newAccumulator
```

Key point: the reducer’s **return value becomes the next `acc`**.

---

## Array `reduce` from scratch (prototype method)

```js
Array.prototype.myReduce = function (reducer, initialValue) {
  const hasInitialValue = arguments.length >= 2;

  let acc;
  let startIndex;

  if (hasInitialValue) {
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

## Iteration walkthrough (array with 3 values)

We’ll use:

```js
const nums = [1, 2, 3];
```

### Example A: reduce WITHOUT `initialValue`

```js
const sum = reduce(nums, (acc, value) => acc + value);
// expected: 6
```

**Starting state**

- no `initialValue` provided
- `acc = array[0] = 1`
- `startIndex = 1`
- loop will visit indices: 1, 2

**Iteration 1 (i = 1)**

- `value = array[1] = 2`
- call reducer: `reducer(acc, value, i, array)` → `reducer(1, 2, 1, [1,2,3])`
- reducer returns: `1 + 2 = 3`
- update `acc` → `3`

**Iteration 2 (i = 2)**

- `value = array[2] = 3`
- call reducer → `reducer(3, 3, 2, [1,2,3])`
- reducer returns: `3 + 3 = 6`
- update `acc` → `6`

Loop ends → returns `acc = 6`.

### Example B: reduce WITH `initialValue`

```js
const sum = reduce(nums, (acc, value) => acc + value, 0);
// expected: 6
```

**Starting state**

- `initialValue = 0`
- `acc = 0`
- `startIndex = 0`
- loop will visit indices: 0, 1, 2

**Iteration 0 (i = 0)**

- `value = 1`
- reducer call → `reducer(0, 1, 0, [1,2,3])`
- returns `1`
- `acc = 1`

**Iteration 1 (i = 1)**

- `value = 2`
- reducer call → `reducer(1, 2, 1, [1,2,3])`
- returns `3`
- `acc = 3`

**Iteration 2 (i = 2)**

- `value = 3`
- reducer call → `reducer(3, 3, 2, [1,2,3])`
- returns `6`
- `acc = 6`

Loop ends → returns `6`.

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

## How to write a reducer function (this file was missing this)

A reducer function must answer one question every time it’s called:

> “Given the current accumulator and the next value, what should the next accumulator be?”

That means **your reducer must return the next accumulator**.

### Reducer “shape” (arrays)

```js
(acc, value, index, array) => nextAcc
```

Only `acc` and `value` are usually required; the other two are optional.

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

