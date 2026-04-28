How do you use for await...of for processing file chunks in a web app?
?

```javascript
// for await...of processes file chunks as they're read
async function processLargeFile(file) {
  const chunkSize = 1024 * 1024; // 1MB chunks
  let offset = 0;
  
  // Create async generator for file chunks
  async function* readChunks() {
    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      const text = await chunk.text();
      yield text;
      offset += chunkSize;
    }
  }
  
  // Process chunks one at a time
  for await (const chunk of readChunks()) {
    // Process each chunk
    parseChunk(chunk);
    updateProgress((offset / file.size) * 100);
  }
  
  console.log('File processing complete');
}

// Practical: Upload file in chunks
async function uploadFileInChunks(file) {
  const chunkSize = 5 * 1024 * 1024; // 5MB chunks
  
  async function* createChunks() {
    for (let i = 0; i < file.size; i += chunkSize) {
      yield file.slice(i, i + chunkSize);
    }
  }
  
  let chunkNumber = 0;
  for await (const chunk of createChunks()) {
    await uploadChunk(chunk, chunkNumber++);
    updateUploadProgress((chunkNumber * chunkSize / file.size) * 100);
  }
}
```
