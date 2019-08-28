import React from 'react';

function Message(props) {
    return (
        <p>My Message {props.selectedMessage.message}</p>
    )
}

export default Message;
