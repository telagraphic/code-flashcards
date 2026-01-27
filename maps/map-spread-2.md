How do you use spread operator for filtering and transforming Maps?
?

```javascript
// Spread useful for filtering and transforming Map entries
const userMap = new Map([
  ['alice', { age: 25, active: true }],
  ['bob', { age: 30, active: false }],
  ['charlie', { age: 28, active: true }]
]);

// Filter active users and convert to array
const activeUsers = [...userMap]
  .filter(([name, data]) => data.active)
  .map(([name, data]) => ({ name, ...data }));

console.log(activeUsers);
// [{ name: 'alice', age: 25, active: true }, ...]

// Practical: Sort Map entries
const sortedEntries = [...userMap]
  .sort(([nameA, dataA], [nameB, dataB]) => 
    dataA.age - dataB.age
  );

const sortedMap = new Map(sortedEntries);

// Practical: Find entries matching condition
const expensiveProducts = [...productMap]
  .filter(([name, price]) => price > 50)
  .map(([name]) => name);

console.log(expensiveProducts); // ['laptop', 'keyboard']

// Practical: Create array of objects from Map
const userArray = [...userMap].map(([name, data]) => ({
  id: name,
  ...data
}));
```
