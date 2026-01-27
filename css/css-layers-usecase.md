What are practical use cases for CSS Layers?
?

```css
/* Practical: Third-party library integration */
@layer vendor, app;

@layer vendor {
  /* Third-party styles */
  .library-button { 
    padding: 20px; 
    color: blue;
  }
}

@layer app {
  /* Your styles override vendor */
  .library-button { 
    padding: 10px; /* Overrides vendor */
    color: red;    /* Overrides vendor */
  }
}

/* Practical: Component library organization */
@layer base, components, themes;

@layer base {
  /* Base styles */
  button { 
    border: none; 
    cursor: pointer;
  }
}

@layer components {
  /* Component styles */
  .btn-primary { 
    background: blue; 
  }
}

@layer themes {
  /* Theme overrides */
  .btn-primary { 
    background: purple; /* Overrides components */
  }
}

/* Practical: Utility-first CSS with layers */
@layer base, utilities, components;

@layer utilities {
  .p-4 { padding: 1rem; }
  .mt-2 { margin-top: 0.5rem; }
}

@layer components {
  .card {
    padding: 1rem; /* Can override utilities */
  }
}

/* Layers solve specificity issues */
/* Later layers always win, regardless of selector specificity */
```
