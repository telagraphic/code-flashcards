## Functional JavaScript (FP-only style) briefing (modern web apps)

This briefing is about using a *functional style* in JavaScript—leaning on:

- **pure functions** (same inputs → same outputs, no hidden side effects)
- **immutability** (don’t mutate data in-place)
- **composition** (build bigger behavior by combining small functions)
- **data-last, curried APIs** (common in FP libs; great for pipelines)

The article you linked highlights these libraries:

- **Lodash/fp**
- **Ramda**
- **Immutable.js**
- **Mout**
- **RxJS**
- **KefirJS**

You can use these on **client** and **server** (with some caveats below).

---

## What “functional-only” usually means in real JS code

Most production “FP JS” is not Haskell-style purity everywhere. It’s typically:

- keep **domain logic pure**
- isolate side effects at the edges:
  - HTTP / DB calls
  - reading/writing global state
  - timers and subscriptions
  - DOM manipulation

Think: “functional core, imperative shell”.

---

## Pros / cons of a functional approach

### Pros (when it works well)

- **Easier reasoning**: pure functions are local; you don’t need to know what else happened earlier.
- **Testability**: pure domain logic is trivial to unit test.
- **Refactorability**: small composable functions are easier to rearrange than big methods.
- **Predictable state updates**: immutability avoids “who mutated this object?” bugs.
- **Concurrency friendliness**: fewer shared-mutation bugs on the server; fewer “stale closure / mutated reference” issues on the client.
- **Reusable “behavior builders”**: HOFs like `memoize`, `once`, `debounce`, composition helpers, etc.

### Cons (when it hurts)

- **Readability tax** if overdone:
  - point-free style can hide what’s happening
  - deep currying can make debugging harder
- **Performance overhead** risks:
  - excessive object/array copying (especially without persistent data structures)
  - too many intermediate arrays from `map/filter/reduce` chains
- **TypeScript friction**:
  - curried, generic-heavy libs can be harder to type well
- **Async + errors need conventions**:
  - composition is easy for sync unary functions; harder for multi-arg, async, or errorful workflows

Rule of thumb: FP is most valuable when it makes *domain behavior more explicit* and *side effects more controlled*.

---

## Can you use FP libraries on client and server?

### Client (React/Vue/Svelte/Vanilla)

Yes, with these considerations:

- **Bundle size**:
  - prefer tree-shakable imports (ESM builds where possible)
  - avoid importing an entire utility library for 2 helpers
- **UI state already trends FP**:
  - React state updates prefer immutability
  - selectors and derived data benefit from pure functions
- **Streams fit UI**:
  - RxJS/Kefir can model UI events, websockets, and async flows (but introduces a paradigm)

### Server (Node/Edge/Serverless)

Yes, with these considerations:

- **Purity helps**: business rules as pure functions makes handlers thin and consistent.
- **Streams fit services**:
  - RxJS/Kefir can model queues, polling, event ingestion, rate limiting, retries
- **DB writes are side effects**:
  - isolate IO in a small layer; keep transformation/validation pure

---

## Library landscape: what each one is “for”

### Lodash/fp

**What it gives you**

- functional-flavored versions of many lodash utilities
- typically **immutable**, **auto-curried**, and **data-last**

**When it’s a good fit**

- you like lodash’s breadth, but want pipeline-friendly APIs
- you want practical utilities more than “academic FP”

**Common use cases**

- data shaping in services: pick/omit/merge/uniqBy/sortBy/groupBy
- form normalization and DTO mapping
- building reusable pipeline helpers

**Trade-offs**

- can be “too much” if you only need a few helpers
- some teams find `fp` style unfamiliar (data-last/curry)

### Ramda

**What it gives you**

- a library designed for composition, currying, and data-last pipelines

**When it’s a good fit**

- you want to lean into functional composition heavily
- you want consistent curried APIs everywhere

**Common use cases**

- composing transformations for API responses / UI view models
- reusable predicates and validators

**Trade-offs**

- can encourage “clever” code if you go too point-free
- typing can be challenging in TS depending on usage

### Immutable.js

**What it gives you**

- persistent immutable data structures (structural sharing)

**When it’s a good fit**

- large state trees with frequent updates (historically common with Redux)
- you want immutability without copying huge objects

**Trade-offs**

- non-native data structures (Lists/Maps instead of arrays/objects)
- interop friction (serialization, APIs expecting plain objects)
- many apps now prefer “plain objects + Immer” rather than Immutable.js

### Mout

**What it gives you**

- many small modular utilities (older-school utility approach)

**When it’s a good fit**

- you want a lightweight modular toolbox

**Trade-offs**

- less common in modern mainstream codebases; smaller ecosystem mindshare

### RxJS

**What it gives you**

- Observables + operators for composing async streams

**When it’s a good fit**

- UI event streams, websockets, live updates
- complex async workflows: retries, cancellation, debouncing/throttling, fan-in/out
- server: message processing pipelines, polling, background jobs

**Trade-offs**

- learning curve is real (you adopt a new mental model)
- can be overkill for simple CRUD forms

### KefirJS

**What it gives you**

- a smaller reactive stream library (similar “reactive FP” space)

**When it’s a good fit**

- you want reactive streams but prefer a lighter API than RxJS

**Trade-offs**

- fewer examples/community patterns than RxJS

---

## How FP helps you write CRUD apps better (concrete patterns)

CRUD apps typically have the same repeating needs:

- validate input
- map input → domain model
- apply business rules
- persist (DB)
- map domain → response DTO
- handle errors consistently
- keep UI state consistent (loading, success, error)

FP shines when you make the “middle” pure and composable.

### Pattern 1: Functional core, imperative shell (handlers become thin)

**Imperative shell** (express/next route handler):

```js
// shell: IO and wiring only
export async function updateUserHandler(req, res) {
  const input = req.body;

  const result = updateUserCommand(input); // pure
  if (!result.ok) return res.status(400).json({ error: result.error });

  const saved = await userRepo.save(result.value); // IO
  return res.json(toUserDto(saved)); // pure mapping
}
```

**Functional core** (pure domain command):

```js
function updateUserCommand(input) {
  const parsed = parseUpdateUser(input);     // validate/normalize
  if (!parsed.ok) return parsed;

  const updated = applyBusinessRules(parsed.value);
  return { ok: true, value: updated };
}
```

This structure scales: adding rules doesn’t bloat handlers.

### Pattern 2: Pipeline transformations for DTO mapping

This is where Lodash/fp or Ramda are often used.

Example idea (library-agnostic):

```js
const toUserDto = (u) => ({
  id: u.id,
  name: u.name,
  createdAt: u.createdAt.toISOString(),
});
```

In a codebase with many endpoints, you build a small set of reusable mappers and compose them.

### Pattern 3: Reusable validation as pure functions

Small validators compose well:

```js
const isNonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
const hasMinLen = (n) => (s) => typeof s === "string" && s.length >= n;

const isStrongPassword = (s) => isNonEmpty(s) && hasMinLen(12)(s);
```

Libraries can help you manage validation pipelines, but the key is: **pure and reusable**.

### Pattern 4: Memoize derived data (client selectors)

On the client, derived data is everywhere (filters/sorts/joins). A memoized selector avoids recalculating:

```js
const selectVisibleUsers = (users, query) => {
  const q = String(query ?? "").trim().toLowerCase();
  return users.filter((u) => u.name.toLowerCase().includes(q));
};
```

You can memoize this if inputs repeat frequently, but only if you can define stable keys/invalidation.

### Pattern 5: RxJS/Kefir for “live CRUD” (streams + cancellation)

Reactive libs shine when CRUD isn’t just form submit → response:

- typeahead search
- autosave drafts
- live updates (websocket)
- retries with backoff
- cancellation on navigation

CRUD apps with “real-time-ish” UX often benefit from reactive streams *more than* from composition helpers.

---

## Practical guidance: what to study next (a good sequence)

### First: functional fundamentals (no libraries)

- **purity vs side effects**
- **immutability patterns** in JS (copying, structural sharing concepts)
- **composition** and small HOF utilities (`once`, `memoize`, `debounce`, `negate`)
- **data transformation** with native `map/filter/reduce`

### Then: pick one “transformation” library

Pick **one** of these styles for 2–4 weeks:

- **Lodash/fp** if you want practical breadth with FP-friendly APIs
- **Ramda** if you want composition-first and currying everywhere

Study goals:

- data-last pipelines
- composing small transforms into “mappers” and “selectors”
- predicate building and reuse

### Then: decide if you need “reactive FP”

If your app has streams (UI events, websockets, background jobs):

- study **RxJS** (most common) or **Kefir** (lighter)

Study goals:

- cancellation (unsubscribe)
- combining streams (merge/switchMap-like patterns)
- retries/backoff and debouncing/throttling as stream operators

### Only then: consider persistent immutable data structures

Reach for **Immutable.js** when you have evidence you need it (performance/scale) or you want persistent data semantics. Otherwise, prefer:

- plain objects/arrays + disciplined immutability
- (often) using Immer in UI state management (common modern approach)

---

## A quick “decision filter” (what to reach for in a CRUD app)

- **Mostly request/response + forms + basic lists**:
  - focus on functional core + pure validators + pure mappers
  - a small set of helpers (maybe Lodash/fp *or* just native)
- **Lots of derived state / filtering/sorting/grouping**:
  - Lodash/fp or Ramda can pay off
  - invest in consistent DTO → view model mapping pipelines
- **Live UX: typeahead/autosave/websockets/retries/cancellation**:
  - RxJS (or Kefir) becomes compelling
- **Huge nested state with lots of updates**:
  - consider Immutable.js (or other immutability tooling) with care

---

## Refactoring recipes: imperative / class-based → FP-leaning (without “going full FP”)

These examples follow the same theme as above: **functional core, imperative shell**. The goal is not “no classes ever” — it’s:

- keep **domain logic / transforms / validators** as **pure functions**
- keep **IO + frameworks** (fetch/DB/DOM/UI) at the edges
- prefer **data-in → data-out** helpers you can compose and test

### Recipe 1: Data fetching (imperative service method → functional core + IO shell)

#### Before (class method mixes IO + mapping + error handling)

```js
class UserService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchUsers(query) {
    const url = `${this.baseUrl}/users?q=${encodeURIComponent(query ?? "")}`;

    let res;
    try {
      res = await fetch(url);
    } catch (e) {
      throw new Error("Network error");
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.users
      .map((u) => ({ id: String(u.id), name: String(u.name ?? "") }))
      .filter((u) => u.name.trim().length > 0);
  }
}
```

#### After (IO shell fetches; pure functions validate/map/derive)

```js
const buildUsersUrl = (baseUrl, query) =>
  `${baseUrl}/users?q=${encodeURIComponent(String(query ?? ""))}`;

const toUser = (u) => ({ id: String(u.id), name: String(u.name ?? "") });

const isValidUser = (u) => u.name.trim().length > 0;

const parseUsersResponse = (json) => {
  const users = Array.isArray(json?.users) ? json.users : [];
  return users.map(toUser).filter(isValidUser);
};

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

async function fetchUsers(baseUrl, query) {
  const url = buildUsersUrl(baseUrl, query);
  const json = await fetchJson(url);         // IO edge
  return parseUsersResponse(json);           // pure transform
}
```

- **What changed**: mapping and validation are now pure and reusable. The “fetching” part is still imperative (because it’s IO), but it’s small and consistent.

---

### Recipe 2: Derived data (loop + mutation → pure selectors)

#### Before (mutating accumulators inline)

```js
function getVisibleSortedUsers(users, query) {
  const q = (query ?? "").trim().toLowerCase();
  const out = [];

  for (const u of users) {
    if (!u || !u.name) continue;
    if (!u.name.toLowerCase().includes(q)) continue;
    out.push(u);
  }

  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}
```

#### After (small pure helpers + composition)

```js
const normalizeQuery = (q) => String(q ?? "").trim().toLowerCase();

const matchesQuery = (q) => (u) =>
  String(u?.name ?? "").toLowerCase().includes(q);

const byNameAsc = (a, b) => String(a?.name ?? "").localeCompare(String(b?.name ?? ""));

function getVisibleSortedUsers(users, query) {
  const q = normalizeQuery(query);
  return [...users]
    .filter(matchesQuery(q))
    .sort(byNameAsc);
}
```

- **What changed**: no hidden mutation of an accumulator; helpers (`normalizeQuery`, `matchesQuery`, `byNameAsc`) are reusable and testable.

---

### Recipe 3: UI event listeners (stateful class handler → pure update + side-effect boundary)

#### Before (class owns state and mutates it inside handler)

```js
class SearchController {
  constructor(inputEl, api) {
    this.inputEl = inputEl;
    this.api = api;
    this.query = "";
    this.results = [];
    this.onInput = this.onInput.bind(this);
  }

  mount() {
    this.inputEl.addEventListener("input", this.onInput);
  }

  async onInput(e) {
    this.query = e.target.value;
    this.results = await this.api.search(this.query);
    renderResults(this.results);
  }
}
```

#### After (pure reducer-style update; effects are explicit)

```js
const initialState = { query: "", results: [], status: "idle", error: null };

// Pure: given previous state + event value, compute next state
const updateQuery = (state, nextQuery) => ({
  ...state,
  query: nextQuery,
  status: "loading",
  error: null,
});

// Pure: apply results
const applyResults = (state, results) => ({
  ...state,
  results,
  status: "success",
});

// Pure: apply error
const applyError = (state, error) => ({
  ...state,
  status: "error",
  error: String(error?.message ?? error),
});

function mountSearch(inputEl, api) {
  let state = initialState;

  const setState = (next) => {
    state = next;
    renderResults(state.results); // side effect (render) at the edge
  };

  inputEl.addEventListener("input", async (e) => {
    const q = e.target.value;              // read from DOM (edge)
    setState(updateQuery(state, q));       // pure update

    try {
      const results = await api.search(q); // IO (edge)
      setState(applyResults(state, results));
    } catch (err) {
      setState(applyError(state, err));
    }
  });
}
```

- **What changed**: the “how state changes” logic is now pure and separate from DOM + network effects.
- **Optional next step**: add `debounce/throttle` to the event handler without touching pure state logic.

---

### Recipe 4: Validation + error handling (throwing everywhere → Result objects)

Throwing exceptions is fine, but it can make composition harder because control flow jumps out of pipelines. A lightweight FP-leaning pattern is to return a **Result**:

```js
const ok = (value) => ({ ok: true, value });
const err = (error) => ({ ok: false, error });
```

#### Before (throws inside validation and mapping)

```js
function parseSignup(input) {
  if (!input.email) throw new Error("Email required");
  if (!String(input.email).includes("@")) throw new Error("Invalid email");
  if (!input.password || String(input.password).length < 12) {
    throw new Error("Weak password");
  }
  return { email: String(input.email).trim(), password: String(input.password) };
}
```

#### After (pure validators that compose)

```js
const isNonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
const hasMinLen = (n) => (s) => typeof s === "string" && s.length >= n;
const includes = (needle) => (s) => typeof s === "string" && s.includes(needle);

function parseSignup(input) {
  const email = String(input?.email ?? "").trim();
  const password = String(input?.password ?? "");

  if (!isNonEmpty(email)) return err("Email required");
  if (!includes("@")(email)) return err("Invalid email");
  if (!hasMinLen(12)(password)) return err("Weak password");

  return ok({ email, password });
}
```

Then your imperative shell decides how to respond:

```js
export async function signupHandler(req, res) {
  const parsed = parseSignup(req.body); // pure
  if (!parsed.ok) return res.status(400).json({ error: parsed.error });

  // IO at the edge:
  const user = await userRepo.create(parsed.value);
  return res.json({ id: user.id });
}
```

---

### Recipe 5: “Replace methods with functions” (keep classes, but move logic out)

You don’t have to delete classes to get FP benefits. A pragmatic compromise:

- keep the class as a **state/IO holder** (repos, clients, config)
- move business logic into **pure functions** that the class calls

#### Before (logic lives in the class)

```js
class PricingService {
  total(cart) {
    let sum = 0;
    for (const item of cart.items) {
      sum += item.price * item.qty;
    }
    if (cart.coupon) sum *= 0.9;
    return Math.round(sum * 100) / 100;
  }
}
```

#### After (class delegates to pure functions)

```js
const subtotal = (items) =>
  items.reduce((sum, it) => sum + it.price * it.qty, 0);

const applyCoupon = (coupon) => (amount) =>
  coupon ? amount * 0.9 : amount;

const round2 = (n) => Math.round(n * 100) / 100;

const priceCart = (cart) => round2(applyCoupon(cart.coupon)(subtotal(cart.items)));

class PricingService {
  total(cart) {
    return priceCart(cart);
  }
}
```

- **What changed**: logic became easy to test (`priceCart`), and the class can remain as the integration point if your app prefers that structure.

