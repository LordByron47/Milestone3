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
        //this.addUser = this.addUser.bind(this);
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
            //console.log("target found");
            let isAtBottom = (target.scrollHeight - target.scrollTop <= target.offsetHeight + 1); // for some reason, target.scrollTop occassionally becomes a decimal. Difference 
            //console.log("height:", target.scrollHeight, ", top:", target.scrollTop, ", offset:", target.offsetHeight);
            //console.log("isAtBottom: " + isAtBottom);
            if (isAtBottom !== this.state.scrolledToBottom) {
                //console.log("changing scrolledToBottom");
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

    /*
    // callback function used to add a new user object to this.state.allUsers
    addUser(newUser) {
        //let newAllUsers = this.state.allUsers.concat(newUser);
        this.setState((state) => {
            return { allUsers: state.allUsers.concat(newUser) }
        });
    }
    */

    /*
    //returns the current user object from allUsers[]. Returns undefined if not found
    getCurrentUser(chat) {
        return this.state.allUsers.find(user => user.user === chat.from);
    }
    */

    generateListOfUsers() {
        let listOfUsers = [...this.state.allUsers];
        //console.log("starting users: ",listOfUsers)
        this.props.chats.chats.map((chat) => {
            //console.log(chat.from);
            let currentUser = listOfUsers.find(({ user }) => user === chat.from);
            //console.log("found:",currentUser);
            if (currentUser === undefined) {
                let newColor = randomColor();
                let newUser = {
                    user: chat.from,
                    color: newColor
                };
                listOfUsers.push(newUser);
                //console.log("list of now: ",listOfUsers);
            }
            return "";
        }
        );
        if (listOfUsers.length !== this.state.allUsers.length) {
            this.setState({
                allUsers: listOfUsers
            })
        }
        return listOfUsers;
    }

    render() {
        let myChats = this.props.chats;
        let displayChats = null;

        // displays any messages present in chat
        if (!(myChats == null) && myChats.chats.length > 0) {
            //console.log(myChats.chats);
            let listOfUsers = this.generateListOfUsers();
            //console.log("list:",listOfUsers);
            displayChats = myChats.chats.map((chat, index) => {
                let currentUser = listOfUsers.find(({ user }) => user === chat.from);
                return <Message key={chat.id} contents={chat} loggedInUsername={this.props.username} prevName={this.determinePrevName(index)}
                    nextName={this.determineNextName(index)} usernameColor={currentUser.color} />
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
