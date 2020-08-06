import React, { Component } from 'react'

export class Message extends Component {
    
    render() {
        let myChat = this.props.contents;
        let displayClass = (myChat.from === this.props.username) ? "card text-right" : "card";
        
        let displayStyle={borderBottomStyle:'none'};
        let fromField = "";
        //if a sender sends multiple messages in a row, we only want the name to display for the first message
        if(this.props.prevName === myChat.from){
            fromField="";
            displayStyle.borderTopStyle='none';
        }
        else{
            fromField=myChat.from;
        }
        if(this.props.nextName === ""){
            displayStyle.borderBottomStyle='solid';
        }
        //ensure the border is displayed on the bottom of the last message

        return (
            <div className={displayClass} style={displayStyle}>
                <dt>{fromField}</dt>
                <dd>{myChat.message}</dd>
            </div>
        )
    }
}

export default Message
