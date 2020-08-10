import React, { Component } from 'react'
import Message from './Message'

export class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrolledToBottom: false,
            initialSetupComplete: false,
            allUsers: [{
                user: props.username,
                color: "#000000"
            }]
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.determinePrevName = this.determinePrevName.bind(this);
        this.determineNextName = this.determineNextName.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    // scroll to the bottom of the chat when you first log in
    componentDidMount() {
        scrollTheDiv();
    }

    /* When a new chat is rendered, scroll to the bottom if either: 
            1.) the logged-in user sent the chat
            2.) that chat window was already scrolled to the bottom
    */
    componentDidUpdate() {
        let myChats = this.props.chats;
        if (!(myChats == null) && (myChats.chats.length > 0)) {
            let last = myChats.chats[myChats.chats.length - 1];
            // if we are joining a chat with existing chats, scroll to the bottom
            if (this.state.initialSetupComplete === false) {
                this.setState({ initialSetupComplete: true });
                scrollTheDiv();
            }
            // if the logged in user sent the last chat OR was already scrolled to the bottom, scroll
            else if (last.from === this.props.username || this.state.scrolledToBottom === true) {
                scrollTheDiv();
            }
        }
    }

    // records when the chat window either is scrolled fully to the bottor OR when the window leaves the bottom
    handleScroll() {
        //set the chat window to scroll to the bottom when initially loaded
        let target = document.getElementById("chatDiv");
        if (target != null) {
            console.log("target found");
            let isAtBottom = (target.scrollHeight - target.scrollTop === target.offsetHeight);
            if (isAtBottom !== this.state.scrolledToBottom) {
                console.log("isAtBottom: " + isAtBottom);
                this.setState({ scrolledToBottom: isAtBottom });
            }
        }
    }

    //contains the logic to determine the sender of the message BEFORE chats[index]. Returns "" if first message
    determinePrevName(index) {
        if (index === 0) {
            return "";
        }
        else {
            return this.props.chats.chats[index - 1].from;
        }
    }

    //contains the logic to determine the sender of the message AFTER chats[index]. Returns "" if last message
    determineNextName(index) {
        if (index === (this.props.chats.chats.length - 1)) {
            return "";
        }
        else {
            return this.props.chats.chats[index + 1].from;
        }
    }

    // callback function used to add a new user object to this.state.allUsers
    addUser(newUser) {
        let newAllUsers = this.state.allUsers.concat(newUser);
        this.setState({
            allUsers: newAllUsers
        });
    }

    //returns the current user object from allUsers[]. Returns undefined if not found
    getCurrentUser(chat) {
        return this.state.allUsers.find(user => user.user === chat.from);
    }

    render() {
        let myChats = this.props.chats;
        let displayChats = null;
        // displays any messages present in chat
        if (!(myChats == null) && myChats.chats.length > 0) {
            displayChats = myChats.chats.map((chat, index) =>
                <Message key={chat.id} contents={chat} loggedInUsername={this.props.username} prevName={this.determinePrevName(index)}
                    nextName={this.determineNextName(index)} currentUser={this.getCurrentUser(chat)} addUser={this.addUser} />
            );
        }

        return (
            <div id="chatDiv" className="card-body" style={{ overflowY: "auto", maxHeight: '500px' }} onScroll={this.handleScroll}>
                <dl>{displayChats}</dl>
            </div>
        );
    }
}

export default Chat;

// scrolls to the bottom of the chatbox
function scrollTheDiv() {
    let target = document.getElementById("chatDiv");
    target.scrollTop = target.scrollHeight;
}