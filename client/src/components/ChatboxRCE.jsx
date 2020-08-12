import React, { Component } from 'react'
import ColorSelector from './ColorSelector';
import DisplayChats from './DisplayChats';
import ChatInput from './ChatInput';

// Called by ChatboxSubscription to actually handle rendering the various elements of the Chatbox
class ChatboxRCE extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userColor: '#000000'
        }
        this.setUserColor = this.setUserColor.bind(this);
    }

    setUserColor(event) {
        //don't let the username be white
        if (event.target.value !== '#ffffff') {
            this.setState({
                userColor: event.target.value
            });
            //alert(event.target.value);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h4>Welcome, {this.props.username}</h4>
                    <div className="card">
                        <div id="chatBoxHeader" className="card-header" style={{ backgroundColor: "#8ec5fc", fontSize: '20px', padding: '6px 20px' }}>Chatbox
                            <ColorSelector changeColor={this.setUserColor} currentColor={this.state.userColor} />
                        </div>
                        <DisplayChats chats={this.props.chats} username={this.props.username} loggedInUserColor={this.state.userColor} />
                        <ChatInput username={this.props.username} />
                    </div>
                </div>
            </div >
        )
    }
}

export default ChatboxRCE