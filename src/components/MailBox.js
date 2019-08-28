import React, {Component} from 'react';
import MessagesService from '../services/MessagesService';
import Message from './Message';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class MailBox extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            selectedMailbox: 'Inbox',
        };
    }

    componentDidMount() {
        this.getMessages(); 
    }

    getMessages = async () => {
        let messages = await MessagesService.getMessages();
        this.setState({ messages });
    }
    

    handleMessageClick(selectedMessage) {
        this.setState({ selectedMessage });
    }

    handleMailboxChange = (event) => {
        this.setState({ selectedMailbox: event.target.value });
    }

    handleNoteChange = (event) => {
        let updatedNote = {notes: event.target.value};
        let id = this.state.selectedMessage.id;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            MessagesService.update(id, updatedNote);
        }, 500);
    }

    render() {
        return (
            <React.Fragment>
                <h2>Contact Us Mailbox</h2>
                <div className="mailbox">
                    <div className="message-list">
                        <div className="mailbox-header">
                            <Select
                                value={this.state.selectedMailbox}
                                onChange={this.handleMailboxChange}
                            >
                                <MenuItem value="Inbox">Inbox</MenuItem>
                                <MenuItem value="Archive">Archive</MenuItem>
                                <MenuItem value="Trash">Trash</MenuItem>
                            </Select>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.getMessages}>Refresh
                            </Button>
                        </div>
                        {this.state.messages.map(message => 
                            <div
                                className={`letter ${message.id === (this.state.selectedMessage && this.state.selectedMessage.id) ? 'selected' : ''}`}
                                key={message.id}
                                onClick={() => this.handleMessageClick(message)}>
                                    <p>First Name: {message.firstName}</p>
                                    <p>Last Name: {message.firstName}</p>
                                    <p>Email: {message.email}</p>
                            </div>
                        )}
                    </div>
                    {this.state.selectedMessage && <Message selectedMessage={this.state.selectedMessage} handleNoteChange={this.handleNoteChange}></Message>}
                </div>
            </React.Fragment>
        )
    };
}

export default MailBox;
