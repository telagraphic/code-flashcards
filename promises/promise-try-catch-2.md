How do you use try/catch with multiple await operations?
?

```javascript
// try/catch handles errors from multiple sequential await calls
async function processUserOrder(userId, orderId) {
  try {
    // Step 1: Get user
    const userResponse = await fetch(`/api/users/${userId}`);
    if (!userResponse.ok) throw new Error('User not found');
    const user = await userResponse.json();
    
    // Step 2: Get order
    const orderResponse = await fetch(`/api/orders/${orderId}`);
    if (!orderResponse.ok) throw new Error('Order not found');
    const order = await orderResponse.json();
    
    // Step 3: Validate
    if (order.userId !== user.id) {
      throw new Error('Order does not belong to user');
    }
    
    // Step 4: Process payment
    const paymentResponse = await fetch('/api/payments', {
      method: 'POST',
      body: JSON.stringify({ orderId, amount: order.total })
    });
    const payment = await paymentResponse.json();
    
    return { user, order, payment };
  } catch (error) {
    // Single catch handles errors from any step
    console.error('Order processing failed:', error);
    rollbackOrder(orderId);
    throw error;
  }
}

// One try/catch covers all async operations
// Cleaner than multiple .catch() handlers
```
