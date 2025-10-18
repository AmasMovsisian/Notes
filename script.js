let notes = [];
let trashNotes = [];

function renderNotes() {
    let contentRef = document.getElementById("content");
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
        <p> ${notes[indexNotes]} 
            <button onclick="deleteNotes(${indexNotes})">X</button> 
        </p>
    `;
}

function getHTMLTrashNotes(indexTrashNotes) {
    return `  
        <p> ${trashNotes[indexTrashNotes]} 
            <button onclick="deleteNotesFromTrash(${indexTrashNotes})">X</button> 
        </p>
    `;
}

function saveNotes() {
    let inputNotesRef = document.getElementById("inputNotes");
    notes.push(inputNotesRef.value);
    renderNotes();
}

function deleteNotes(indexNotes) {
    let deletednotes = notes.splice(indexNotes, 1);
    trashNotes.push(deletednotes[0]);
    renderNotes();
    renderTrashNotes();
}

function deleteNotesFromTrash(indexTrashNotes) {
    trashNotes.splice(indexTrashNotes, 1); 
    renderTrashNotes();
}
