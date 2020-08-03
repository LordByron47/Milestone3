import React, { Component } from 'react'
import Chat from './Chat'

export class Chatbox extends Component {
    //username comes in as this.props.username
    render() {
        return (
            <div class="row" v-if="entered">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Chatbox</div>
                        <h6>Username: {this.props.username}</h6>
                        <Chat chats={this.props.chats} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
