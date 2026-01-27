How do you use a Map for route-based feature flags with dependency management?
?

```javascript
// Map for route-based feature flags with dependencies and conditions
class FeatureFlagManager {
  constructor() {
    this.flags = new Map(); // Map<flagName, config>
    this.routeFlags = new Map(); // Map<route, Set<flags>>
    this.dependencies = new Map(); // Map<flag, Set<dependencies>>
    this.currentRoute = window.location.pathname;
  }
  
  // Register feature flag
  registerFlag(name, config) {
    this.flags.set(name, {
      enabled: config.enabled ?? false,
      routes: config.routes ?? [],
      dependencies: config.dependencies ?? [],
      condition: config.condition ?? (() => true)
    });
    
    // Build route-to-flags mapping
    config.routes.forEach(route => {
      if (!this.routeFlags.has(route)) {
        this.routeFlags.set(route, new Set());
      }
      this.routeFlags.get(route).add(name);
    });
    
    // Build dependency graph
    if (config.dependencies.length > 0) {
      this.dependencies.set(name, new Set(config.dependencies));
    }
  }
  
  // Check if flag is enabled for current route
  isEnabled(flagName) {
    const flag = this.flags.get(flagName);
    if (!flag) return false;
    
    // Check if flag applies to current route
    const routeFlags = this.routeFlags.get(this.currentRoute);
    if (!routeFlags || !routeFlags.has(flagName)) {
      return false;
    }
    
    // Check dependencies
    if (this.dependencies.has(flagName)) {
      const deps = this.dependencies.get(flagName);
      for (const dep of deps) {
        if (!this.isEnabled(dep)) {
          return false; // Dependency not met
        }
      }
    }
    
    // Check custom condition
    if (!flag.condition()) {
      return false;
    }
    
    return flag.enabled;
  }
  
  // Update route and check flags
  setRoute(route) {
    this.currentRoute = route;
    this.updateUI();
  }
  
  updateUI() {
    // Show/hide features based on flags
    for (const [flagName, flag] of this.flags) {
      const element = document.querySelector(`[data-feature="${flagName}"]`);
      if (element) {
        element.style.display = this.isEnabled(flagName) ? 'block' : 'none';
      }
    }
  }
}

// Usage: Route-based feature flags
const featureManager = new FeatureFlagManager();

// Register flags with routes and dependencies
featureManager.registerFlag('newDashboard', {
  enabled: true,
  routes: ['/dashboard', '/dashboard/*'],
  condition: () => localStorage.getItem('beta') === 'true'
});

featureManager.registerFlag('advancedCharts', {
  enabled: true,
  routes: ['/dashboard/analytics'],
  dependencies: ['newDashboard'] // Requires newDashboard to be enabled
});

featureManager.registerFlag('darkMode', {
  enabled: true,
  routes: ['*'], // All routes
  condition: () => window.matchMedia('(prefers-color-scheme: dark)').matches
});

// Check flags
if (featureManager.isEnabled('advancedCharts')) {
  loadAdvancedCharts();
}

// Update on route change
window.addEventListener('popstate', () => {
  featureManager.setRoute(window.location.pathname);
});

// React to flag changes
const observer = new MutationObserver(() => {
  featureManager.updateUI();
});
observer.observe(document.body, { childList: true, subtree: true });
```
