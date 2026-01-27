How do you use size for validation and monitoring in web apps?
?

```javascript
// size useful for validation and monitoring
const formFields = new Map();

// Track filled fields
function updateField(name, value) {
  if (value && value.trim() !== '') {
    formFields.set(name, value);
  } else {
    formFields.delete(name);
  }
  
  // Check completion
  const totalFields = 5;
  const filledFields = formFields.size;
  const progress = (filledFields / totalFields) * 100;
  
  updateProgressBar(progress);
  
  // Enable submit button when all fields filled
  if (formFields.size === totalFields) {
    document.getElementById('submitBtn').disabled = false;
  }
}

// Practical: Monitor active connections
class ConnectionManager {
  constructor() {
    this.connections = new Map();
  }
  
  addConnection(id, connection) {
    this.connections.set(id, connection);
    this.updateConnectionCount();
  }
  
  removeConnection(id) {
    this.connections.delete(id);
    this.updateConnectionCount();
  }
  
  updateConnectionCount() {
    const count = this.connections.size;
    document.getElementById('connectionCount').textContent = count;
    
    if (count === 0) {
      showNoConnectionsMessage();
    }
  }
}
```
