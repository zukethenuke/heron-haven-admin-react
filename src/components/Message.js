import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function Message(props) {
    let message = props.selectedMessage;
    return (
        <Card className="full-message">
            <CardHeader 
                className="full-message-header"
                title={`${message.firstName} ${message.lastName}`}
            ></CardHeader>
            <CardContent className="card-content">
                <p>Name: {message.firstName} {message.lastName}</p>
                <p>Email: {message.email}</p>
                <p>Phone: {message.phoneNumber}</p>
                <p>Date: {new Date(message.createdAt).toDateString()}</p>
                <hr></hr>
                <p>Message: {message.message}</p>
                <hr></hr>
                <p>Admin Notes:</p>
                <TextareaAutosize
                    className="notes-area"
                    rows="10"
                    defaultValue={message.notes}
                    onChange={props.handleNoteChange}
                ></TextareaAutosize>
            </CardContent>
        </Card>
    )
}

export default Message;

// return (
//         <div className="full-message">
//             <p>Name: {message.firstName} {message.lastName}</p>
//             <p>Email: {message.email}</p>
//             <p>Phone: {message.phoneNumber}</p>
//             <p>Date: {new Date(message.createdAt).toDateString()}</p>
//         </div>
//     )