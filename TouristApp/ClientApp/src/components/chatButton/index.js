import React, { Component } from 'react';

class ChatBtn extends Component {

    render() {
        return (
            <div className="email-bt">
                <div className="text-call"   onClick={this.props.toggleChatDialog}>
                    <i className="fa fa-keyboard-o" aria-hidden="true"></i>
                    <span>почати<br/>чат</span>
                </div>
            </div>
        );
    }
}

export default ChatBtn;