import React, { Component } from 'react';

class ChatBtn extends Component {
    state = {}
    render() {
        return (
            <div class="email-bt">
                <div class="text-call">
                    <i class="fa fa-keyboard-o" aria-hidden="true"></i>
                    <span>почати<br/>чат</span>
                </div>
            </div>
        );
    }
}

export default ChatBtn;