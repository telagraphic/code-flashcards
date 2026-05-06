# Flashcard app — requirements

Product-of-record for the local Vite app under `flashcard-app/`. Derived from `PLAN.md` and the grilling (design Q&A) session.

## Goals

- **Stack:** Vite, **vanilla JavaScript** (no React), **plain DOM**, **ES module classes** for behavior; **`src/App.js`** is the main application entry (bootstrapped from `src/main.js`).
- **Run locally:** `cd flashcard-app && npm run dev`.
- **Offline-friendly:** code highlighting and **Hack** font are bundled (no reliance on CDN for fonts).

## Repository layout

- **`flashcard-app/`** — the Vite app (this spec).
- **Reference library** — long-form markdown may remain anywhere at the repo root (e.g. a future top-level `javascript/` folder). **Publishing** to the app is **manual copy** into `flashcard-app/public/flashcards/<deck>/…`, then **`npm run generate-index`**.

## Content model

- **Source library (reference):** top-level folders in the repo (e.g. `functions/`, `javascript/` concept) stay as the long-term library; you **manually copy** chosen `.md` files into the app for review.
- **Published cards (what the app reads):** markdown under **`flashcard-app/public/flashcards/<deck>/...`** (e.g. `flashcard-app/public/flashcards/javascript/...`). Vite serves `public/` at the site root, so cards load via `fetch('/flashcards/...')`.

### Card format

- Single `.md` file per card.
- A line that is **exactly** `?` (alone on its own line) divides:
  - **Front:** everything **above** `?` (question + optional hint code).
  - **Back:** everything **below** `?` (answer, with code as needed).

### Decks and index

- Subfolders of `public/flashcards/` **directly under** `flashcards/` are **deck ids** (e.g. `javascript`, `css`).
- **`public/flashcards/index.json`** lists every `.md` file. It must be **regenerated** when you add, move, or remove cards:

  ```bash
  cd flashcard-app && npm run generate-index
  ```

- **“All decks”** mode merges every card and sorts by **`deck` then `path`** (stable, predictable order).

## Rendering

- **Markdown (subset):** headings, lists, bold/italic, links, inline code, fenced code blocks.
- **Markdown config:** HTML embedded in markdown is **disabled**; rendered HTML is **sanitized** before `innerHTML`.
- **Syntax highlighting (fenced `lang`):** support **JavaScript, CSS, HTML, JSON, TypeScript, Bash** (with common aliases like `js`, `html`, `sh`). Unknown or missing language: plain monospace, still in a `<pre><code>` block.

## UI / UX

- **Theme:** Dracula-inspired palette; layout **centered**; the card content is the focus.
- **Typography:** body text uses a readable system stack; **code** uses bundled **Hack** via the **`hack-font`** package (Vite bundles the `.woff2` assets from `node_modules`).
- **Navigation (toolbar):**
  - **Prev / Next:** move within the current deck selection; **wrap** at ends.
  - **Random:** picks a **different** card from the current selection when **two or more** cards exist; with one card, it may “random” to the same card.
  - **Deck menu:** **All decks** or a single deck.
- **Answer reveal:** **button** toggles front vs back; **no animations**; toggle is **immediate**.
- After **Prev / Next / Random** or **deck change**, the UI always shows the **front** first (never auto-reveal answer).
- **Keyboard:** **Left / Right** = Prev / Next; **Space** = toggle answer (ignored when typing in a field); **R** = random.

## Persistence

- **`localStorage`:** remembers last **deck selection** and **card index** across reloads.
- On load, if the saved index is out of range (e.g. after `index.json` shrinks), **clamp** to a valid card.

## Scripts (package.json)

| Script             | Purpose                                              |
|-------------------|------------------------------------------------------|
| `npm run dev`      | Vite dev server                                      |
| `npm run build`    | Production build                                     |
| `npm run preview`  | Preview production build                             |
| `npm run generate-index` | Regenerate `public/flashcards/index.json`   |

## Non-goals (current phase)

- Automated sync/publish from the reference library into `public/flashcards/` (manual copy only).
- Per-card `publish: true/false` frontmatter.
- User accounts, spaced repetition, or cloud sync.
