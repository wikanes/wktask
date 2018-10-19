import React, { Component } from "react";
import Note from "./components/note";
import NoteForm from "./components/noteform";
import { DB_CONFIG } from "./config/config";
import firebase from "firebase/app";
import "firebase/database";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.saveNote = this.saveNote.bind(this);

    try {
      this.app = firebase.initializeApp(DB_CONFIG);
    } catch (err) {
      // we skip the "already exists" message which is
      // not an actual error when we're hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error", err.stack);
      }
      this.app = firebase;
    }

    this.db = this.app
      .database()
      .ref()
      .child("notes");

    //We are goin to setupo the react state of our component
    this.state = {
      notes: [
        //{ id: 1, noteContent: "Hello I am first" },
        //{ id: 2, noteContent: "Hello I am second" },
      ]
    };
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentDidMount() {
    const prvNotes = this.state.notes;

    this.db.on("child_added", snap => {
      prvNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
        noteHeader: snap.val().noteHeader
      });
      this.setState({ notes: prvNotes });
    });

    this.db.on("child_removed", snap => {
      for (var i = 0; i < prvNotes.length; i++) {
        if (prvNotes[i].id === snap.key) {
          prvNotes.splice(i, 1);
        }
      }
      this.setState({ notes: prvNotes });
    });
  }

  addNote(note, noteName) {
    this.db.push().set({ noteContent: note, noteHeader: noteName });
  }

  removeNote(noteId) {
    //console.log("from the parent: " + noteId);
    this.db.child(noteId).remove();
  }

  saveNote(noteId, note, noteName) {
    console.log("About to save note: " + noteName);
    this.db.child(noteId).set({ noteContent: note, noteHeader: noteName });
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading>">Wika Task Board</div>
        </div>
        <div className="notesBodyWrapper">
          <div className="notesBody">
            {this.state.notes.map(note => {
              return (
                <Note
                  noteContent={note.noteContent}
                  noteID={note.id}
                  noteHeader={note.noteHeader}
                  key={note.id}
                  removeNote={this.removeNote}
                  saveNote={this.saveNote}
                />
              );
            })}
          </div>
          <div className="sideMenu">
            <button className="mymenu btn btn-sm btn-outline-light">
              New Note
            </button>
            <NoteForm addNote={this.addNote} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
