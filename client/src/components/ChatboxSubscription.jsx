import React from 'react';
import ChatboxRCE from './ChatboxRCE';
import { CHATS_QUERY } from '../graphql';
import { useQuery } from 'react-apollo';

// useQuery() requires a function, not a Component. This just gets allChats and calls a Component to render everything
export default function ChatboxSubscription(props) {
    var { data: allChats } = useQuery(CHATS_QUERY);

    return (
        <ChatboxRCE chats={allChats} username={props.username} />
    )
}