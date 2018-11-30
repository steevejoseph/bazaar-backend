import React, { Component } from 'react';

class RoomList extends Component {
    render(){
        return (
            <div className="rooms-list account">
                <ul>
                    <h4 className="font-weight-bold">Direct Messages</h4>

                    {this.props.rooms.map(room => {
                        const active = this.props.roomId === room.id ? 'active' : '';
                        return (
                            <li key={room.id} className={"room " + active}>
                                <a 
                                    onClick={() => this.props.subscribeToRoom(room.id)}
                                    href="#"
                                >
                                    {room.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default RoomList;