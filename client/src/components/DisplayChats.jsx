import React from 'react';
import Chat from './Chat';
import { MESSAGE_SENT_SUBSCRIPTION } from '../graphql';
import { useSubscription } from 'react-apollo';

export default function DisplayChats(props) {
    let allChats = props.chats;
    const { data: newChat } = useSubscription(MESSAGE_SENT_SUBSCRIPTION);
    // if there is a new chat, add it to the existing chats
    if (allChats !== undefined && newChat !== undefined) {
        if (allChats.chats.length === 0) {
            allChats.chats.push(newChat.messageSent);
            //console.log(allChats.chats);
        }
        else {
            const lastChat = allChats.chats[allChats.chats.length - 1];
            //ensure we don't accidentally add the last chat twice when changing colors
            if (lastChat.id !== newChat.messageSent.id) {
                allChats.chats.push(newChat.messageSent);
            }
        }
    }

    return <Chat chats={allChats} username={props.username} loggedInUserColor={props.loggedInUserColor} />
}