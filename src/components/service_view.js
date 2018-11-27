import React, { Component } from 'react';
import { connect } from 'react-redux';
import { serviceView, getUserFromLocalStorage } from '../actions/index';
import ServiceDescription from './service_description';
import Rating from './service_rating';
import CreateReview from './create_review';
import ServiceReviewsList from './service_reviews_list';
import { instanceLocator, tokenUrl } from './direct_message_config';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

class ServiceView extends Component {
    constructor(props) {
        super(props);
        this.props.getUserFromLocalStorage();

        this.state = {
            currentUser: null,
            roomId: null,
            joinedRooms: [],
            roomExists: false
        }

        this.createReviewSuccessCallback = this.createReviewSuccessCallback.bind(this);
        this.handleChatClick = this.handleChatClick.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.serviceView(id);

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

    createReviewSuccessCallback() {
        const { id } = this.props.match.params;
        this.props.serviceView(id);
    }

    overallRating (){
        var sum = 0, i;

        if(!this.props.comments) return 0;

        for (i = 0; i < this.props.comments.length; i++)
            sum += this.props.comments[i].rateing;

        return sum/this.props.comments.length;
    }

    createRoom(user1, user2, roomName){
        this.state.currentUser.createRoom({
            name: roomName,
            private: true,
            addUserIds: [`${user1}`, `${user2}`]
        })
        .then(room => {
            this.props.history.push(`/messages/${room.id}`);
        })
        .catch(err => {
            if(err.status === 400){
                console.log("User needs to be added to chatkit");
            }
        })
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

    handleChatClick(){
        
        const roomName = `${this.props.user.firstName} - ${this.props.service.name}`;

        for(var i = 0; i < this.state.joinedRooms.length; i++){
            if(this.state.joinedRooms[i].name == roomName){
                this.state.roomExists = true;
                this.props.history.push(`/messages/${this.state.joinedRooms[i].id}`);
                return;
            }   
        }

        this.createRoom(this.props.user._id, this.props.service.owner, roomName);
    }

    render() {
        if(!this.props.service)
            return <div>Sorry, this service does not exist</div>;

        return ( 
            <div className="service-view container">

                <div><h1>{this.props.service.name}</h1></div>
                <Rating overallRating={this.overallRating()} />
                <div><h4>{this.props.service.description}</h4></div>

                <div><p><i className="fa fa-user-circle fa-3x"></i></p>
                    <h6>Seller name</h6>
                    <h6>Seller email</h6>
                </div>

                <button onClick={this.handleChatClick} type="button" className="btn btn-lg btn-primary">Message Seller</button>

                <div className="review-box p-0 col-md-8">
                    <div className="review-list">
                        <ServiceReviewsList comments={this.props.comments} overallRating={this.overallRating()}/>
                    </div>
                    <div className="review-create">
                        <CreateReview successCallback={this.createReviewSuccessCallback} serviceId={this.props.service._id} />
                    </div>
                </div>

                <div className="clear">
                    <ServiceDescription service={this.props.service} />
                </div>
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return { 
        service: state.services.service,
        comments: state.services.comments,
        user: state.user.user
    };
}

export default connect(mapStateToProps, { serviceView, getUserFromLocalStorage })(ServiceView);