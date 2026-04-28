Rest & spread (`...`) quick reference (arrays + objects)
?

## Mental model

- **Rest** collects: “put the remaining things into a new array/object”.
- **Spread** expands: “take this array/object and expand its elements/properties here”.

Same `...`, different meaning based on position:
- **Rest**: on the **left** side of an assignment/destructure, or in **function parameters**.
- **Spread**: on the **right** side in an array/object literal, or in a **function call**.

## Cheat sheet: operations you can do (by type)

| Type | Goal / operation | Prefer | Example | Notes |
|---|---|---|---|---|
| Array | **Add (append)** | spread | `const next = [...arr, item]` | immutable append |
| Array | **Add (prepend)** | spread | `const next = [item, ...arr]` | immutable prepend |
| Array | **Insert (middle)** | spread + `slice` | `const next = [...arr.slice(0,i), item, ...arr.slice(i)]` | keeps order |
| Array | **Remove (by index)** | spread + `slice` | `const next = [...arr.slice(0,i), ...arr.slice(i+1)]` | immutable remove |
| Array | **Update (by index)** | `map` (not spread) | `arr.map((x,idx)=>idx===i?val:x)` | spread can’t “replace” one index by itself |
| Array | **Copy / clone** | spread | `const copy = [...arr]` | shallow copy |
| Array | **Merge / concatenate** | spread | `const merged = [...a, ...b]` | shallow |
| Array | **Pass args to function** | spread | `fn(...arr)` | expands into parameters |
| Array | **Collect extra args** | rest param | `function f(a, ...rest) {}` | rest is always an array |
| Array | **Collect “the rest” in destructuring** | rest | `const [a, ...rest] = arr` | rest must be last |
| Object | **Copy / clone** | spread | `const copy = { ...obj }` | shallow copy |
| Object | **Merge objects** | spread | `const merged = { ...a, ...b }` | later props win |
| Object | **Update / override keys** | spread | `const next = { ...obj, key: value }` | immutable update |
| Object | **Set defaults + allow overrides** | spread | `{ a: 1, ...overrides }` | overrides win when later |
| Object | **Override + keep defaults** | spread | `{ ...defaults, ...input }` | common pattern |
| Object | **Remove keys** | rest destructuring | `const { secret, ...public } = obj` | “omit” by pulling out |
| Object | **Collect remaining props** | rest destructuring | `const { id, ...meta } = obj` | rest must be last |

## Arrays: rest vs spread examples

```javascript
// REST in function parameters: collect extra args
function sum(...numbers) {
  return numbers.reduce((t, n) => t + n, 0);
}

// REST in destructuring: collect remaining items
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// SPREAD in array literals: copy / merge / add
const a = [1, 2];
const b = [3, 4];
const merged = [...a, ...b];      // [1,2,3,4]
const appended = [...a, 99];      // [1,2,99]
const prepended = [0, ...a];      // [0,1,2]

// SPREAD in calls: pass array items as args
function add3(x, y, z) { return x + y + z; }
add3(...[1, 2, 3]);               // 6
```

## Objects: rest vs spread examples

```javascript
// REST in object destructuring: collect remaining properties
const user = { id: 1, name: "Alice", email: "a@x.com", role: "admin" };
const { id, name, ...rest } = user;
// id=1, name="Alice", rest={ email:"a@x.com", role:"admin" }

// “Remove” a property (omit) by extracting it
const { email, ...withoutEmail } = user;

// SPREAD: copy / merge / update (immutable)
const copy = { ...user };
const updated = { ...user, role: "user" };           // overrides role
const merged = { ...{ a: 1 }, ...{ a: 2, b: 3 } };   // { a: 2, b: 3 }

// Defaults + overrides (ordering matters)
const defaults = { role: "user", active: true };
const input = { role: "admin" };
const withDefaults = { ...defaults, ...input };      // role becomes "admin"
```

## Common rules & gotchas (worth memorizing)

- **Rest must be last** in destructuring:
  - ✅ `const { a, ...rest } = obj`
  - ❌ `const { ...rest, a } = obj`
  - ✅ `const [a, ...rest] = arr`
  - ❌ `const [...rest, last] = arr`
- **Spread/rest are shallow** (nested objects/arrays are still shared references).
- **Object spread overwrites left-to-right**: `{ ...a, ...b }` → `b` wins on key conflicts.
- **Rest destructuring skips non-enumerable props** (it only collects enumerable own properties, like normal spread).

