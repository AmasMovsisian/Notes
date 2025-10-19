let notes = [];
let trashNotes = [];

let notesTitels = [];
let trashNotesTitels = [];

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("notesTitels", JSON.stringify(notesTitels));
  localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
  localStorage.setItem("trashNotesTitels", JSON.stringify(trashNotesTitels));
}

function loadFromLocalStorage() {

    const storedNotes = localStorage.getItem("notes");
    const storedNotesTitels = localStorage.getItem("notesTitels");
    const storedTrashNotes = localStorage.getItem("trashNotes");
    const storedTrashNotesTitels = localStorage.getItem("trashNotesTitels");

    if(storedNotes && storedNotesTitels) {
         notes = JSON.parse(storedNotes);
         notesTitels = JSON.parse(storedNotesTitels);
    }

    if(storedTrashNotes && storedTrashNotesTitels) {
        trashNotes = JSON.parse(storedTrashNotes);
        trashNotesTitels = JSON.parse(storedTrashNotesTitels);
    }

    renderNotes();
    renderTrashNotes();

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

  for (let indexTrashNotes = 0; indexTrashNotes < trashNotes.length; indexTrashNotes++) {
    trashContentRef.innerHTML += getHTMLTrashNotes(indexTrashNotes);
  }
}

function getHTMLNotes(indexNotes) {
  return `
    <h4>${notesTitels[indexNotes]}</h4> <br>
    <p>${notes[indexNotes]} 
      <button onclick="deleteNotes(${indexNotes})">X</button> 
    </p>
  `;
}

function getHTMLTrashNotes(indexTrashNotes) {
  return `
    <h4>${trashNotesTitels[indexTrashNotes]}</h4> <br>
    <p>${trashNotes[indexTrashNotes]} 
      <button onclick="deleteNotesFromTrash(${indexTrashNotes})">X</button> 
    </p>
  `;
}

function saveNotes() {

  let inputNotesRef = document.getElementById("inputNotes");
  let titelNotesRef = document.getElementById("titelNotes");

  notes.push(inputNotesRef.value);      
  notesTitels.push(titelNotesRef.value); 

  renderNotes();

  inputNotesRef.value = "";
  titelNotesRef.value = "";
}


function deleteNotes(indexNotes) {
  let deletednotes = notes.splice(indexNotes, 1);
  let deletedTitels = notesTitels.splice(indexNotes, 1);

  trashNotes.push(deletednotes[0]);
  trashNotesTitels.push(deletedTitels[0]);

  renderNotes();
  renderTrashNotes();
}


function deleteNotesFromTrash(indexTrashNotes) {
  trashNotes.splice(indexTrashNotes, 1);
  trashNotesTitels.splice(indexTrashNotes, 1);

  renderTrashNotes();
}
