import React, { Component } from 'react'

export class Message extends Component {

    /*
    // we get passed a user object as this.props.currentUser. We need to see if that user has a color, or, if no user was found, generate a new one
    obtainColor() {
        if (this.props.currentUser === undefined) {
            const newColor = randomColor();
            const toAdd = {
                user: this.props.contents.from,
                color: newColor
            };
            //this.props.addUser(toAdd);
            this.currentColor = newColor;
        }
        else {
            this.currentColor = this.props.currentUser.color;
        }

    }
    */

    render() {
        let myChat = this.props.contents;
        // if the message was sent by the user logged in to this instance of the chat, we want it right-justified.
        let displayClass = (myChat.from === this.props.loggedInUsername) ? "card text-right" : "card";

        let displayStyle = { borderBottomStyle: 'none' };
        let fromField = "";
        //if a sender sends multiple messages in a row, we only want the name to display for the first message
        if (this.props.prevName === myChat.from) {
            //fromField = "";
            displayStyle.borderTopStyle = 'none';
        }
        else {
            fromField = myChat.from;
        }
        //ensure the border is displayed on the bottom of the last message
        if (this.props.nextName === "") {
            displayStyle.borderBottomStyle = 'solid';
        }

        //logic to ensure each username is in its own color
        //const userColor=this.obtainColor();

        return (
            <div className={displayClass} style={displayStyle}>
                <dt style={{ color: this.props.usernameColor }}>{fromField}</dt>
                <dd>{myChat.message}</dd>
            </div>
        )
    }
}

export default Message