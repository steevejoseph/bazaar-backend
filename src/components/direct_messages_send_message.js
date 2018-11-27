import React, { Component } from 'react';

class SendMessage extends Component {

    constructor(props){

        super(props);
        this.state = {
            message: ''
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputChange(message){
        this.setState({ message });
    }

    handleSubmit(values){
        values.preventDefault();
        this.props.sendMessage(this.state.message)
        this.setState({ message: ''});
    }

    render() {
        return (
            <form   
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    disabled={this.props.disabled}
                    onChange={(event) => this.onInputChange(event.target.value)}
                    value={this.state.message}
                    placeholder="Send Message..."
                    type="text"
                />
            </form>
        );
    }
}

export default SendMessage;