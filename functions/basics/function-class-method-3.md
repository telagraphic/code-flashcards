How do you create a class with static methods and instance methods?
?

```javascript
// Class with static and instance methods
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  // Instance method
  async fetch(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    return response.json();
  }
  
  // Instance method
  async post(endpoint, data) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
  
  // Static method - called on class, not instance
  static create(baseURL) {
    return new ApiClient(baseURL);
  }
  
  // Static utility method
  static formatError(error) {
    return {
      message: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Usage
const api = ApiClient.create('https://api.example.com');
api.fetch('/users').then(users => console.log(users));

// Static method called on class
const error = ApiClient.formatError(new Error('Something went wrong'));
```
