import React, { Component } from "react";
import PropTypes from "prop-types";
import InlineEdit from "react-edit-inline";
import "./note.css";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteID = props.noteID;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.noteChanged = this.noteChanged.bind(this);
  }

  handleRemoveNote(id) {
    this.props.removeNote(id);
  }

  noteChanged(data) {
    // data = { description: "New validated text comes here" }
    // Update your model from here
    // console.log(data);
    this.setState({ noteContent: data });
  }

  customValidateText(text) {
    return text.length > 0 && text.length < 4000;
  }

  state = {};
  render(props) {
    return (
      <div className="card note fade-in">
        <div className="card-header noteHeader">
          <span>Task Header</span>
          &nbsp;
          <button
            className="closebtn"
            onClick={() => this.handleRemoveNote(this.noteID)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
              <path d="M3 0c-.55 0-1 .45-1 1h-1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1h-1c0-.55-.45-1-1-1h-1zm-2 3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19v-4.81h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1z" />
            </svg>
          </button>
          <button
            className="editbtn"
            onClick={() => this.handleRemoveNote(this.noteID)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z" />
            </svg>
          </button>
        </div>

        <InlineEdit
          className="card-text noteContent"
          text={this.noteContent}
          paramName="message"
          activeClassName="editing"
          validate={this.customValidateText}
          change={this.noteChanged}
        />
      </div>
    );
  }
}

Note.PropTypes = {
  noteContent: PropTypes.string
};

export default Note;
