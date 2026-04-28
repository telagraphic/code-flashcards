How do you use logical operators to compose predicates (filters/validators) cleanly?
?

## Compose conditions with `&&` and `||`

```javascript
const users = [
  { id: 1, name: 'Ada', active: true, age: 37 },
  { id: 2, name: 'Bob', active: false, age: 17 },
  { id: 3, name: 'Cal', active: true, age: 16 },
];

const isAdult = (u) => u.age >= 18;
const isActive = (u) => u.active === true;
const nameStartsWithA = (u) => u.name.startsWith('A');

const visible = users.filter((u) => isActive(u) && (isAdult(u) || nameStartsWithA(u)));
```

## Common “readability move”: name sub-conditions

```javascript
function canAccess({ role, paid, trialDaysLeft }) {
  const isAdmin = role === 'admin';
  const hasSubscription = paid === true;
  const inTrial = (trialDaysLeft ?? 0) > 0;

  return isAdmin || hasSubscription || inTrial;
}
```

## Edge warning: `&&` / `||` return values

When you want booleans, make sure the operands are booleans (like comparisons), not arbitrary values.

```javascript
const ok = ('x' && 123); // 123 (truthy, but not boolean)
const okBool = Boolean('x' && 123); // true
```

