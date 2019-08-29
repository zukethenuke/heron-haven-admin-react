import React, {Component} from 'react';
import MessagesService from '../services/MessagesService';
import Message from './Message';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class MailBox extends Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            messages: [],
            filteredMessages: [],
            selectedMailbox: 'Inbox',
        };
    }

    componentDidMount() {
        this.getMessages();
    }

    getMessages = async () => {
        let messages = await MessagesService.getMessages();
        this.setState({ messages });
        this.setState({ filteredMessages: this.filterMessages(this.state.selectedMailbox) })
    }
    

    handleMessageClick(selectedMessage) {
        this.setState({ selectedMessage });
    }

    handleMailboxChange = (event) => {
        let selectedMailbox = event.target.value;
        this.setState({ selectedMailbox });
        this.setState({ filteredMessages: this.filterMessages(selectedMailbox) });
        this.setState({ selectedMessage: null });

    }
    
    filterMessages = (selectedMailbox) => {
        if (selectedMailbox === 'Inbox') return this.state.messages.filter(m => !m.archived && !m.deleted);
        else if (selectedMailbox === 'Archive') return this.state.messages.filter(m => m.archived);
        else if (selectedMailbox === 'Trash') return this.state.messages.filter(m => m.deleted);
    }

    handleNoteChange = (event) => {
        let newNote = event.target.value
        let newMessage = {...this.state.selectedMessage, notes: newNote};
        this.setState({ selectedMessage: newMessage });
        this.updateMessages(newMessage);
        this.updateDB(newMessage, {notes: newNote});
    }

    toggleDeleted = () => {
        let deleted = !this.state.selectedMessage.deleted;
        let newMessage = {...this.state.selectedMessage, deleted, archived: false};
        this.setState({ selectedMessage: newMessage });
        this.updateMessages(newMessage);
        this.updateDB(newMessage, { deleted });
        this.setState({ selectedMessage: null });
    }

    toggleArchived = () => {
        let archived = !this.state.selectedMessage.archived;
        let newMessage = {...this.state.selectedMessage, archived, deleted: false};
        this.setState({ selectedMessage: newMessage });
        this.updateMessages(newMessage);
        this.updateDB(newMessage, { archived });
        this.setState({ selectedMessage: null });
    }

    updateMessages = (newMessage) => {
        let messages = [...this.state.messages];
        let index = messages.map(m => m.id).indexOf(newMessage.id);
        messages[index] = newMessage;
        this.setState({ messages });
    }

    updateDB = (message, data) => {
        let id = message.id;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            try {
                MessagesService.update(id, data).then(() => {
                    this.setState({ savingMessage: true });
                    this.setState({ filteredMessages: this.filterMessages(this.state.selectedMailbox) });
                    setTimeout(() => {
                        this.setState({ savingMessage: false });
                    }, 2000);
                });
            } catch(error) {
                this.setState({ error: error.response.data.error });
                setTimeout(() => {
                    this.setState({ error: ''});
                }, 8000);
            }
        }, 300);
    }

    render() {
        return (
            <React.Fragment>
                <div className="mailbox-header">
                    <a href="http://heron-haven.herokuapp.com" target="_blank">Heron Haven</a>
                    <h2>Contact Us Mailbox</h2>
                    <Button
                        variant="contained"
                        onClick={this.props.logout}
                        color="primary">Log Out
                    </Button>
                    {this.state.error && <span className="error">{this.state.error}</span>}
                </div>
                <div className="mailbox">
                    <div className="messages-list">
                        <div className="messages-header">
                            <Select
                                value={this.state.selectedMailbox}
                                onChange={this.handleMailboxChange}>
                                    <MenuItem value="Inbox">Inbox</MenuItem>
                                    <MenuItem value="Archive">Archive</MenuItem>
                                    <MenuItem value="Trash">Trash</MenuItem>
                            </Select>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.getMessages}>Check Messages
                            </Button>
                        </div>
                        {this.state.filteredMessages.map(message => 
                            <div
                                className={`message ${message.id === (this.state.selectedMessage && this.state.selectedMessage.id) ? 'selected' : ''}`}
                                key={message.id}
                                onClick={() => this.handleMessageClick(message)}>
                                    <p><span className="bold">First Name:</span>{message.firstName}</p>
                                    <p><span className="bold">Last Name:</span>{message.lastName}</p>
                                    <p><span className="bold">Email:</span>{message.email}</p>
                            </div>
                        )}
                    </div>
                    {this.state.selectedMessage && 
                        <Message
                            toggleDeleted={this.toggleDeleted}
                            toggleArchived={this.toggleArchived}
                            selectedMailbox={this.state.selectedMailbox}
                            selectedMessage={this.state.selectedMessage}
                            handleNoteChange={this.handleNoteChange}
                            savingMessage={this.state.savingMessage}>
                        </Message>}
                </div>
            </React.Fragment>
        )
    };
}

export default MailBox;
