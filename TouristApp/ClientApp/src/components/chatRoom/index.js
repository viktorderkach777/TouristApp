import React, { Component } from 'react';
import * as SignalR from '@aspnet/signalr';
import {
    Modal, ModalHeader, ModalFooter, ModalBody, 
    Input, Button, InputGroup, InputGroupAddon,
} from 'reactstrap';

class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const nick = this.props.name!=null? this.props.name:"" ;

        let hubUrl = 'http://localhost:44318/chat';
        const hubConnection = new SignalR.HubConnectionBuilder()
                    .withUrl(hubUrl)
                    .configureLogging(SignalR.LogLevel.Information)
                    .build();

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('sendToAll', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
        });
    };

    sendMessage = () => {
        this.state.hubConnection
            .invoke('sendToAll', this.state.nick, this.state.message)
            .catch(err => console.error(err));

        this.setState({ message: '' });
    };




    render() {
        return (
            <Modal isOpen={true} centered>
                <form >
                    <ModalHeader>Chat room</ModalHeader>
                    <ModalBody>
                        {/* <FormGroup>
                            <Label for="exampleText">Chat with manager</Label>
                            <Input type="textarea" name="text" id="exampleText" />
                        </FormGroup> */}
                        <div>
                            {this.state.messages.map((message, index) => (
                                <span style={{ display: 'block' }} key={index}> {message} </span>
                            ))}
                        </div>
                        <InputGroup>
                            <Input
                                placeholder=" you message ..."
                                value={this.state.message}
                                onChange={e => this.setState({ message: e.target.value })}
                            />
                            <InputGroupAddon addonType="append">
                                <Button color="primary" onClick={this.sendMessage}>Send</Button>
                            </InputGroupAddon>
                        </InputGroup>

                    </ModalBody>
                    <ModalFooter>

                        <Button color="danger" onClick={this.toggleChatDialog} >Скасувати</Button>
                    </ModalFooter>
                </form>
            </Modal>
        );
    }
}

export default ChatRoom;

