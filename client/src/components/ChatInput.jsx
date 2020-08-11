import React from 'react'
import { SEND_MESSAGE_MUTATION } from '../graphql';
import { useMutation } from 'react-apollo';

export default function ChatInput(props) {
    // call sendMsg to send the message to the server
    const [sendMsg,] = useMutation(SEND_MESSAGE_MUTATION);

    //store username
    const user = props.username;
    return (
        <input type='text'
            className="form-control"
            placeholder="Type your message..."
            onKeyUp={event => {
                if (event.key === 'Enter') {
                    if (event.target.value.length > 255) {
                        alert("Message must be less than 255 characters.");
                    }
                    else {
                        //send message to server
                        sendMsg({ variables: { from: user, message: event.target.value } });
                        //clear input field
                        event.target.value = "";
                    }
                }
            }} />
    )
}