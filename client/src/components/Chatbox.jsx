import React, { Component } from 'react'

export class Chatbox extends Component {
    /*
    render() {
        chats = this.props.chats;
        displayChats = chats.map((chat) => {
            <React.Fragment>
                <dt>{chat.from}</dt>
                <dd>{chat.message}</dd>
            </React.Fragment>
        });

        return (
            <div class="card-body">
                <dl>{displayChats}</dl>
            </div>
        );
    }
    */

    render(){
        return (
            <React.Fragment>
                <h1>Chatbox</h1>
            </React.Fragment>
        );
    }
}

export default Chatbox;