What does the double bang (`!!value`) do, and when should you use it in a modern web app?
?

## What it does

`!!value` converts any value into a real boolean (`true` or `false`) using JavaScript truthiness.

It’s just two negations:

- `!value` turns truthy → `false`, falsy → `true`
- `!!value` flips again, so you get “is it truthy?” as a boolean

```javascript
!!'hello';   // true
!!0;         // false
!!{};        // true
!!null;      // false
!![];        // true (empty arrays are truthy)
```

## Why it’s useful in modern apps

Many UI props, state fields, and derived values want an actual boolean (not a string/object/number).

### Normalize values for UI state

```javascript
const isOpen = !!query.open;    // '1' -> true, undefined -> false
const isAuthed = !!user;        // object -> true, null -> false
const hasName = !!form.name;    // '' -> false, 'Ada' -> true
```

### Guarantee a boolean from a helper/predicate

```javascript
const hasToken = (token) => !!token;
```

### Common React pattern: conditional rendering

```javascript
// Normalize first, then use it
const showBanner = !!user && !user.isPro;
// ...
// {showBanner && <UpgradeBanner />}
```

## When NOT to use it (common gotchas)

`!!` answers “truthy?” — which is not always what you mean.

```javascript
!!0;   // false (but 0 might be a valid value)
!!'';  // false (but empty string might be allowed)
```

If you mean “is present (not null/undefined)”, do this instead:

```javascript
value != null; // true for everything except null/undefined
```

If you mean “non-empty string”:

```javascript
typeof value === 'string' && value.trim().length > 0;
```

