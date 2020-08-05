import React, { Component } from 'react'
import Message from './Message'

export class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrolledToBottom: false,
            initialSetupComplete:false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidUpdate() {
        //alert("prev: "+JSON.stringify(prevState));
        //alert("current: "+JSON.stringify(this.state));
        //alert("update:" + this.state.scrolledToBottom);
        //alert('update');
        let myChats = this.props.chats;
        if (!(myChats == null) && (myChats.chats.length > 0)) {
            let last = myChats.chats[myChats.chats.length - 1];
            // if we are joining a chat with existing chats, scroll to the bottom
            if(this.state.initialSetupComplete === false){
                //alert('initial');
                //this.state.initialSetupComplete = true;
                this.setState({initialSetupComplete:true});
                this.scrollTheDiv();
            }
            // if the logged in user sent the last chat OR was already scrolled to the bottom, scroll
            else if (last.from === this.props.username || this.state.scrolledToBottom === true) {
                this.scrollTheDiv();
            }
        }
    }

    scrollTheDiv(){
        let target = document.getElementById("chatDiv");
        target.scrollTop = target.scrollHeight;
    }

    handleScroll() {
        //set the chat window to scroll to the bottom when initially loaded
        let target = document.getElementById("chatDiv");
        if (target != null) {
            let isAtBottom = (target.scrollHeight - target.scrollTop === target.offsetHeight);
            if (isAtBottom !== this.state.scrolledToBottom) {
                //alert("handle -- old: " + this.state.scrolledToBottom + ", new: " + isAtBottom);
                this.setState({ scrolledToBottom: isAtBottom });
            }
        }

    }

    componentDidMount() {
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
            <div id="chatDiv" class="card-body" style={{ overflowY: "auto", maxHeight: '500px' }} onScroll={this.handleScroll}>
                <dl>{displayChats}</dl>
            </div>
        );
    }
}

export default Chat;