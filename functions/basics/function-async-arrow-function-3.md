How do you create an async arrow function that uploads a file?
?

```javascript
// Async arrow function for file upload
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Usage in file input handler
document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const url = await uploadFile(file);
      document.getElementById('preview').src = url;
    } catch (error) {
      alert('Upload failed');
    }
  }
});
```
