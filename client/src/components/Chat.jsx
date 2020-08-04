import React, { Component } from 'react'
import Message from './Message'

export class Chat extends Component {

    render() {
        let myChats = this.props.chats;

        let displayChats = null;

        if (!(myChats == null) && myChats.chats.length > 0) {
            displayChats = myChats.chats.map((chat) =>
                <Message contents={chat} username={this.props.username}/>
            );
        }

        return (
            <div class="card-body">
                <dl>{displayChats}</dl>
            </div>
        );
    }
}

export default Chat;