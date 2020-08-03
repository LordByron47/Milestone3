import React, { Component } from 'react'

export class Chat extends Component {
    
    render() {
        const chats = this.props.chats;
        const displayChats = chats.map((chat) => 
            <React.Fragment key={chat.id.toString()}>
                <dt>{chat.from}</dt>
                <dd>{chat.message}</dd>
            </React.Fragment>
        );

        return (
            <div class="card-body">
                <dl>{displayChats}</dl>
            </div>
        );
    }
    
    /*
    render(){
        return (
            <React.Fragment>
                <h1>Chatbox</h1>
            </React.Fragment>
        );
    }
    */
}

export default Chat;