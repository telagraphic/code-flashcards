How do you use values() for aggregation and data processing?
?

```javascript
// values() useful for processing all values
const salesData = new Map([
  ['jan', 1000],
  ['feb', 1500],
  ['mar', 1200],
  ['apr', 1800]
]);

// Calculate average
const sales = Array.from(salesData.values());
const average = sales.reduce((sum, val) => sum + val, 0) / sales.length;
console.log(average); // 1375

// Find max value
const maxSale = Math.max(...salesData.values());
console.log(maxSale); // 1800

// Practical: Aggregate user statistics
const userStats = new Map([
  ['user1', { posts: 10, likes: 50, comments: 20 }],
  ['user2', { posts: 5, likes: 30, comments: 15 }],
  ['user3', { posts: 8, likes: 40, comments: 25 }]
]);

const totalPosts = Array.from(userStats.values())
  .reduce((sum, stats) => sum + stats.posts, 0);

const totalLikes = Array.from(userStats.values())
  .reduce((sum, stats) => sum + stats.likes, 0);

console.log(`Total: ${totalPosts} posts, ${totalLikes} likes`);

// Practical: Check if any value meets condition
const hasHighActivity = Array.from(userStats.values())
  .some(stats => stats.posts > 7);
console.log(hasHighActivity); // true
```
