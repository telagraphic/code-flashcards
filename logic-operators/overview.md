What are JavaScript logical + comparison operators, and how do you think about them?
?

## Two big ideas

- **Many operators return a value (not a boolean)**: `&&`, `||`, `??` return one of their operands.
- **Comparisons can be strict or coercing**: prefer `===` / `!==` over `==` / `!=` unless you *intentionally* want coercion.

## Operators you’ll use constantly

### Logical (short-circuiting)

- **`a && b`**: if `a` is truthy, returns `b`, else returns `a`
- **`a || b`**: if `a` is truthy, returns `a`, else returns `b`
- **`a ?? b`**: if `a` is `null` or `undefined`, returns `b`, else returns `a`
- **`!a`**: boolean negation (always returns a boolean)

### Comparison / equality

- **`===` / `!==`**: strict equality (no type coercion)
- **`==` / `!=`**: loose equality (type coercion)
- **`< <= > >=`**: relational comparisons (numbers, strings, and coercion rules)
- **`Object.is(a, b)`**: like `===` but distinguishes `-0` and `0`, and treats `NaN` as equal to itself

### Other “comparison-ish”

- **`in`**: property existence (`'x' in obj`)
- **`instanceof`**: prototype-chain check (`arr instanceof Array`)

## Quick mental model

### Truthiness decides `&&` and `||`

```javascript
// `&&` and `||` do NOT force boolean results:
const value1 = '' || 'fallback';     // 'fallback'
const value2 = 'ok' && 123;          // 123
const value3 = 0 && 'never';         // 0
```

### “Missing” (nullish) decides `??`

```javascript
0 ?? 42;          // 0   (keeps valid falsy values)
'' ?? 'x';        // ''  (keeps valid falsy values)
null ?? 'x';      // 'x'
undefined ?? 'x'; // 'x'
```

### Prefer strict equality

```javascript
0 === false; // false
0 == false;  // true  (coercion)
```

## Where to go next in this folder

- `basics/`: truthy/falsy, `&&`/`||`/`!`, `??`, ternary, comparisons
- `patterns/`: guard clauses, defaults, predicate composition
- `edge-cases/`: precedence, `==` pitfalls, `NaN` / `-0`

