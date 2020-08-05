import React, { Component } from 'react'
import Message from './Message'

export class Chat extends Component {

    componentDidUpdate() {
        let target = document.getElementById("chatDiv");
        target.scrollTop = target.scrollHeight;
    }

    render() {

        let myChats = this.props.chats;

        let displayChats = null;

        if (!(myChats == null) && myChats.chats.length > 0) {
            displayChats = myChats.chats.map((chat) =>
                <Message contents={chat} username={this.props.username} />
            );
        }

        return (
            <div id="chatDiv" class="card-body" style={{ overflowY: "auto", maxHeight: '500px' }}>
                <dl>{displayChats}</dl>
            </div>
        );
    }
}

export default Chat;

/*
//used to scroll chat window
const myRef = createRef();
//put as attribute in a tag
ref={myRef}
//call this to scroll
window.scrollTo(0, myRef.current.offsetTop)
//in the above, replace window with the current

*/