import React, { Component } from 'react'

export class Message extends Component {

    constructor(props) {
        super(props);
        this.currentColor=""; // will be set in this.obtainColor().
        this.obtainColor();
    }

    // we get passed a user object as this.props.currentUser. We need to see if that user has a color, or, if no user was found, generate a new one
    obtainColor() {
        if (this.props.currentUser === undefined) {
            const newColor = randomColor();
            const toAdd = {
                user: this.props.contents.from,
                color: newColor
            };
            this.props.addUser(toAdd);
            this.currentColor = newColor;
        }
        else {
            this.currentColor = this.props.currentUser.color;
        }

    }

    render() {
        let myChat = this.props.contents;
        // if the message was sent by the user logged in to this instance of the chat, we want it right-justified.
        let displayClass = (myChat.from === this.props.loggedInUsername) ? "card text-right" : "card";

        let displayStyle = { borderBottomStyle: 'none' };
        let fromField = "";
        //if a sender sends multiple messages in a row, we only want the name to display for the first message
        if (this.props.prevName === myChat.from) {
            //fromField = "";
            displayStyle.borderTopStyle = 'none';
        }
        else {
            fromField = myChat.from;
        }
        //ensure the border is displayed on the bottom of the last message
        if (this.props.nextName === "") {
            displayStyle.borderBottomStyle = 'solid';
        }

        //logic to ensure each username is in its own color
        //const userColor=this.obtainColor();

        return (
            <div className={displayClass} style={displayStyle}>
                <dt style={{ color: this.currentColor }}>{fromField}</dt>
                <dd>{myChat.message}</dd>
            </div>
        )
    }
}

export default Message


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
