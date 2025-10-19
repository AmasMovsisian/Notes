function init() {
  loadFromLocalStorage();
  renderNotes();
  renderTrashNotes();
}

let notes = [];
let trashNotes = [];

let notesTitels = [];
let trashNotesTitels = [];

function loadFromLocalStorage() {
  const storedNotes = localStorage.getItem("notes");
  const storedNotesTitels = localStorage.getItem("notesTitels");
  const storedTrashNotes = localStorage.getItem("trashNotes");
  const storedTrashNotesTitels = localStorage.getItem("trashNotesTitels");

  if (storedNotes && storedNotesTitels) {
    notes = JSON.parse(storedNotes);
    notesTitels = JSON.parse(storedNotesTitels);
  }

  if (storedTrashNotes && storedTrashNotesTitels) {
    trashNotes = JSON.parse(storedTrashNotes);
    trashNotesTitels = JSON.parse(storedTrashNotesTitels);
  }

  renderNotes();
  renderTrashNotes();
}

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("notesTitels", JSON.stringify(notesTitels));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  localStorage.setItem("trashNotesTitels", JSON.stringify(trashNotesTitels));
}

function renderNotes() {
  let contentRef = document.getElementById("content");
  let titelNotesRef = document.getElementById("titelNotes");
  titelNotesRef.innerHTML = "";
  contentRef.innerHTML = "";

  for (let indexNotes = 0; indexNotes < notes.length; indexNotes++) {
    contentRef.innerHTML += getHTMLNotes(indexNotes);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("trashContent");
  trashContentRef.innerHTML = "";

  for (
    let indexTrashNotes = 0;
    indexTrashNotes < trashNotes.length;
    indexTrashNotes++
  ) {
    trashContentRef.innerHTML += getHTMLTrashNotes(indexTrashNotes);
  }
}

function getHTMLNotes(indexNotes) {
  return `<div class="titel_btn_notes">
    <p class="titel_notes">${notesTitels[indexNotes]}</p> <button class="del_btn" onclick="deleteNotes(${indexNotes})">X</button> 
     </div>
    <p>${notes[indexNotes]} </p>
  `;
}

function getHTMLTrashNotes(indexTrashNotes) {
  return ` <div class="titel_btn_trash_notes">
    <p class="titel_trash_notes">${trashNotesTitels[indexTrashNotes]}</p>  <button class="del_btn" onclick="deleteNotesFromTrash(${indexTrashNotes})">X</button>
    </div>
    <p>${trashNotes[indexTrashNotes]}  
    </p>
  `;
}

function saveNotes() {
  let inputNotesRef = document.getElementById("inputNotes");
  let titelNotesRef = document.getElementById("titelNotes");

  if(inputNotesRef.value !== "" && titelNotesRef.value !== "") {
    
  
  notes.push(inputNotesRef.value);
  notesTitels.push(titelNotesRef.value);
  renderNotes();

  inputNotesRef.value = "";
  titelNotesRef.value = "";
  saveNotesToLocalStorage();
  } else {
    alert("Bitte beide Felder ausfüllen!")
  }

}


function deleteNotes(indexNotes) {
  let deletednotes = notes.splice(indexNotes, 1);
  let deletedTitels = notesTitels.splice(indexNotes, 1);

  trashNotes.push(deletednotes[0]);
  trashNotesTitels.push(deletedTitels[0]);

  renderNotes();
  renderTrashNotes();

  saveNotesToLocalStorage();
}

function deleteNotesFromTrash(indexTrashNotes) {
  trashNotes.splice(indexTrashNotes, 1);
  trashNotesTitels.splice(indexTrashNotes, 1);

  renderTrashNotes();
  saveNotesToLocalStorage();
}
