# FinTrack – Frontend Technical Assignment

Welcome to the **FinTrack** frontend technical assessment!  
This assignment evaluates your skills in:

- React fundamentals (components, state, effects, props)
- TypeScript
- API usage (mocked API inside the repo)
- UI development and layout
- Data transformation
- Error and loading state handling
- Testing with React Testing Library + Vitest
- Clean code, structure, naming, readability

This assignment should take **4–6 hours**.

------------------------------------------------------------
GETTING STARTED
------------------------------------------------------------

Follow these steps to install and run the project locally.

## 1. Install Dependencies

Make sure you have **Node.js 18+** installed.

Run:

```
npm install
```

------------------------------------------------------------

## 2. Start the Development Server

Run:

```
npm run dev
```

You will see something like:

```
VITE v5.x.x  ready in 300ms
Local: http://localhost:5173/
```

Open the URL in your browser.  
You should see:

```
Technical Assignment
```

This confirms the project is running.

------------------------------------------------------------
RUNNING TESTS
------------------------------------------------------------

This project uses **Vitest**, **React Testing Library**, and **JSDOM**.

To run tests:

```
npm test
```

To run tests in UI mode:

```
npm run test:ui
```

Expected initial passing test:

```
✓ renders the Technical Assignment text
```

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------

```
fintrack-assignment/
  package.json
  tsconfig.json
  vite.config.ts
  index.html
  README.md
  src/
    main.tsx
    App.tsx
    api/
      mockApi.ts
    tests/
      App.test.tsx
      setup.ts
    styles/
      index.css
```

Notes:
- `App.tsx` currently renders "Technical Assignment".
- `mockApi.ts` simulates timed API calls and random failure.
- A basic test already exists.

------------------------------------------------------------
WHAT IS ALREADY INCLUDED
------------------------------------------------------------

- Vite + React + TypeScript setup
- Vitest + React Testing Library configured
- JSDOM test environment
- mockApi.ts with:
  - 400–800 ms simulated latency
  - 10% chance of failure
  - Hardcoded transaction & category data
- One working test
- Base page rendering “Technical Assignment”

------------------------------------------------------------
YOUR ASSIGNMENT: BUILD THE FINTRACK DASHBOARD
------------------------------------------------------------

You will implement a mini personal finance dashboard.

------------------------------------------------------------
1) RECENT TRANSACTIONS TABLE
------------------------------------------------------------

Fetch transactions using `getTransactions()` from `mockApi.ts`.

Each transaction includes:
- id
- date
- merchant
- category
- amount

Requirements:
- Display all transactions in a table
- Format dates:
  - `2026-01-03` → `Jan 3, 2026`
- Format amounts as currency:
  - `-42.75` → `£42.75`
- Negative amounts must be red
- Positive amounts may be green or default styling

States:
- **Loading** indicator during API fetch
- **Error** state with a Retry button if API fails

------------------------------------------------------------
2) CATEGORY FILTER
------------------------------------------------------------

Use `getCategories()` to populate a dropdown filter.

Requirements:
- Selecting a category filters the table
- “All categories” shows everything
- Filtering must be client-side

------------------------------------------------------------
3) SPENDING BREAKDOWN CHART
------------------------------------------------------------

Display a pie chart showing total spending by category.

Rules:
- Only negative amounts (expenses)
- Group by category and sum values
- Show a legend or labels

You can choose a chart library of your choice.

------------------------------------------------------------
MOCKED API DOCUMENTATION
------------------------------------------------------------

Location: `src/api/mockApi.ts`

### `getTransactions(): Promise<Transaction[]>`
Simulated behavior:
- Resolves after 400–800 ms
- 10% chance to throw an error
- Returns example grocery/shopping/salary/food items

### `getCategories(): string[]`
Returns:
```
["Groceries", "Shopping", "Income", "Eating Out"]
```

------------------------------------------------------------
REQUIRED LOADING AND ERROR STATES
------------------------------------------------------------

Loading:
- Show “Loading…” or a spinner

Error:
- Show error message
- Show Retry button
- Retry triggers new API call

------------------------------------------------------------
TEST REQUIREMENTS (MANDATORY)
------------------------------------------------------------

Using React Testing Library + Vitest:

TABLE TESTS:
- Renders all transactions
- Formats date correctly
- Formats amount correctly
- Negative amounts are red
- Filtering works

API TESTS:
- Mock success
- Mock failure
- Retry behavior works

CHART TESTS:
- Chart renders
- Correct number of slices
- Legend matches categories

------------------------------------------------------------
BONUS FEATURES (OPTIONAL)
------------------------------------------------------------

Not required, but good to have:
- Sorting (date or amount)
- Pagination
- Responsive styles
- Unit tests for custom hooks

------------------------------------------------------------
SUBMISSION INSTRUCTIONS
------------------------------------------------------------

Provide:
1. Public GitHub repository link
2. Must run with:
   - `npm install`
   - `npm run dev`
3. Tests must run with:
   - `npm test`
4. Documentation explaining:
   - Structure
   - Data flow
   - Decisions & tradeoffs

------------------------------------------------------------
COMMANDS SUMMARY
------------------------------------------------------------

Install:
```
npm install
```

Run dev:
```
npm run dev
```

Build:
```
npm run build
```

Preview build:
```
npm run preview
```

Run tests:
```
npm test
```

Run tests UI:
```
npm run test:ui
```

------------------------------------------------------------
EVALUATION CRITERIA
------------------------------------------------------------

We look for:
- Correctness
- Code cleanliness
- Folder structure quality
- Naming and readability
- State & data flow clarity
- Handling async states
- Good testing
- UI & UX quality

------------------------------------------------------------
NEXT STEPS FOR YOU
------------------------------------------------------------

1. Load transactions → show a table  
2. Add formatting (dates, currency, colors)  
3. Add category filter  
4. Build aggregated spending data  
5. Render pie chart  
6. Implement loading + error states  
7. Write tests  
8. Polish UI
9. Document implementation
10. Specify assumptions
11. Submit repo  

Good luck and have fun!
