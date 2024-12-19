import React, { Component } from 'react';
import Message from './direct_messages_message';

const DATA = [
    {
        senderId: 'nini',
        text: 'Hi there'
    },
    {
        senderId: 'rando',
        text: 'oh hey'
    },
    {
        senderId: 'nini',
        text: 'ur shoes untied'
    }
]

class MessageList extends Component {

    /*componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this)
        this.shoouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    }

    componentDidUpdate() {
        if(this.shoouldScrollToBottom){
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight;
        }
        
    }
    */

    render(){
        return (
            <div>
                {this.props.messages.map((message, index) => {
                    return(
                        <Message key={index} user={message.sender.name} text={message.text} />
                    )
                })}
            </div>
        );
    }
}

export default MessageList;