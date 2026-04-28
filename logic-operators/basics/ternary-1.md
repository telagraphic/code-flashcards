How does the ternary operator (`condition ? a : b`) compare to `&&` / `||`?
?

## What it is

The ternary operator selects between **two expressions**.

```javascript
const label = isAdmin ? 'Admin' : 'User';
```

## When ternary is clearer

Use ternary when you have a real “if/else” choice (not just defaulting).

```javascript
const status =
  score >= 90 ? 'A' :
  score >= 80 ? 'B' :
  score >= 70 ? 'C' :
  'F';
```

## When `&&` / `||` are clearer

```javascript
// Conditional rendering (show something only if truthy)
const maybeTag = isNew && '<span>New</span>';

// Defaulting (but careful with falsy-valid values)
const title = input.title || 'Untitled';
```

## Common gotcha: ternary uses truthiness

```javascript
const n = 0;
const a = n ? 'yes' : 'no'; // 'no'
```

If you mean “missing”, compare explicitly or use `??`:

```javascript
const b = (n ?? 1) === 0 ? 'zero' : 'nonzero';
```

