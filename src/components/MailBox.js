import React, {Component} from 'react';
import MessagesService from '../services/MessagesService';
import Message from './Message';
import Button from '@material-ui/core/Button';

class MailBox extends Component {
    constructor(props) {
        super();
        this.props = props;
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
        let newNote = event.target.value
        let newMessage = {...this.state.selectedMessage, notes: newNote};
        this.setState({ selectedMessage: newMessage });
        this.updateMessages(newMessage);
        this.updateDB(newNote);
    }

    updateMessages = (newMessage) => {
        let messages = [...this.state.messages];
        let index = messages.map(m => m.id).indexOf(newMessage.id);
        messages[index] = newMessage;
        this.setState({ messages });
    }

    updateDB = (newNote) => {
        let updatedNote = {notes: newNote};
        let id = this.state.selectedMessage.id;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            try {
                MessagesService.update(id, updatedNote).then(() => {
                    this.setState({ savingMessage: true });
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
                <div>
                    <h2>Contact Us Mailbox</h2>
                    <Button
                        variant="contained"
                        onClick={this.props.logout}
                        color="primary">Log Out
                    </Button>
                    {this.state.error && <span className="error">{this.state.error}</span>}
                </div>
                <div className="mailbox">
                    <div className="message-list">
                        <div className="mailbox-header">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.getMessages}>Check Messages
                            </Button>
                        </div>
                        {this.state.messages.map(message => 
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
