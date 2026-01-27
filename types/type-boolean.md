What is the Boolean type in JavaScript and how is it used?
?

```javascript
// Boolean: Represents true or false values
// Primitive type with two literal values

const isActive = true;
const isDisabled = false;

// Truthy and falsy values
// Falsy: false, 0, '', null, undefined, NaN
// Everything else is truthy

// Boolean conversion
Boolean(1); // true
Boolean(0); // false
Boolean(''); // false
Boolean('text'); // true
Boolean(null); // false
Boolean(undefined); // false

// Double negation for quick conversion
!!'text'; // true
!!0; // false

// Practical: Feature flags
const features = {
  darkMode: true,
  newDashboard: false,
  betaFeatures: true
};

if (features.darkMode) {
  enableDarkMode();
}

// Practical: Form validation
function validateForm(formData) {
  const isValid = formData.email && 
                  formData.password && 
                  formData.password.length >= 8;
  return isValid;
}

// Practical: Conditional rendering logic
function shouldShowButton(user, permissions) {
  return user.isAuthenticated && 
         permissions.includes('write') && 
         !user.isBanned;
}

// Practical: Toggle state
class Toggle {
  constructor() {
    this.state = false;
  }
  
  toggle() {
    this.state = !this.state;
    return this.state;
  }
  
  isOn() {
    return this.state === true;
  }
}

// Practical: Boolean operators
const result = value1 && value2; // AND
const result2 = value1 || value2; // OR
const result3 = !value1; // NOT

// Practical: Short-circuit evaluation
const username = user.name || 'Guest';
const config = options || defaultConfig;

// Practical: Checkbox/radio button state
function getCheckboxValue(checkbox) {
  return checkbox.checked; // Returns boolean
}

// Practical: API response handling
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  
  if (data.success) { // Boolean check
    return data.payload;
  }
  throw new Error('Request failed');
}
```
