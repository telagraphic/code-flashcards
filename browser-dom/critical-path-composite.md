What happens in the Composite step of the Critical Rendering Path?
?

```javascript
// Composite: Combine painted layers into final screen image
// Final step before displaying pixels to user

// Composite happens for:
// 1. Elements with transform/opacity (promoted to own layer)
element.style.transform = 'translateX(100px)'; // Composite only
element.style.opacity = '0.5'; // Composite only

// 2. Elements with will-change
element.style.willChange = 'transform'; // Promoted to layer

// 3. Elements with z-index in stacking context
element.style.zIndex = '10'; // May create new layer

// 4. Overlapping elements
// Browser creates layers for efficient compositing

// Practical: Use transforms for animations (composite only)
// BAD: Animating position (triggers Layout → Paint → Composite)
function animateBad() {
  element.style.left = position + 'px'; // Layout + Paint + Composite
  position++;
}

// GOOD: Animate transform (Composite only)
function animateGood() {
  element.style.transform = `translateX(${position}px)`; // Composite only
  position++;
}

// Practical: Layer promotion
// Elements are promoted to layers when:
// - transform/opacity changes
// - will-change specified
// - 3D transforms
// - video/canvas elements

element.style.willChange = 'transform'; // Promotes to layer
// Later: element.style.transform = 'translateX(100px)'; // Composite only

// Composite is fastest step
// Optimize animations to use Composite instead of Layout/Paint

// Practical: Check layer count
// Chrome DevTools → Layers panel shows composite layers
// Too many layers can hurt performance

// Composite output: Final rendered frame
// Displayed to user at refresh rate (60fps target)
```
