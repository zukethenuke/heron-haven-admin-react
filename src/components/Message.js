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
                <p><span className="bold">Name:</span>{message.firstName} {message.lastName}</p>
                <p><span className="bold">Email:</span>{message.email}</p>
                <p><span className="bold">Phone:</span>{message.phoneNumber}</p>
                <p><span className="bold">Date:</span>{new Date(message.createdAt).toDateString()}</p>
                <hr></hr>
                <p><span className="bold">Message:</span>{message.message}</p>
                <hr></hr>
                <p><span className="bold">Admin Notes:</span>{props.savingMessage && <span className="update-message">Saving!</span>}</p>
                <TextareaAutosize
                    className="notes-area"
                    rows="10"
                    value={message.notes || ''}
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