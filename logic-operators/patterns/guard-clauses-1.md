How do you use `&&` / `||` / `??` for guard clauses and early returns?
?

## Guard clause with a clear boolean condition

```javascript
function parseUser(input) {
  if (input == null) return null; // catches null and undefined intentionally
  if (typeof input !== 'object') return null;
  if (!('id' in input)) return null;
  return { id: input.id };
}
```

## Guard “expression” patterns (short-circuit)

These are common, but use them when they stay readable.

```javascript
// Run only if handler exists
onClose && onClose();

// Throw if required value is missing
function requireNonNull(value, message = 'Missing value') {
  return value ?? (() => { throw new Error(message); })();
}
```

## Prefer `??` for “missing” data

```javascript
function getLimit(input) {
  // keep 0 if it’s allowed
  const limit = input.limit ?? 50;
  if (limit < 0) throw new Error('limit must be >= 0');
  return limit;
}
```

