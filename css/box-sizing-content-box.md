What does box-sizing: content-box do?
?

```css
/* box-sizing: content-box (default)
   Width/height applies to content area only
   Padding and border are added to total size */

.element {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid;
  
  /* Total width = 200 + 20*2 + 5*2 = 250px */
  /* Content width = 200px */
}

/* Practical: Traditional box model behavior */
.card {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 2px solid;
  
  /* Total rendered width: 344px */
  /* Can cause layout issues when mixing with border-box */
}

/* When to use content-box:
   - When you need precise content dimensions
   - Legacy code compatibility
   - Specific layout requirements
*/

/* Example: Precise content sizing */
.text-container {
  box-sizing: content-box;
  width: 600px; /* Exactly 600px of text */
  padding: 20px; /* Additional space */
  /* Total: 640px */
}
```
