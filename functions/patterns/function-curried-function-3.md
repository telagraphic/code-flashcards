How do you create a curried function for filtering and transforming data?
?

```javascript
// Curried function for data transformation
const filterBy = property => value => items => 
  items.filter(item => item[property] === value);

const mapBy = property => items => 
  items.map(item => item[property]);

// Create specific filters
const filterByStatus = filterBy('status');
const filterByActive = filterByStatus('active');
const filterByInactive = filterByStatus('inactive');

const mapToNames = mapBy('name');
const mapToIds = mapBy('id');

// Usage
const users = [
  { id: 1, name: 'Alice', status: 'active' },
  { id: 2, name: 'Bob', status: 'inactive' },
  { id: 3, name: 'Charlie', status: 'active' }
];

const activeUsers = filterByActive(users);
const activeNames = mapToNames(activeUsers);
console.log(activeNames); // ['Alice', 'Charlie']
```
