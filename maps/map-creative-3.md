How do you use a Map for undo/redo functionality with state snapshots?
?

```javascript
// Map for efficient undo/redo with state snapshots
class UndoRedoManager {
  constructor() {
    this.history = new Map(); // Map<timestamp, state>
    this.currentIndex = -1;
    this.maxHistory = 50; // Limit history size
  }
  
  // Save state snapshot
  saveState(state) {
    const timestamp = Date.now();
    
    // Remove future history if we're not at the end
    if (this.currentIndex < this.history.size - 1) {
      const keysToDelete = Array.from(this.history.keys())
        .sort((a, b) => b - a)
        .slice(0, this.history.size - this.currentIndex - 1);
      keysToDelete.forEach(key => this.history.delete(key));
    }
    
    // Add new state
    this.history.set(timestamp, JSON.parse(JSON.stringify(state)));
    this.currentIndex = this.history.size - 1;
    
    // Limit history size
    if (this.history.size > this.maxHistory) {
      const oldestKey = Array.from(this.history.keys()).sort()[0];
      this.history.delete(oldestKey);
      this.currentIndex--;
    }
  }
  
  // Undo: go back one state
  undo() {
    if (this.canUndo()) {
      this.currentIndex--;
      return this.getCurrentState();
    }
    return null;
  }
  
  // Redo: go forward one state
  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      return this.getCurrentState();
    }
    return null;
  }
  
  getCurrentState() {
    const keys = Array.from(this.history.keys()).sort();
    const currentKey = keys[this.currentIndex];
    return this.history.get(currentKey);
  }
  
  canUndo() {
    return this.currentIndex > 0;
  }
  
  canRedo() {
    return this.currentIndex < this.history.size - 1;
  }
}

// Usage: Text editor with undo/redo
const editor = new UndoRedoManager();
let documentState = { content: '', cursor: 0 };

function updateDocument(newContent) {
  documentState.content = newContent;
  editor.saveState(documentState);
  renderDocument();
}

function undo() {
  const previousState = editor.undo();
  if (previousState) {
    documentState = previousState;
    renderDocument();
  }
}

function redo() {
  const nextState = editor.redo();
  if (nextState) {
    documentState = nextState;
    renderDocument();
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
    e.preventDefault();
    undo();
  } else if (e.ctrlKey && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
    e.preventDefault();
    redo();
  }
});
```
