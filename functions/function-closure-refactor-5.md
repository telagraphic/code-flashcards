How do you refactor timer/interval spaghetti into closure-based management?
?

```javascript
// ❌ BEFORE: Timers scattered with global IDs

var countdownInterval = null;
var countdownSeconds = 0;
var autoSaveInterval = null;
var idleTimeout = null;

function startCountdown(seconds) {
  countdownSeconds = seconds;
  if (countdownInterval) clearInterval(countdownInterval);
  
  countdownInterval = setInterval(function() {
    countdownSeconds--;
    document.getElementById('countdown').textContent = countdownSeconds;
    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      alert('Time up!');
    }
  }, 1000);
}

function startAutoSave() {
  if (autoSaveInterval) clearInterval(autoSaveInterval);
  autoSaveInterval = setInterval(function() {
    // save logic
  }, 30000);
}

function resetIdleTimer() {
  if (idleTimeout) clearTimeout(idleTimeout);
  idleTimeout = setTimeout(function() {
    alert('Session expired');
  }, 300000);
}

// On page unload... hope we remember to clear everything
window.onbeforeunload = function() {
  clearInterval(countdownInterval);
  clearInterval(autoSaveInterval);
  clearTimeout(idleTimeout);
};

// Problems:
// - Global timer IDs
// - Easy to forget cleanup
// - Hard to track what's running
// - Can't have multiple countdowns

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure-based timer manager

function createTimer(type = 'interval') {
  // Private state
  let timerId = null;
  let isRunning = false;
  let callback = null;
  let delay = 0;
  
  const clear = () => {
    if (timerId) {
      type === 'interval' ? clearInterval(timerId) : clearTimeout(timerId);
      timerId = null;
    }
    isRunning = false;
  };
  
  const start = (fn, ms) => {
    clear();  // Clear any existing timer
    callback = fn;
    delay = ms;
    isRunning = true;
    
    timerId = type === 'interval'
      ? setInterval(callback, delay)
      : setTimeout(() => {
          callback();
          isRunning = false;
        }, delay);
  };
  
  return {
    start,
    stop: clear,
    restart: () => { if (callback && delay) start(callback, delay); },
    isRunning: () => isRunning
  };
}

// Specialized countdown timer
function createCountdown(displayId, onComplete) {
  const display = document.getElementById(displayId);
  let seconds = 0;
  let timerId = null;
  
  const tick = () => {
    seconds--;
    display.textContent = formatTime(seconds);
    
    if (seconds <= 0) {
      stop();
      if (onComplete) onComplete();
    }
  };
  
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const start = (totalSeconds) => {
    stop();
    seconds = totalSeconds;
    display.textContent = formatTime(seconds);
    timerId = setInterval(tick, 1000);
  };
  
  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };
  
  return {
    start,
    stop,
    pause: stop,
    resume: () => { if (seconds > 0) timerId = setInterval(tick, 1000); },
    getRemaining: () => seconds,
    destroy: stop
  };
}

// Idle timer with reset capability
function createIdleTimer(timeoutMs, onIdle) {
  const timer = createTimer('timeout');
  
  const reset = () => {
    timer.start(onIdle, timeoutMs);
  };
  
  // Track user activity
  const events = ['mousemove', 'keydown', 'click', 'scroll'];
  events.forEach(event => {
    document.addEventListener(event, reset, { passive: true });
  });
  
  reset();  // Start timer
  
  return {
    reset,
    stop: timer.stop,
    destroy: () => {
      timer.stop();
      events.forEach(event => {
        document.removeEventListener(event, reset);
      });
    }
  };
}

// Usage
const countdown = createCountdown('timer-display', () => alert('Time up!'));
countdown.start(300);  // 5 minutes

const idleTimer = createIdleTimer(5 * 60 * 1000, () => {
  alert('Session expired');
  window.location.href = '/login';
});

// Cleanup is easy
countdown.destroy();
idleTimer.destroy();

// Improvements:
// ✓ Each timer encapsulates its own state
// ✓ Multiple instances possible
// ✓ Clean start/stop/restart API
// ✓ Proper cleanup with destroy()
// ✓ No global timer IDs
```
