import React from 'react';
import styled from 'styled-components';
import ee from 'event-emitter';

const Container = styled.div`
background-color: ${props => props.color};
color: white;
padding: 16px;
border-radius: 25px;
position: absolute;
top: ${props => props.top}px;
right: 26px;
z-index: 999;
transition: top 0.5s ease;

>i {
margin-left: 8px;
}
`;


const emitter = new ee();

export const notify = (msg, color) => {
    emitter.emit('notification', msg, color, true);
}

export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            top: -200,
            message: '',
            color: '#20c997'
        }
        emitter.on('notification', (msg,color) => {
            this.showNotification(msg,color);
        });

    }
    showNotification = (msg,color) => {
        this.setState({
            top: 100,
            message: msg,
            color: color
        }, () => {
            setTimeout(() => {
                this.setState({ top: -100 });

            }, 3000);
        });
    }
    render() {
        //console.log('------- Notifications props------', this.props);
        const { top, message, color } = this.state;
        //console.log('------- Notifications top, message, color', top, message, color);
        return (
            <React.Fragment>
                    <Container top={top} color={color}>{message}<i className="fa fa-bell"></i></Container>
            </React.Fragment>
        );
    }
}
