import React, { Component} from 'react';
import MessageList from './direct_messages_message_list';
import { connect } from 'react-redux';
import SendMessage from './direct_messages_send_message';
import RoomList from './direct_messages_room_list';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { instanceLocator, tokenUrl } from './direct_message_config';
import { connectChat, fetchJoinableRooms} from '../actions/index';
import { SyncLoader } from 'react-spinners';

class DirectMessages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roomId: null,
            messages:[]
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
    }

    componentDidMount(){

        const { roomId } = this.props.match.params;
        if (roomId)
            this.setState({ roomId });

        this.props.connectChat(this.props.user._id);
    }

    subscribeToRoom(roomId){
        this.setState({messages:[]});

        this.props.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {
                onMessage: message => {
                    this.setState({
                        messages: [...this.state.messages, message]
                    });
                }
            }
        })
        .then(room => {
            this.setState({ roomId: room.id })
        })
        .catch(err => console.log('error on subscribing to room', err));
    }

    sendMessage(text) {
        this.props.currentUser.sendMessage({
            text: text,
            roomId: this.state.roomId
        });
    }

    render(){

        if(!this.props.currentUser)
            return (
                <div className="service-view container text-center">
                    <SyncLoader
                        className="p-5"
                        sizeUnit={"px"}
                        size={15}
                        margin={'5px'}
                        color={'rgb(0, 132, 137)'}
                        />
                </div>
            );

        return (
            <div className="direct-messages container account row">
                <RoomList
                    className="room-list-c col"
                    roomId={this.state.roomId}
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={this.props.currentUser.rooms}
                />
                <div className="message-send-part col">
                    <MessageList messages={this.state.messages} />
                    <SendMessage
                        sendMessage={this.sendMessage}
                        currentUser={this.props.currentUser}
                        roomId={this.state.roomId}
                        disabled={!this.state.roomId}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return {
        user: state.user.user,
        currentUser: state.user.currentUser,
        joinableRooms: state.user.joinableRooms
    };
}

export default connect(mapStateToProps, { connectChat })(DirectMessages);
