How do you implement `filter` from scratch (arrays + objects)?
?

`filter` is like `map`, except:

- `map`: “transform every item” → output length is the same (usually)
- `filter`: “keep some items” → output length can shrink

The callback you pass to `filter` is usually called a **predicate** because it returns a truthy/falsey value:

- **truthy** → keep the element
- **falsey** → skip the element

---

## Array `filter` from scratch (utility function)

```js
function filter(array, predicate) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (predicate(value, i, array)) {
      result.push(value);
    }
  }

  return result;
}
```

### What `predicate(value, i, array)` means

On each iteration:

- `value` is the current element (`array[i]`)
- `i` is the index
- `array` is the original array being filtered

The predicate’s **return value** controls whether `value` gets pushed.

---

## Array `filter` from scratch (prototype method)

This matches how built-ins are typically used:

```js
Array.prototype.myFilter = function (predicate) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    const value = this[i];

    if (predicate(value, i, this)) {
      result.push(value);
    }
  }

  return result;
};
```

When you call:

```js
[1, 2, 3].myFilter(...)
```

Inside `myFilter`, `this` is that array.

---

## Iteration walkthrough (array with 3 values)

Example:

```js
const numbers = [1, 2, 3];

const evens = filter(numbers, (value) => value % 2 === 0);
// or: numbers.myFilter((value) => value % 2 === 0);
```

Before the loop:

- `array` (or `this`) → `[1, 2, 3]`
- `result` → `[]`
- `length` → `3`

### Iteration 0 (i = 0)

- `value = array[0]` → `1`
- predicate call → `predicate(1, 0, [1, 2, 3])`
- predicate returns → `1 % 2 === 0` → `false`
- action → **don’t push**
- `result` stays `[]`

### Iteration 1 (i = 1)

- `value = array[1]` → `2`
- predicate call → `predicate(2, 1, [1, 2, 3])`
- predicate returns → `2 % 2 === 0` → `true`
- action → **push `2`**
- `result` becomes `[2]`

### Iteration 2 (i = 2)

- `value = array[2]` → `3`
- predicate call → `predicate(3, 2, [1, 2, 3])`
- predicate returns → `3 % 2 === 0` → `false`
- action → **don’t push**
- `result` stays `[2]`

Loop ends → returns `[2]`.

---

## Object “filter” from scratch (because objects don’t have `.filter()`)

Objects aren’t ordered lists, so there’s no native `obj.filter(...)`.
But you can build a utility that keeps key/value pairs based on a predicate.

### Implementation: `filterObject`

```js
function filterObject(obj, predicate) {
  const result = {};

  for (const key in obj) {
    // Only keep "own" properties (not from the prototype chain)
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];

    if (predicate(value, key, obj)) {
      result[key] = value;
    }
  }

  return result;
}
```

Predicate signature here is:

```js
(value, key, obj) => boolean
```

### Iteration walkthrough (object with 3 properties)

Example:

```js
const scores = { alice: 10, bob: 3, cara: 7 };

const passing = filterObject(scores, (value) => value >= 7);
// expected: { alice: 10, cara: 7 }
```

What happens conceptually (property enumeration order is a separate topic; focus on the keep/skip rule):

**Visit `alice`**

- `key = "alice"`
- `value = 10`
- predicate call → `predicate(10, "alice", scores)`
- predicate returns → `10 >= 7` → `true`
- action → set `result["alice"] = 10`
- result → `{ alice: 10 }`

**Visit `bob`**

- `key = "bob"`
- `value = 3`
- predicate call → `predicate(3, "bob", scores)`
- predicate returns → `3 >= 7` → `false`
- action → skip
- result stays `{ alice: 10 }`

**Visit `cara`**

- `key = "cara"`
- `value = 7`
- predicate call → `predicate(7, "cara", scores)`
- predicate returns → `7 >= 7` → `true`
- action → set `result["cara"] = 7`
- result → `{ alice: 10, cara: 7 }`

Returns `{ alice: 10, cara: 7 }`.

---

## Object filtering alternative: via `Object.entries(...)`

If you like the “array methods” style:

```js
const scores = { alice: 10, bob: 3, cara: 7 };

const passing = Object.fromEntries(
  Object.entries(scores).filter(([key, value]) => value >= 7)
);
```

This works by converting the object into an array of `[key, value]` pairs, filtering that array, then turning it back into an object.

---

## One mental model

For arrays:

- **run predicate**
- if it’s truthy → keep original `value`
- if it’s falsey → drop it

So a filter result is literally “all original values that passed the test”.

