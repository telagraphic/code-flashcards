How do `&&`, `||`, and `!` actually evaluate in JavaScript?
?

## Key idea: they short-circuit and return values

- **`a && b`**: if `a` is truthy, returns `b`; otherwise returns `a`
- **`a || b`**: if `a` is truthy, returns `a`; otherwise returns `b`
- **`!a`**: returns a boolean (`true` or `false`)

## Short-circuiting (skips work)

```javascript
function expensive() {
  throw new Error('should not run');
}

false && expensive(); // false (expensive not called)
true || expensive();  // true  (expensive not called)
```

## Returning non-boolean values (very common)

```javascript
const token = '';
const header = token && `Bearer ${token}`; // '' (NOT a boolean)

const label = '' || 'Untitled';            // 'Untitled'
const maybeUser = null || { id: 1 };       // { id: 1 }
```

## Converting to booleans

```javascript
!!'hello'; // true
!!0;       // false
!!{};      // true
```

## De Morgan’s laws (useful in conditions)

```javascript
// !(A && B) is the same as (!A || !B)
// !(A || B) is the same as (!A && !B)
```

