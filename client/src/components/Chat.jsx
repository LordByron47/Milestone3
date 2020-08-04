import React, { Component } from 'react'
import Message from './Message'

export class Chat extends Component {

    render() {
        const chats = this.props.chats;
        //alert(JSON.stringify(chats));
        let displayChats = null;
        if (!(chats === "undefined")) {
            displayChats = Object.values(chats).map((chat) =>
                <Message contents={chat} />
            );
        }


        return (
            /*<div class="card-body">
                <dl>{displayChats}</dl>
            </div>
            */
           <p>Test</p>
        );
    }

}

export default Chat;