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
                color: "#ffffff"
            }]
        }
        this.handleScroll = this.handleScroll.bind(this);
        this.determinePrevName = this.determinePrevName.bind(this);
        this.determineNextName = this.determineNextName.bind(this);
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
            //console.log(this.state.allUsers);
            //alert("this is a new user: "+(this.state.allUsers.includes(user => user.user === last.from) === false));
            
            // if the last message was from a new user, we need to assign them a color
            //alert(JSON.stringify(this.state.allUsers));
            /*this.state.allUsers.map(user =>{
                alert("this user: "+user.user);
                alert("username: "+this.props.username);
                alert(user.user === this.props.username);
            });
            */
           alert("here:" +this.state.allUsers.find(user => user.user === last.from));
            if ((this.state.allUsers.length>0) && (this.state.allUsers.find(user => user.user === last.from) === 'undefined')) {
                let newUsers = [...this.state.allUsers];
                const randColor = randomColor();
                const toAdd = {
                    user:last.from,
                    color:randColor
                };
                newUsers.push(toAdd);
                alert("new:" +newUsers);
                this.setState({ allUsers: newUsers });
            }
            

        }
    }

    // records when the chat window either is scrolled fully to the bottor OR when the window leaves the bottom
    handleScroll() {
        //set the chat window to scroll to the bottom when initially loaded
        let target = document.getElementById("chatDiv");
        if (target != null) {
            let isAtBottom = (target.scrollHeight - target.scrollTop === target.offsetHeight);
            if (isAtBottom !== this.state.scrolledToBottom) {
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


    render() {
        //console.log(this.state.allUsers);
        let myChats = this.props.chats;
        let displayChats = null;
        // displays any messages present in chat
        if (!(myChats == null) && myChats.chats.length > 0) {
            displayChats = myChats.chats.map((chat, index) =>
                <Message key={chat.id} contents={chat} username={this.props.username} prevName={this.determinePrevName(index)}
                    nextName={this.determineNextName(index)} displayColor={this.state.allUsers.find(user => user.user === this.props.username).color} />
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

// The below code is adapted from https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
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

    return "#"+toHex((r * 256).toFixed(0)) + toHex((g * 256).toFixed(0)) + toHex((b * 256).toFixed(0));
}

// adapted from http://www.javascripter.net/faq/rgbtohex.htm
function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16)
        + "0123456789ABCDEF".charAt(n % 16);
}