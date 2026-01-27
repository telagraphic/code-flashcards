What are CSS Layers and what do they do?
?

```css
/* CSS Layers (@layer): Control cascade order explicitly
   Allows organizing styles into named layers with priority */

/* Layer syntax */
@layer base, components, utilities;

/* Define layers */
@layer base {
  button { padding: 10px; }
}

@layer components {
  button { padding: 15px; }
}

/* Later layers override earlier ones */
/* Order: base < components < utilities */

/* Practical: Organize styles by purpose */
@layer reset, base, components, utilities, overrides;

@layer reset {
  * { margin: 0; padding: 0; }
}

@layer base {
  body { font-family: sans-serif; }
}

@layer components {
  .button { padding: 10px; }
}

@layer utilities {
  .mt-4 { margin-top: 1rem; }
}

/* Layers help manage specificity conflicts */
/* Styles in later layers win regardless of specificity */

/* Benefits:
   - Explicit cascade control
   - Better organization
   - Easier to override styles
   - Avoids specificity wars
*/
```
