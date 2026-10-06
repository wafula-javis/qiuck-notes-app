# qiuck-notes-app
QuickNotes is a simple note-taking web app that lets you quickly add,
categorise, search, and delete short notes, with everything saved
automatically in your browser so your notes are still there when you
come back.
 
## Features
 
- Add notes with a category (Personal, Work, or Study)
- Each note shows its category, the date/time it was created, and a Delete button
- Live validation: empty notes and notes over 200 characters are rejected with a clear error message
- Search notes by text, live as you type
- Notes persist across page reloads using localStorage
- Responsive layout that adapts to small screens
- Bonus: a "Clear all" button with a confirmation prompt before deleting everything
## How to run locally
 
1. Clone this repository:
```
   git clone https://github.com/your-username/quicknotes-app.git
```
2. Open the `quicknotes-app` folder.
3. Open `index.html` directly in your browser (double-click it, or right-click → Open with → your browser).
No build step or server is required - it's plain HTML, CSS, and JavaScript.
 
## What I learned
 
- How to store structured data (an array of note objects) in localStorage
  using `JSON.stringify` and `JSON.parse`, and keep it in sync every time
  the data changes.
- Why using `createElement` and `textContent` instead of `innerHTML`
  matters when displaying user-typed text - it avoids accidentally
  treating that text as HTML.
- How to build a live search feature by filtering an array and
  re-rendering, rather than hiding/showing elements individually.
 
