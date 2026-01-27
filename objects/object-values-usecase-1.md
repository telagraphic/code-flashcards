How do you use Object.values() for aggregation and processing?
?

```javascript
// Object.values() for aggregation

// Practical: Aggregate values
function aggregateValues(obj, aggregator) {
  return Object.values(obj).reduce(aggregator);
}

const prices = { laptop: 999, mouse: 25, keyboard: 75 };
const total = aggregateValues(prices, (sum, price) => sum + price);
console.log(total); // 1099

// Practical: Find max/min values
function getMaxValue(obj) {
  return Math.max(...Object.values(obj));
}

function getMinValue(obj) {
  return Math.min(...Object.values(obj));
}

const scores = { alice: 95, bob: 87, charlie: 92 };
console.log(getMaxValue(scores)); // 95
console.log(getMinValue(scores)); // 87

// Practical: Count value occurrences
function countValueOccurrences(obj) {
  const counts = {};
  for (const value of Object.values(obj)) {
    counts[value] = (counts[value] || 0) + 1;
  }
  return counts;
}

const data = { a: 'red', b: 'blue', c: 'red', d: 'green' };
const counts = countValueOccurrences(data);
// { red: 2, blue: 1, green: 1 }

// Practical: Filter by value condition
function filterByValue(obj, predicate) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => predicate(value))
  );
}

const users = {
  alice: { age: 30, active: true },
  bob: { age: 25, active: false },
  charlie: { age: 35, active: true }
};

const activeUsers = filterByValue(users, user => user.active);
// { alice: { age: 30, active: true }, charlie: { age: 35, active: true } }

// Practical: Transform all values
function mapValues(obj, mapper) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, mapper(value)])
  );
}

const prices = { laptop: 999, mouse: 25 };
const discounted = mapValues(prices, price => price * 0.9);
// { laptop: 899.1, mouse: 22.5 }

// Practical: Check if all values meet condition
function allValues(obj, predicate) {
  return Object.values(obj).every(predicate);
}

function anyValue(obj, predicate) {
  return Object.values(obj).some(predicate);
}

const scores = { alice: 95, bob: 87, charlie: 92 };
console.log(allValues(scores, score => score >= 80)); // true
console.log(anyValue(scores, score => score === 100)); // false
```
