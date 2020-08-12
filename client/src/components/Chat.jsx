import React, { Component } from 'react'
import Message from './Message'

export class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrolledToBottom: false,
            initialSetupComplete: false,
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.determinePrevName = this.determinePrevName.bind(this);
        this.determineNextName = this.determineNextName.bind(this);
        //used to track users and their corresponding colors. NOT in state to avoid error from settingState during renders
        this.allUsers = new Map();
        this.allUsers.set(props.username, props.loggedInUserColor);
        
    }

    /* When a new chat is rendered, scroll to the bottom if either: 
            1.) the logged-in user sent the chat
            2.) that chat window was already scrolled to the bottom
    */
    componentDidUpdate() {
        let myChats = this.props.chats;
        if (!(myChats == null) && (myChats.chats.length > 0)) {
            let last = myChats.chats[myChats.chats.length - 1];
            // if we are joining a chat with existing chats, scroll to the bottom.
            //This is needed since component mounts, then will update with a list of all the chats
            if (this.state.initialSetupComplete === false) {
                this.setState({ initialSetupComplete: true });
                this.generateListOfUsers();
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
            // for some reason, target.scrollTop occassionally becomes a decimal. Difference < 1
            let isAtBottom = (target.scrollHeight - target.scrollTop <= target.offsetHeight + 1); 
            if (isAtBottom !== this.state.scrolledToBottom) {
                this.setState(() => ({ scrolledToBottom: isAtBottom }));
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

    //used to initially generate a list of all users who have sent messages and assigns each a color
    generateListOfUsers() {
        this.props.chats.chats.forEach((chat) => {
            //check if the sender of each chat is present in this.allUsers
            if (this.allUsers.has(chat.from) === false) {
                this.allUsers.set(chat.from, randomColor());
            }
        });
    }

    /* 
    If the last chat received (which triggered an update) is from a new user, assign that user a color. 
    Also checks if the logged in user changed their color and if so, updates it accordingly
    */
    updateListOfUsers(){
        let allChats=this.props.chats.chats;
        const lastChat=allChats[allChats.length-1];
        //console.log("from:", chat.from);
        if (this.allUsers.has(lastChat.from) === false) {
            this.allUsers.set(lastChat.from, randomColor());
        }
        // check if the logged in user's color has changed
        let prevColor = this.allUsers.get(this.props.username);
        if (prevColor !== this.props.loggedInUserColor) {
            this.allUsers.set(this.props.username, this.props.loggedInUserColor);
        }

    }

    render() {
        const myChats = this.props.chats;
        let displayChats = null;

        // if there are messages in the chat
        if ((myChats !== null) && (myChats !== undefined) && myChats.chats.length > 0) {
            // refresh the list of users
            this.updateListOfUsers();
            // displays any messages present in chat
            displayChats = myChats.chats.map((chat, index) => {
                return <Message key={chat.id} contents={chat} loggedInUsername={this.props.username} prevName={this.determinePrevName(index)}
                    nextName={this.determineNextName(index)} usernameColor={this.allUsers.get(chat.from)} />
            });
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
    //console.log("scrolling");
    let target = document.getElementById("chatDiv");
    target.scrollTop = target.scrollHeight;
    //console.log("new scrollTop: ", target.scrollTop);
}

// The below code is adapted from https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
// returns a string in format "#xxxxxx" corresponding to an RGB color value
function randomColor() {
    const golden_ratio_conjugate = 0.618033988749895;
    let h = Math.random();
    h += golden_ratio_conjugate;
    h %= 1;
    return hsv_to_rgb(h, 0.5, 0.95);
}

function hsv_to_rgb(h, s, v) {
    let h_i = Number((h * 6).toFixed(0));
    let f = h * 6 - h_i
    let p = v * (1 - s)
    let q = v * (1 - f * s)
    let t = v * (1 - (1 - f) * s)
    let r, g, b;
    switch (h_i) {
        case 0:
            r = v; g = t; b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        default:    // h_i===5
            r = v; g = p; b = q;
    }

    return "#" + toHex((r * 256).toFixed(0)) + toHex((g * 256).toFixed(0)) + toHex((b * 256).toFixed(0));
}

// adapted from http://www.javascripter.net/faq/rgbtohex.htm
function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16)
        + "0123456789ABCDEF".charAt(n % 16);
}
