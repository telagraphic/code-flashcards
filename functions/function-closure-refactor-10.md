How do you refactor toast/notification spaghetti into a closure-based system?
?

```javascript
// ❌ BEFORE: Notifications scattered with global state

var notifications = [];
var notificationContainer = null;

function showNotification(message, type) {
  if (!notificationContainer) {
    notificationContainer = document.getElementById('notifications');
  }
  
  var id = Date.now();
  var div = document.createElement('div');
  div.className = 'notification ' + type;
  div.id = 'notification-' + id;
  div.innerHTML = message + '<button onclick="closeNotification(' + id + ')">×</button>';
  
  notificationContainer.appendChild(div);
  notifications.push({ id: id, element: div });
  
  // Auto close after 5 seconds
  setTimeout(function() {
    closeNotification(id);
  }, 5000);
}

function closeNotification(id) {
  var notification = null;
  for (var i = 0; i < notifications.length; i++) {
    if (notifications[i].id === id) {
      notification = notifications[i];
      notifications.splice(i, 1);
      break;
    }
  }
  
  if (notification && notification.element.parentNode) {
    notification.element.parentNode.removeChild(notification.element);
  }
}

// Usage scattered throughout app
showNotification('Saved!', 'success');
showNotification('Error!', 'error');

// Problems:
// - Global state and functions
// - onclick string in HTML
// - No way to customize duration, position, etc.
// - Can't queue notifications
// - No enter/exit animations

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure-based notification system

function createNotificationManager(options = {}) {
  const {
    containerId = 'notifications',
    position = 'top-right',
    defaultDuration = 5000,
    maxVisible = 5,
    animationDuration = 300
  } = options;
  
  // Private state
  let container = null;
  const queue = [];
  const visible = new Map();  // id -> { element, timeoutId }
  let nextId = 1;
  
  // Ensure container exists
  const getContainer = () => {
    if (!container) {
      container = document.getElementById(containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = `notification-container ${position}`;
        document.body.appendChild(container);
      }
    }
    return container;
  };
  
  // Create notification element
  const createElement = (notification) => {
    const el = document.createElement('div');
    el.className = `notification notification-${notification.type}`;
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <div class="notification-content">
        ${notification.icon ? `<span class="icon">${notification.icon}</span>` : ''}
        <span class="message">${notification.message}</span>
      </div>
      <button class="notification-close" aria-label="Close">×</button>
    `;
    
    // Close button handler
    el.querySelector('.notification-close').addEventListener('click', () => {
      dismiss(notification.id);
    });
    
    // Click to dismiss (optional)
    if (notification.dismissOnClick) {
      el.addEventListener('click', () => dismiss(notification.id));
    }
    
    return el;
  };
  
  // Show notification
  const show = (notification) => {
    const el = createElement(notification);
    const cont = getContainer();
    
    // Add to DOM with enter animation
    el.style.opacity = '0';
    el.style.transform = 'translateX(100%)';
    cont.appendChild(el);
    
    // Trigger animation
    requestAnimationFrame(() => {
      el.style.transition = `all ${animationDuration}ms ease`;
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
    });
    
    // Auto dismiss
    let timeoutId = null;
    if (notification.duration !== 0) {
      timeoutId = setTimeout(() => {
        dismiss(notification.id);
      }, notification.duration);
    }
    
    visible.set(notification.id, { element: el, timeoutId, notification });
    
    // Callback
    if (notification.onShow) notification.onShow();
  };
  
  // Dismiss notification
  const dismiss = (id) => {
    const item = visible.get(id);
    if (!item) return;
    
    const { element, timeoutId, notification } = item;
    
    // Clear auto-dismiss timeout
    if (timeoutId) clearTimeout(timeoutId);
    
    // Exit animation
    element.style.opacity = '0';
    element.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
      element.remove();
      visible.delete(id);
      
      // Callback
      if (notification.onDismiss) notification.onDismiss();
      
      // Show next in queue
      processQueue();
    }, animationDuration);
  };
  
  // Process queue
  const processQueue = () => {
    while (queue.length > 0 && visible.size < maxVisible) {
      const notification = queue.shift();
      show(notification);
    }
  };
  
  // Public API
  const notify = (message, options = {}) => {
    const notification = {
      id: nextId++,
      message,
      type: options.type || 'info',
      duration: options.duration ?? defaultDuration,
      icon: options.icon,
      dismissOnClick: options.dismissOnClick ?? true,
      onShow: options.onShow,
      onDismiss: options.onDismiss
    };
    
    if (visible.size >= maxVisible) {
      queue.push(notification);
    } else {
      show(notification);
    }
    
    return notification.id;
  };
  
  return {
    // Convenience methods
    info: (message, options) => notify(message, { ...options, type: 'info' }),
    success: (message, options) => notify(message, { ...options, type: 'success', icon: '✓' }),
    warning: (message, options) => notify(message, { ...options, type: 'warning', icon: '⚠' }),
    error: (message, options) => notify(message, { ...options, type: 'error', icon: '✕', duration: 0 }),
    
    // Core methods
    notify,
    dismiss,
    dismissAll: () => {
      visible.forEach((_, id) => dismiss(id));
      queue.length = 0;
    },
    
    // Async helper — returns promise that resolves when dismissed
    async: (message, options) => {
      return new Promise(resolve => {
        notify(message, {
          ...options,
          onDismiss: () => resolve()
        });
      });
    }
  };
}

// Create notification manager
const toast = createNotificationManager({
  position: 'top-right',
  defaultDuration: 4000,
  maxVisible: 3
});

// Usage
toast.success('Item saved successfully!');
toast.error('Failed to connect to server');
toast.warning('Your session will expire soon');

// With options
toast.info('New message received', {
  duration: 10000,
  onDismiss: () => console.log('User saw the notification')
});

// Async usage — wait for user to dismiss
await toast.async('Please review the changes', { type: 'warning', duration: 0 });
console.log('User acknowledged');

// Improvements:
// ✓ All state private in closure
// ✓ Queue system for max visible
// ✓ Enter/exit animations
// ✓ Configurable options
// ✓ Convenience methods (success, error, etc.)
// ✓ Async support with promises
// ✓ Callbacks for show/dismiss
// ✓ No global functions or onclick strings
```
