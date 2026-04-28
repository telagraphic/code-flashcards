What counts as truthy vs falsy in JavaScript, and why does it matter for `&&` / `||`?
?

## Falsy values (the full list)

Everything is truthy **except**:

- `false`
- `0`, `-0`, `0n`
- `''` (empty string)
- `null`
- `undefined`
- `NaN`

## Why you care

`&&` and `||` use **truthiness**, and they return one of the operands.

```javascript
// OR returns the first truthy operand, otherwise the last operand.
0 || 10;          // 10
'' || 'Untitled'; // 'Untitled'
'ok' || 'nope';   // 'ok'

// AND returns the first falsy operand, otherwise the last operand.
0 && 10;          // 0
'ok' && 10;       // 10
true && 'x';      // 'x'
```

## Common “surprise”

```javascript
// Objects/arrays are truthy even when “empty”
({}) ? 'yes' : 'no'; // 'yes'
([]) ? 'yes' : 'no'; // 'yes'

// Empty string is falsy
('') ? 'yes' : 'no'; // 'no'
```

## When falsy is a VALID value

If `0`, `false`, or `''` are valid values, `||` may replace them unexpectedly.

```javascript
const page = 0;
const a = page || 1; // 1  (maybe wrong)
const b = page ?? 1; // 0  (often correct)
```

