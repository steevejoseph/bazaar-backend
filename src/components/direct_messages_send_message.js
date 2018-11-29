import React, { Component } from 'react';

class SendMessage extends Component {

    constructor(props){

        super(props);
        this.state = {
            message: '',
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputChange(message){
        console.log("1");
        this.setState({ message });
        console.log("2");
    }

    handleSubmit(values){
        if(this.state.message == '') return;

        values.preventDefault();
        this.props.sendMessage(this.state.message);
        console.log("3");
        this.setState({ message: ''});

        console.log("4");
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
