import React from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput';
import { CHATS_QUERY, MESSAGE_SENT_SUBSCRIPTION } from '../graphql';
import { useQuery, useSubscription } from 'react-apollo';

export default function Chatbox(props) {
    var { data: allChats } = useQuery(CHATS_QUERY);
    
    return (
        <div class="row">
            <div class="col-md-12">
                <h4>Welcome, {props.username}</h4>
                <div class="card">
                    <div class="card-header">Chatbox</div>
                    <DisplayChats chats={allChats} username={props.username}/>
                    <ChatInput username={props.username} />
                </div>
            </div>
        </div>
    )
}

function DisplayChats(props){
    let allChats = props.chats;
    const { data: newChat } = useSubscription(MESSAGE_SENT_SUBSCRIPTION);
    if(allChats != null && newChat != null){
        allChats.chats.push(newChat.messageSent);
    }

    return <Chat chats={allChats} username={props.username}/>
}