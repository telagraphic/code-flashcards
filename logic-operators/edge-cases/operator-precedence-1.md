What are the most important precedence rules for logical/comparison operators?
?

## The “few you must know”

From higher to lower (simplified):

1. **Unary**: `!x`
2. **Relational**: `< <= > >= in instanceof`
3. **Equality**: `=== !== == !=`
4. **Logical AND**: `&&`
5. **Logical OR**: `||`
6. **Nullish coalescing**: `??` (special: can’t mix with `&&`/`||` without parentheses)
7. **Ternary**: `cond ? a : b`

## Examples

```javascript
// `!` binds tighter than `===`
!true === false; // true  (same as (!true) === false)

// `&&` binds tighter than `||`
true || false && false; // true  (same as true || (false && false))

// Comparisons happen before equality
3 > 2 === true; // true  (same as (3 > 2) === true)
```

## `??` mixing rule (common SyntaxError)

```javascript
// ✅ ok
const v1 = (a ?? b) && c;
const v2 = a ?? (b || c);

// ❌ SyntaxError
// const v3 = a ?? b && c;
// const v4 = a ?? b || c;
```

