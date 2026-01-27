What happens in the Styles step of the Critical Rendering Path?
?

```javascript
// Styles step: Calculate computed styles for each element
// Combines author stylesheets, inline styles, and user agent styles

// Styles calculation happens when:
// 1. CSS is loaded or modified
const style = document.createElement('style');
style.textContent = '.box { color: red; }';
document.head.appendChild(style); // Triggers Styles recalculation

// 2. Element classes change
element.classList.add('active'); // Triggers Styles recalculation

// 3. Inline styles change
element.style.color = 'blue'; // Triggers Styles recalculation

// 4. Media queries match/unmatch
// Browser window resize can trigger Styles recalculation

// Practical: Efficient style changes
// BAD: Multiple style changes trigger multiple style calculations
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '16px'; // 3 style calculations

// GOOD: Use classes (single style calculation)
element.className = 'styled-element'; // 1 style calculation

// Or use CSS custom properties
element.style.setProperty('--color', 'red'); // More efficient

// Practical: getComputedStyle() forces style calculation
const computed = getComputedStyle(element);
console.log(computed.color); // Forces Styles step

// Styles step output: computed styles for each element
// Next step: Layout (if geometry changed)
```
