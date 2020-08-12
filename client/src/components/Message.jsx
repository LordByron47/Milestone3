import React from 'react'

//renders an individual message
export default function Message(props) {

    let myChat = props.contents;

    let displayStyle = { borderBottomStyle: 'none' };
    let fromField = null;
    // If a sender sends multiple messages in a row, we only want the name to display for the first message
    // Also, the border should be around a block of Messages from the same person. We don't want horizontal lines within a block.
    if (props.prevName === myChat.from) {
        displayStyle.borderTopStyle = 'none';
    }
    else {
        fromField = myChat.from;
    }
    //ensure the border is displayed on the bottom of the last message
    if (props.nextName === "") {
        displayStyle.borderBottomStyle = 'solid';
    }

    // if the message was sent by the user logged in to this instance of the chat, we want it right-justified.
    let displayClass = (myChat.from === props.loggedInUsername) ? "card text-right" : "card";

    return (
        <div className={displayClass} style={displayStyle}>
            <dt style={{ color: props.usernameColor }}>{fromField}</dt>
            <dd>{myChat.message}</dd>
        </div>
    )
}