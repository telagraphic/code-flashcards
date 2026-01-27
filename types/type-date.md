What is the Date type in JavaScript and how is it used?
?

```javascript
// Date: Represents date and time
// Object type, not primitive

// Date creation
const now = new Date(); // Current date/time
const specific = new Date(2024, 0, 15); // January 15, 2024
const fromString = new Date('2024-01-15');
const fromTimestamp = new Date(1705276800000); // Milliseconds since epoch

// Date methods
const date = new Date();
console.log(date.getFullYear()); // 2024
console.log(date.getMonth()); // 0-11 (0 = January)
console.log(date.getDate()); // Day of month
console.log(date.getDay()); // Day of week (0 = Sunday)
console.log(date.getHours()); // Hours
console.log(date.getMinutes()); // Minutes
console.log(date.getSeconds()); // Seconds
console.log(date.getTime()); // Timestamp in milliseconds

// Practical: Date formatting
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

formatDate(new Date()); // 'January 15, 2024'

// Practical: Relative time
function getRelativeTime(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

// Practical: Date comparison
function isAfter(date1, date2) {
  return date1.getTime() > date2.getTime();
}

function daysBetween(date1, date2) {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Practical: Form date input
function handleDateInput(input) {
  const date = new Date(input.value);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return date;
}

// Practical: Timestamp conversion
function toTimestamp(date) {
  return date.getTime();
}

function fromTimestamp(timestamp) {
  return new Date(timestamp);
}

// Practical: Date validation
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

// Date arithmetic
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);
```
