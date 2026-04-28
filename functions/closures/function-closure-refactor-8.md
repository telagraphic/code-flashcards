How do you refactor tab/accordion spaghetti into a closure component?
?

```javascript
// ❌ BEFORE: Tab state scattered with DOM queries everywhere

var activeTabIndex = 0;
var tabs = [];
var panels = [];

function initTabs() {
  tabs = document.querySelectorAll('.tab');
  panels = document.querySelectorAll('.panel');
  
  for (var i = 0; i < tabs.length; i++) {
    (function(index) {
      tabs[index].addEventListener('click', function() {
        switchTab(index);
      });
    })(i);  // IIFE to capture index (var loop issue)
  }
}

function switchTab(index) {
  // Remove active from all
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
    panels[i].classList.remove('active');
  }
  
  // Add active to selected
  tabs[index].classList.add('active');
  panels[index].classList.add('active');
  activeTabIndex = index;
}

function getActiveTab() {
  return activeTabIndex;
}

// Problems:
// - Global state
// - IIFE needed for loop closure
// - Can only have one tab group on page
// - No events for tab changes

// ────────────────────────────────────────────────────────────

// ✅ AFTER: Closure-based tab component

function createTabs(containerId, options = {}) {
  const container = document.getElementById(containerId);
  const tabsEl = container.querySelectorAll('[data-tab]');
  const panelsEl = container.querySelectorAll('[data-panel]');
  
  const {
    defaultTab = 0,
    onChange,
    allowDeselect = false
  } = options;
  
  // Private state
  let activeIndex = -1;
  const tabs = Array.from(tabsEl);
  const panels = Array.from(panelsEl);
  
  // Private: update UI
  const updateUI = () => {
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === activeIndex);
      tab.setAttribute('aria-selected', i === activeIndex);
    });
    
    panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === activeIndex);
      panel.hidden = i !== activeIndex;
    });
  };
  
  // Private: switch to tab
  const switchTo = (index) => {
    const prevIndex = activeIndex;
    
    if (allowDeselect && index === activeIndex) {
      activeIndex = -1;
    } else if (index >= 0 && index < tabs.length) {
      activeIndex = index;
    }
    
    updateUI();
    
    if (onChange && prevIndex !== activeIndex) {
      onChange({ index: activeIndex, prevIndex, tab: tabs[activeIndex] });
    }
  };
  
  // Event handler with delegation
  const handleClick = (event) => {
    const tab = event.target.closest('[data-tab]');
    if (!tab) return;
    
    const index = tabs.indexOf(tab);
    if (index !== -1) {
      switchTo(index);
    }
  };
  
  // Keyboard navigation
  const handleKeydown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    if (!tabs.includes(document.activeElement)) return;
    
    event.preventDefault();
    let newIndex = activeIndex;
    
    switch (event.key) {
      case 'ArrowRight':
        newIndex = (activeIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
    }
    
    switchTo(newIndex);
    tabs[newIndex]?.focus();
  };
  
  // Initialize
  container.addEventListener('click', handleClick);
  container.addEventListener('keydown', handleKeydown);
  switchTo(defaultTab);
  
  // Public API
  return {
    switchTo,
    next: () => switchTo((activeIndex + 1) % tabs.length),
    prev: () => switchTo((activeIndex - 1 + tabs.length) % tabs.length),
    getActiveIndex: () => activeIndex,
    getActiveTab: () => tabs[activeIndex],
    getActivePanel: () => panels[activeIndex],
    destroy: () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('keydown', handleKeydown);
    }
  };
}

// Usage
const productTabs = createTabs('product-tabs', {
  defaultTab: 0,
  onChange: ({ index, prevIndex }) => {
    console.log(`Switched from tab ${prevIndex} to ${index}`);
    // Track analytics, lazy load content, etc.
  }
});

// Multiple independent tab groups on same page
const settingsTabs = createTabs('settings-tabs', {
  defaultTab: 1
});

// Programmatic control
productTabs.next();
productTabs.switchTo(2);

// Cleanup
productTabs.destroy();

// Improvements:
// ✓ No global state
// ✓ Multiple instances possible
// ✓ Change callback for analytics/lazy loading
// ✓ Keyboard navigation built in
// ✓ Accessibility (aria-selected, hidden)
// ✓ Event delegation (one listener)
// ✓ Proper cleanup
```
