import React, { Component } from 'react'
import {Chatbox} from './Chatbox'

export class Chat extends Component {
    render() {
        alert("Chat");
        return (
            <div class="row" v-if="entered">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Chatbox</div>
                        <Chatbox chats={this.props.chats}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
