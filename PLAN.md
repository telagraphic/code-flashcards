# Plan

I need to create a basic flashcard application using vanilla javascript.

Currently, this project has a bunch of folders with markdown files. These markdown files use this pattern for obverse and reverse sides of a "flashcard".


The "?" denotes the front and back sides to the flashcard.

See ./functions/basics/function-anonymous-function-1.md for an example.

For this app to work

1. I need to move all current folders into a "javascript" parent directory.
2. Next, create the application in the root folder where basic styles, package.json and javascript lives. These can all be located in a folder called flashcard-app.
3. The flashcard-app should use syntax highlighting for js, css, html and use the current triple backtick  ` ``` ` convention for rendering code.
4. Another folder should exist in the flashcard-app that contains the actual flashcards that will be rendered onto the ui for actual review and memory recall.
5. On the front of the card, there should be the question and sample code hint above the "?". I don't need to input my answer since that will be done by writing the answer by hand or in a dev tool for actual REPL execution. 
6. The back of the flashcard should contain the content below the "?" and use syntax highlighting for rendering the answer in code.
7. Above the flashcard component, should be some buttons. One for next card, prev card and random that will randomly load the next card for review.
8. The ui theme should Dracula color scheme to be enjoyable to look at
9. The app can be started with `npm run dev` and will only be used locally, it should be a centered layout where the flashcard text is easily visible and the main focus. Please use the Hack monospace font for the code.
10. Finally, before executing the above steps and phases, we will do a `/grill-me` q&a that will result in a requirements document for the implementation steps.








### grill me skill

Create a skill or cursor rule that I can call like `/grill-me @filename` to execute the process for the below skill file.


```
---
name: grill-with-docs
description: Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates documentation (CONTEXT.md, ADRs) inline as decisions crystallise. Use when user wants to stress-test a plan against their project's language and documented decisions.
---

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase, explore the codebase instead.
```
