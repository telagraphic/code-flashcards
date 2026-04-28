How is nullish coalescing (`??`) different from `||`, and when should you use each?
?

## Key difference

- **`a ?? b`** returns `b` only when `a` is **`null` or `undefined`** (missing / nullish).
- **`a || b`** returns `b` when `a` is **any falsy value** (`0`, `false`, `''`, `NaN`, `null`, `undefined`).

Rule of thumb:
- Use **`??`** when `0` / `false` / `''` are **valid values** and should not be replaced.
- Use **`||`** when “empty” values (like `''`) should also fall back to a default.

## Comparison table (common patterns)

| Pattern | Defaults when… | Keeps (does **not** default) | Good for | Common gotcha |
|---|---|---|---|---|
| `a ?? b` | `a` is `null` or `undefined` | `0`, `false`, `''`, `NaN` | API/config defaults where falsy values are meaningful | Must use parentheses when mixing with `||`/`&&` |
| `a || b` | `a` is falsy | truthy values only | UI fallbacks where `''` should become a default | Replaces valid `0`/`false`/`''` unexpectedly |
| `a ? a : b` | `a` is falsy (truthiness) | truthy values only | Custom condition beyond “nullish” | Often accidentally matches `||` semantics |
| `a !== undefined ? a : b` | `a` is `undefined` | `null` (won’t default), plus `0`/`false`/`''` | When `null` is meaningful but `undefined` means “missing” | Verbose; many times you actually want `??` |
| `a != null ? a : b` | `a` is `null` or `undefined` | `0`/`false`/`''` | Older equivalent of `??` | Uses loose equality on purpose (surprises readers) |
| `obj?.x ?? b` | `obj` is nullish **or** `x` is nullish | `0`/`false`/`''` for `x` | Safe nested reads with defaults | Need `?.` at each nullable step (`obj?.a?.b`) |
| `a ??= b` | assigns only if `a` is nullish | `0`/`false`/`''` (won’t overwrite) | Initialize defaults without clobbering valid falsy values | Mutates state (intended side effect) |
| `a ||= b` | assigns when `a` is falsy | truthy values only | Initialize “must be truthy” values | Same pitfall as `||` (overwrites `0`/`false`/`''`) |

## Micro-examples

### When `0` is valid (use `??`)

```javascript
const page = input.page ?? 1;   // keeps 0 if that’s meaningful
const page2 = input.page || 1;  // 0 becomes 1 (often a bug)
```

### When empty string should fall back (use `||`)

```javascript
const label = input.label || 'Untitled';   // '' -> 'Untitled' (desired)
const label2 = input.label ?? 'Untitled';  // '' stays '' (maybe undesired)
```

## Syntax gotcha: mixing `??` with `||` / `&&`

JavaScript requires parentheses when mixing `??` with `||` or `&&`.

```javascript
// ✅ ok
const value = (a ?? b) || c;

// ❌ SyntaxError
// const value = a ?? b || c;
```

