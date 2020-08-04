import React from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput';
import { CHATS_QUERY, MESSAGE_SENT_SUBSCRIPTION } from '../graphql';
import { useQuery, useSubscription } from 'react-apollo';

export default function Chatbox(props) {
    const { data: oldChats } = useQuery(CHATS_QUERY);
    const {data:newChat} = useSubscription(MESSAGE_SENT_SUBSCRIPTION);
    let allChats = {...oldChats, ...newChat};
    return (
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Chatbox</div>
                    <Chat chats={allChats} />
                    <ChatInput username={props.username}/>
                </div>
            </div>
        </div>
    )

}