What are `||=`, `&&=`, and `??=` and when should you use them?
?

## They are “logical assignment” operators

- **`a ||= b`**: assign `b` to `a` if `a` is falsy
- **`a &&= b`**: assign `b` to `a` if `a` is truthy
- **`a ??= b`**: assign `b` to `a` if `a` is nullish (`null`/`undefined`)

## Examples

```javascript
const settings = { retries: 0, label: '' };

settings.retries ||= 3; // becomes 3 (0 is falsy) -> often NOT what you want
settings.label ||= 'Untitled'; // becomes 'Untitled' -> maybe desired for UI

const config = { retries: 0 };
config.retries ??= 3;   // stays 0 (0 is valid)

let token = 'abc';
token &&= token.toUpperCase(); // 'ABC'
```

## Common rule of thumb

- Use **`??=`** for configuration defaults (don’t clobber `0`/`false`/`''`).
- Use **`||=`** for “must be truthy” defaults (common in UI labels).
- Use **`&&=`** to conditionally transform something that may be missing.

