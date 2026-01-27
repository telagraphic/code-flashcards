What are practical use cases for getComputedStyle?
?

```javascript
// Practical use cases for getComputedStyle

// 1. Read CSS custom properties (CSS variables)
function getCSSVariable(element, variableName) {
  const computed = getComputedStyle(element);
  return computed.getPropertyValue(`--${variableName}`).trim();
}

const primaryColor = getCSSVariable(document.documentElement, 'primary-color');
console.log(primaryColor); // e.g., '#ff0000'

// 2. Detect media query state
function isMobile() {
  const body = document.body;
  const computed = getComputedStyle(body);
  // Check if mobile-specific class is applied
  return body.classList.contains('mobile') || 
         parseInt(computed.fontSize) < 16; // Example heuristic
}

// 3. Get transition/animation properties
function getTransitionDuration(element) {
  const computed = getComputedStyle(element);
  const duration = computed.transitionDuration;
  // Returns '0s' if no transition
  return parseFloat(duration) * 1000; // Convert to milliseconds
}

// 4. Check if element uses specific display type
function isFlexContainer(element) {
  const computed = getComputedStyle(element);
  return computed.display === 'flex' || computed.display === 'inline-flex';
}

// 5. Read transform values
function getTransform(element) {
  const computed = getComputedStyle(element);
  const transform = computed.transform;
  // Parse matrix values if needed
  return transform;
}

// 6. Detect dark mode
function isDarkMode() {
  const computed = getComputedStyle(document.documentElement);
  const bgColor = computed.backgroundColor;
  // Simple heuristic: check if background is dark
  const rgb = bgColor.match(/\d+/g);
  if (rgb) {
    const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
    return brightness < 128;
  }
  return false;
}

// 7. Get font metrics
function getFontMetrics(element) {
  const computed = getComputedStyle(element);
  return {
    fontSize: computed.fontSize,
    fontFamily: computed.fontFamily,
    fontWeight: computed.fontWeight,
    lineHeight: computed.lineHeight
  };
}

// 8. Batch style reads (more efficient)
function batchGetStyles(elements) {
  // Force single style calculation
  const styles = elements.map(el => getComputedStyle(el));
  return styles.map(computed => ({
    width: computed.width,
    height: computed.height,
    color: computed.color
  }));
}
```
