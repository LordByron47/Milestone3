import React, { Component } from 'react'
import { CHATS_QUERY, SEND_MESSAGE_MUTATION } from '@/graphql';



export class Message extends Component {

    // add these inside methods
    async sendMessage() {
        const message = this.message;
        this.message = '';

        await this.$apollo.mutate({
            mutation: SEND_MESSAGE_MUTATION,
            variables: {
                from: this.username,
                message,
            },
        });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    render() {
        return (
            <React.Fragment>
                <input
                    type='text'
                    class="form-control"
                    placeholder="Type your message..."
                    v-model="message"
                    onKeyPress={this.handleKeyPress} />
            </React.Fragment>
        )
    }
}

export default Message
