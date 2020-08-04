import React, { Component } from 'react'

export class Message extends Component {
    render() {
        const chat = this.props.chat;
        return (
            <React.Fragment key={chat.id.toString()}>
                <dt>{chat.from}</dt>
                <dd>{chat.message}</dd>
            </React.Fragment>
        )
    }
}

export default Message
