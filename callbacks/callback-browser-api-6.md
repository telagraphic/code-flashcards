How do you use a callback with the Geolocation API?
?

```javascript
// Geolocation API uses callbacks for async location retrieval

// getCurrentPosition takes success and error callbacks
navigator.geolocation.getCurrentPosition(
  function(position) {
    // Success callback
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    
    // Update UI with location
    document.getElementById('location').textContent = 
      `Location: ${latitude}, ${longitude}`;
    
    // Use location for map or API call
    updateMap(latitude, longitude);
  },
  function(error) {
    // Error callback
    console.error('Geolocation error:', error.message);
    document.getElementById('location').textContent = 
      'Unable to retrieve location';
  }
);

// Watch position with callbacks
const watchId = navigator.geolocation.watchPosition(
  function(position) {
    updateLocation(position.coords);
  },
  function(error) {
    console.error('Watch error:', error);
  }
);
```
