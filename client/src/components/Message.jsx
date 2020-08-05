import React, { Component } from 'react'

export class Message extends Component {
    
    render() {
        let myChat = this.props.contents;
        let displayClass = (myChat.from === this.props.username) ? "card text-right" : "card";
        return (
            <div key={myChat.id.toString()} class={displayClass}>
                <dt>{myChat.from}</dt>
                <dd>{myChat.message}</dd>
            </div>
        )
    }
}

export default Message
