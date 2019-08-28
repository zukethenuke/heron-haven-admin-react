import React, {Component} from 'react';
import MessagesService from '../services/MessagesService';
import Message from './Message';

class MailBox extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
        };
    }

    async componentDidMount() {
        let messages = await MessagesService.getMessages();
        console.log(messages);
        this.setState({ messages });
    }

    handleMessageClick(selectedMessage) {
        this.setState({ selectedMessage });
    }

    render() {
        return (
            <div className="mailbox">
                <div className="message-list">
                    <p>Mail Box, Yay!</p>
                    {this.state.messages.map(message => 
                        <div
                            className="letter"
                            key={message.id}
                            onClick={() => this.handleMessageClick(message)}>
                                {message.message}
                        </div>
                    )}
                </div>
                {this.state.selectedMessage && <Message selectedMessage={this.state.selectedMessage}></Message>}
            </div>
        )
    };
}

export default MailBox;
