How do you use do...while for guaranteed execution scenarios?
?

```javascript
// do...while for scenarios requiring at least one execution

// Practical: Connection retry with initial attempt
async function connectWithRetry(endpoint, maxRetries = 5) {
  let attempt = 0;
  let connected = false;
  
  do {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        connected = true;
        return await response.json();
      }
    } catch (error) {
      attempt++;
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  } while (!connected && attempt < maxRetries);
  
  throw new Error('Connection failed after retries');
}

// Practical: Form submission with validation
async function submitFormWithRetry(formData) {
  let attempts = 0;
  let success = false;
  const maxAttempts = 3;
  
  do {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        success = true;
        return await response.json();
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  } while (!success && attempts < maxAttempts);
  
  throw new Error('Submission failed');
}

// Practical: Initialize component with fallback
async function initializeComponent() {
  let config = null;
  let source = 'primary';
  
  do {
    try {
      if (source === 'primary') {
        config = await fetch('/api/config').then(r => r.json());
      } else {
        config = await fetch('/api/config/fallback').then(r => r.json());
      }
    } catch (error) {
      source = 'fallback';
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } while (!config);
  
  return config;
}

// Practical: Poll until ready (guaranteed first check)
async function pollUntilReady(endpoint) {
  let ready = false;
  let attempts = 0;
  
  do {
    const response = await fetch(endpoint);
    const data = await response.json();
    ready = data.status === 'ready';
    
    if (!ready) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } while (!ready && attempts < 10);
  
  return ready;
}
```
