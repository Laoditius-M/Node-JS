// Require modules
const yargs = require('yargs');
const notes = require('./notes.js');

// Add a note command
yargs.command({
    command: 'add',
    describe: 'Add your note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
})

// Remove a note command
yargs.command({
    command: 'remove',
    describe: 'Remove your note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

// Read a note
yargs.command({
    command: 'read',
    describe: 'Read your note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

// List notes
yargs.command( {
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes();
    }
})

// Execute yargs commands
yargs.parse();