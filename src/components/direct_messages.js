import React, { Component} from 'react';
import MessageList from './direct_messages_message_list';
import { connect } from 'react-redux';
import SendMessage from './direct_messages_send_message';
import { getUserFromLocalStorage } from '../actions/index';
import RoomList from './direct_messages_room_list';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { instanceLocator, tokenUrl } from './direct_message_config';

class DirectMessages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            roomId: null,
            messages:[],
            joinableRooms: [],
            joinedRooms: []
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.subscribeToRoom = this.subscribeToRoom.bind(this);
    }

    componentDidMount(){

        const { roomId } = this.props.match.params;
        if(roomId)
            this.setState({ roomId });

        const chatManager = new ChatManager({
            instanceLocator: instanceLocator,
            userId: this.props.user._id,
            tokenProvider: new TokenProvider({
                url: tokenUrl
            })
        });
        
        chatManager.connect().then(currentUser => {
            this.setState({ currentUser });
            this.getRooms();
        })
        .catch(err => console.log('error on connecting', err)); 
    }

    getRooms(){
        this.state.currentUser.getJoinableRooms().then(joinableRooms => {
            this.setState({
                joinableRooms: joinableRooms,
                joinedRooms: this.state.currentUser.rooms
            });
        })
        .catch(err => console.log('error on joinableRooms: ', err));
    }

    subscribeToRoom(roomId){
        this.setState({messages:[]});

        this.state.currentUser.subscribeToRoom({
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
            this.setState({
                roomId: room.id
            })
            this.getRooms()
        })
        .catch(err => console.log('error on subscribing to room', err));
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text: text,
            roomId: this.state.roomId
        });
    }

    render(){

        return (
            <div className="direct-messages container account">
                <RoomList 
                    className="room-list-c"
                    roomId={this.state.roomId}
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} 
                />
                <div className="message-send-part">
                    <MessageList messages={this.state.messages} />
                    <SendMessage 
                        sendMessage={this.sendMessage}
                        disabled={!this.state.roomId}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return { 
        user: state.user.user
    };
}

export default connect(mapStateToProps, { getUserFromLocalStorage })(DirectMessages);