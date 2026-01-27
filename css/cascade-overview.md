What is CSS Cascade and how does it work?
?

```css
/* CSS Cascade: Process of combining multiple style sources
   Order of precedence determines which styles apply */

/* Cascade order (lowest to highest priority):
   1. User agent stylesheet (browser defaults)
   2. User stylesheet (user preferences)
   3. Author stylesheet (your CSS)
   4. Author !important
   5. User !important
   6. User agent !important (rare)
*/

/* Example: Multiple sources */
/* Browser default */
button { padding: 0; }

/* User stylesheet */
button { font-size: 14px; }

/* Author stylesheet */
button { padding: 10px; font-size: 16px; }

/* Author with !important */
button { padding: 15px !important; }

/* Final result: padding: 15px, font-size: 16px */

/* Cascade within same source:
   - Later rules override earlier ones
   - More specific selectors override less specific
   - !important overrides normal rules
*/

/* Practical: Understanding cascade helps debug styling issues */
.button { color: blue; }
.button { color: red; } /* This wins (later rule) */

.button.primary { color: green; } /* This wins (more specific) */
```
