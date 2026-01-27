What are the steps in CSS computation and style calculation?
?

```css
/* CSS Computation Steps: How browser calculates final styles */

/* Step 1: Parsing
   - Parse CSS rules from stylesheets
   - Build CSSOM (CSS Object Model)
   - Handle @import, @media queries
*/

/* Step 2: Cascade Resolution
   - Combine styles from multiple sources
   - Resolve conflicts using cascade rules
   - Apply !important declarations
*/

/* Step 3: Specificity Calculation
   - Calculate selector specificity
   - Higher specificity wins conflicts
   - Order matters for equal specificity
*/

/* Step 4: Inheritance
   - Inherit properties from parent elements
   - Only inheritable properties cascade down
   - Explicit values override inherited
*/

/* Step 5: Value Resolution
   - Resolve relative units (em, rem, %, vw, etc.)
   - Calculate computed values
   - Convert to absolute values
*/

/* Step 6: Used Value Calculation
   - Apply layout constraints
   - Calculate final used values
   - Handle auto, inherit, initial
*/

/* Step 7: Actual Value (Rendering)
   - Final values for rendering
   - Rounded pixel values
   - Applied to DOM elements
*/

/* Practical: Understanding computation helps debug */
.parent {
  font-size: 16px; /* Computed: 16px */
}

.child {
  font-size: 1.5em; /* Computed: 24px (1.5 * 16px) */
  width: 50%; /* Computed: depends on parent width */
}

/* Browser DevTools shows computed values */
/* Right-click → Inspect → Computed tab */
```
