// Require modules
const fs = require('fs');
const chalk = require('chalk');
const fileName = 'note.json';

// Add a note
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find( (note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title,
            body
        })
        saveNote(notes);
        console.log(chalk.green.inverse('Noted added'));
    }else {
        console.log(chalk.red.inverse('Note title taken'));
    }
}

// Remove a note
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter( note => note.title !== title);

    if (notesToKeep.length < notes.length) {
        saveNote(notesToKeep);
        console.log(chalk.green.inverse('Note removed'));
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
}

// Read a note
const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find( note => note.title === title);
    console.log(`Note: ${note}`);

    if (note) {
        console.log(`${chalk.inverse(note.title)}\n${note.body}`);
    } else {
        console.log(`${chalk.red.inverse.bold('Note not found')}`);
    }
}

// List notes
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blueBright.inverse('Your notes'));

    notes.forEach( (note) => console.log(`\n${chalk.blueBright(note.title)}\n${chalk.blueBright(note.body)}`));
}

// Retrieve notes from notes.json file
const loadNotes = () => {
    try {
        const notes = fs.readFileSync(fileName, 'utf-8');
        const notesObj = JSON.parse(notes);
        return notesObj;
    } catch (error) {
        return [];
    }
}

// Save notes into notes.json file
const saveNote = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync(fileName, notesJSON);
}

module.exports = {
    addNote,
    removeNote,
    readNote,
    listNotes,
    loadNotes
}