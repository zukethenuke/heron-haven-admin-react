import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

function Message(props) {
    let message = props.selectedMessage;
    return (
        <Card className="full-message">
            <div className="full-message-header">
                {`${message.firstName} ${message.lastName}`}
                {props.selectedMailbox === 'Inbox' && 
                    <div className="message-buttons">
                        <Button
                            className="message-button"
                            onClick={props.toggleArchived}
                            variant="contained"
                            color="primary">Archive
                        </Button>
                        <Button
                            className="message-button"
                            onClick={props.toggleDeleted}
                            variant="contained"
                            color="secondary">Delete
                        </Button>
                    </div>
                }
                {props.selectedMailbox === 'Archive' && 
                    <div className="message-buttons">
                        <Button
                            className="message-button"
                            onClick={props.toggleArchived}
                            variant="contained"
                            color="primary">Unarchive
                        </Button>
                        <Button
                            className="message-button"
                            onClick={props.toggleDeleted}
                            variant="contained"
                            color="secondary">Delete
                        </Button>
                    </div>
                }
                {props.selectedMailbox === 'Trash' && 
                    <div className="message-buttons">
                        <Button
                            className="message-button"
                            onClick={props.toggleArchived}
                            variant="contained"
                            color="primary">Archive
                        </Button>
                        <Button
                            className="message-button"
                            onClick={props.toggleDeleted}
                            variant="contained"
                            color="primary">Undelete
                        </Button>
                    </div>
                }
            </div>
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