import React, { Component } from "react";
import "./noteform.css";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.recordNote = this.recordNote.bind(this);
  }

  //When user input, set the newNoteContent to the value from input box.
  handleInput(e) {
    this.setState({
      newNoteContent: e.target.value //the value of text input
    });
  }

  recordNote() {
    //Call a method to add new note
    this.props.addNote(this.state.newNoteContent);

    //Clear content in input box
    this.setState({
      newNoteContent: ""
    });
  }

  render() {
    return (
      <div className="formWrapper">
        <input
          className="noteInput"
          placeholder="Write a new note....."
          value={this.state.newNoteContent}
          onChange={this.handleInput}
        />
        <button className="noteButton" onClick={this.recordNote}>
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
