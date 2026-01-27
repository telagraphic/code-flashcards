How do you use do...while for interactive flows and state machines?
?

```javascript
// do...while for interactive flows

// Practical: Multi-step wizard/form
class FormWizard {
  constructor(steps) {
    this.steps = steps;
    this.currentStep = 0;
    this.data = {};
  }
  
  async run() {
    do {
      const step = this.steps[this.currentStep];
      const stepData = await this.showStep(step);
      
      if (stepData) {
        this.data[step.name] = stepData;
        this.currentStep++;
      } else if (stepData === null) {
        this.currentStep--; // Go back
      }
      // If stepData is false, stay on current step
    } while (this.currentStep < this.steps.length && this.currentStep >= 0);
    
    return this.data;
  }
  
  async showStep(step) {
    // Show step UI and wait for user input
    return new Promise(resolve => {
      // UI interaction logic
      resolve(step.data);
    });
  }
}

// Practical: Game loop
class GameLoop {
  constructor() {
    this.running = true;
    this.score = 0;
  }
  
  async start() {
    do {
      await this.update();
      await this.render();
      await this.handleInput();
      
      // Check game over condition
      if (this.score >= 100) {
        this.running = false;
      }
      
      // Frame delay
      await new Promise(resolve => requestAnimationFrame(resolve));
    } while (this.running);
  }
  
  async update() {
    // Game logic update
  }
  
  async render() {
    // Render game state
  }
  
  async handleInput() {
    // Handle user input
  }
}

// Practical: Command processor
class CommandProcessor {
  constructor() {
    this.history = [];
    this.undoStack = [];
  }
  
  async processCommands() {
    let command = null;
    
    do {
      command = await this.getNextCommand();
      
      if (command) {
        if (command.type === 'undo' && this.history.length > 0) {
          const lastCommand = this.history.pop();
          this.undoStack.push(lastCommand);
          await this.undo(lastCommand);
        } else if (command.type === 'redo' && this.undoStack.length > 0) {
          const commandToRedo = this.undoStack.pop();
          this.history.push(commandToRedo);
          await this.execute(commandToRedo);
        } else if (command.type !== 'exit') {
          await this.execute(command);
          this.history.push(command);
          this.undoStack = []; // Clear redo stack
        }
      }
    } while (command && command.type !== 'exit');
  }
  
  async getNextCommand() {
    // Get command from user or queue
    return null;
  }
  
  async execute(command) {
    // Execute command
  }
  
  async undo(command) {
    // Undo command
  }
}
```
