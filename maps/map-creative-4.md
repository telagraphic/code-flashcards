How do you use a Map for real-time collaboration with conflict resolution?
?

```javascript
// Map for managing real-time collaborative editing with conflict resolution
class CollaborativeEditor {
  constructor(documentId) {
    this.documentId = documentId;
    this.localChanges = new Map(); // Map<operationId, change>
    this.remoteChanges = new Map(); // Map<timestamp, change>
    this.appliedOperations = new Map(); // Map<operationId, true>
    this.operationCounter = 0;
  }
  
  // Apply local change
  applyLocalChange(type, position, content) {
    const operationId = `${Date.now()}_${this.operationCounter++}`;
    const change = {
      id: operationId,
      type, // 'insert' or 'delete'
      position,
      content,
      timestamp: Date.now(),
      author: this.getCurrentUser()
    };
    
    this.localChanges.set(operationId, change);
    this.applyChange(change);
    this.broadcastChange(change);
    
    return operationId;
  }
  
  // Receive remote change
  receiveRemoteChange(change) {
    // Check if already applied
    if (this.appliedOperations.has(change.id)) {
      return; // Already processed
    }
    
    // Resolve conflicts with local changes
    const conflictResolution = this.resolveConflicts(change);
    
    if (conflictResolution.shouldApply) {
      // Transform change position if needed
      const transformedChange = {
        ...change,
        position: conflictResolution.newPosition
      };
      
      this.remoteChanges.set(change.timestamp, transformedChange);
      this.applyChange(transformedChange);
      this.appliedOperations.set(change.id, true);
    }
  }
  
  // Resolve conflicts between local and remote changes
  resolveConflicts(remoteChange) {
    let newPosition = remoteChange.position;
    
    // Check for conflicts with local changes
    for (const [opId, localChange] of this.localChanges) {
      if (localChange.timestamp < remoteChange.timestamp) {
        // Local change happened first, adjust remote position
        if (localChange.type === 'insert' && localChange.position <= remoteChange.position) {
          newPosition += localChange.content.length;
        } else if (localChange.type === 'delete' && localChange.position < remoteChange.position) {
          newPosition -= localChange.content.length;
        }
      }
    }
    
    return {
      shouldApply: true,
      newPosition: Math.max(0, newPosition)
    };
  }
  
  applyChange(change) {
    // Apply change to document
    const editor = document.getElementById('editor');
    const text = editor.value;
    
    if (change.type === 'insert') {
      const newText = text.slice(0, change.position) + 
                     change.content + 
                     text.slice(change.position);
      editor.value = newText;
    } else if (change.type === 'delete') {
      const newText = text.slice(0, change.position) + 
                     text.slice(change.position + change.content.length);
      editor.value = newText;
    }
  }
  
  broadcastChange(change) {
    // Send to WebSocket or server
    // websocket.send(JSON.stringify(change));
  }
  
  getCurrentUser() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  }
}

// Usage: Real-time collaborative text editor
const editor = new CollaborativeEditor('doc123');

document.getElementById('editor').addEventListener('input', (e) => {
  const position = e.target.selectionStart;
  const newChar = e.target.value[position - 1];
  editor.applyLocalChange('insert', position - 1, newChar);
});

// Simulate receiving remote changes
setInterval(() => {
  // In real app, this would come from WebSocket
  const mockChange = {
    id: `remote_${Date.now()}`,
    type: 'insert',
    position: 5,
    content: 'X',
    timestamp: Date.now(),
    author: 'other_user'
  };
  editor.receiveRemoteChange(mockChange);
}, 5000);
```
