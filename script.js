// script.js
 
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const clearAllBtn = document.querySelector("#clear-all-btn");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
 
const STORAGE_KEY = "quicknotes-notes";
const MAX_LENGTH = 200;
 
let notes = [];
 
// --- Persistence ---------------------------------------------------------
 
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
 
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      notes = JSON.parse(saved);
    } catch (e) {
      notes = [];
    }
  }
}
 
// --- Count message ---------------------------------------------------------
 
function updateNoteCount() {
  const total = notes.length;
  if (total === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${total} notes.`;
  }
}
 
// --- Rendering ---------------------------------------------------------
 
// Builds one note's <li> card using createElement/textContent only -
// never innerHTML - so note text typed by the user can never be
// accidentally interpreted as HTML.
function createNoteElement(note) {
  const li = document.createElement("li");
  li.className = `note-card category-${note.category}`;
 
  const categoryLabel = document.createElement("span");
  categoryLabel.className = "note-category";
  categoryLabel.textContent = note.category;
  li.appendChild(categoryLabel);
 
  const dateLabel = document.createElement("span");
  dateLabel.className = "note-date";
  dateLabel.textContent = note.createdAt;
  li.appendChild(dateLabel);
 
  const textParagraph = document.createElement("p");
  textParagraph.textContent = note.text;
  li.appendChild(textParagraph);
 
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteNote(note.id);
  });
  li.appendChild(deleteBtn);
 
  return li;
}
 
// Rebuilds the entire <ul> from the current notes array (optionally
// filtered by a search term). This full rebuild-on-every-change is what
// "render()" means here, rather than patching individual list items.
function render(searchTerm = "") {
  notesList.textContent = ""; // clears existing <li> elements safely
 
  const term = searchTerm.trim().toLowerCase();
  const visibleNotes = term
    ? notes.filter((note) => note.text.toLowerCase().includes(term))
    : notes;
 
  if (term && visibleNotes.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.textContent = "No notes match your search.";
    notesList.appendChild(emptyMessage);
    return;
  }
 
  visibleNotes.forEach((note) => {
    notesList.appendChild(createNoteElement(note));
  });
}
 
// --- Add ---------------------------------------------------------
 
function addNote(text, category) {
  const trimmed = text.trim();
 
  if (trimmed === "") {
    errorMessage.textContent = "Please type a note first.";
    return false;
  }
 
  if (trimmed.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return false;
  }
 
  errorMessage.textContent = "";
 
  const note = {
    id: Date.now(),
    text: trimmed,
    category,
    createdAt: new Date().toLocaleString(),
  };
 
  notes.push(note);
  saveNotes();
  updateNoteCount();
  render(searchInput.value);
  return true;
}
 
// --- Delete ---------------------------------------------------------
 
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  updateNoteCount();
  render(searchInput.value);
}
 
// --- Bonus: clear all ---------------------------------------------------------
 
clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) {
    return;
  }
  const confirmed = confirm("Delete all notes?");
  if (confirmed) {
    notes = [];
    saveNotes();
    updateNoteCount();
    render(searchInput.value);
  }
});
 
// --- Event listeners ---------------------------------------------------------
 
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const added = addNote(noteInput.value, noteCategory.value);
  if (added) {
    noteInput.value = "";
  }
});
 
searchInput.addEventListener("input", () => {
  render(searchInput.value);
});
 
// --- Initial load ---------------------------------------------------------
 
loadNotes();
updateNoteCount();
render();
 