When should you use `??` instead of `||`?
?

## The difference

- **`a ?? b`** defaults only when `a` is `null` or `undefined`
- **`a || b`** defaults when `a` is any falsy value (`0`, `false`, `''`, `NaN`, `null`, `undefined`)

## Micro-examples

```javascript
0 ?? 123;        // 0
0 || 123;        // 123

'' ?? 'x';       // ''
'' || 'x';       // 'x'

null ?? 'x';     // 'x'
undefined ?? 'x' // 'x'
```

## Practical: UI defaults vs config defaults

```javascript
// UI label: treat '' as “missing”
const title = input.title || 'Untitled';

// Config: keep 0/false as legitimate settings
const retries = input.retries ?? 3;
const verbose = input.verbose ?? false;
```

## Syntax gotcha

JavaScript requires parentheses when mixing `??` with `||` or `&&`.

```javascript
// ✅ ok
const value = (a ?? b) || c;

// ❌ SyntaxError
// const value2 = a ?? b || c;
```

