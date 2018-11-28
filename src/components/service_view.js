import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchServiceAndOwner, getUserFromLocalStorage } from '../actions/index';
import ServiceDescription from './service_description';
import Rating from './service_rating';
import CreateReview from './create_review';
import ServiceReviewsList from './service_reviews_list';
import { instanceLocator, tokenUrl } from './direct_message_config';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Markdown from 'markdown-to-jsx';
import { SyncLoader } from 'react-spinners';
import { MARKDOWN_OPTIONS } from '../constants';

const OPTIONS = [
    {
        name: "Premium",
        description: "Option's description... yeahhhhhhhhhhh cool.",
        price: 15
    },
    {
        name: "Standard",
        description: "Option's description... yeahhhhhhhhhhh cool.",
        price: 10
    },
    {
        name: "Basic",
        description: "Option's description... yeahhhhhhhhhhh cool.",
        price: 5
    }
]

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
        this.renderOptionTabs = this.renderOptionTabs.bind(this);
        this.renderOptionContent = this.renderOptionContent.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchServiceAndOwner(id);

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
        this.props.fetchServiceAndOwner(id);
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

    renderServiceReviews() {
        return(
            <div className="review-list">
                <ServiceReviewsList 
                    comments={this.props.comments} 
                    overallRating={this.overallRating()}
                    starColor={'rgb(0, 132, 137)'}
                    />
            </div>
        );
    }

    renderCreateReview() {
        return (
            <div className="review-create">
                <CreateReview 
                    successCallback={this.createReviewSuccessCallback} 
                    serviceId={this.props.service._id} 
                    starColor={'rgb(0, 132, 137)'}
                    />
            </div>
        );
    }

    renderOptionTabs() {
        return _.map(OPTIONS, option => {
            return (
                <a className="nav-item nav-link" id={'nav-' + option.name + '-tab'} data-toggle="tab" role="tab" aria-controls={'nav' + option.name} aria-selected="true" href={'#'+option.name+'-tab'}>{option.name}</a>
            );
        });
    }

    renderOptionContent() {
        return _.map(OPTIONS, option => {
            return (
                <div className="tab-pane fade show active" id={'nav-'+option.name} role="tabpanel" aria-labelledby={option.name + option.price}>
                    {option.description}
                </div>
            );
        });
    }

    renderOptions() {
        return(
            <div className="options text-center text-muted p-0">
                <nav>
                    <div className="option-tabs nav nav-tabs text-center nav-justified" id="nav-tab" role="tablist">
                        {this.renderOptionTabs()}
                    </div>
                </nav>
                <div className="option-info tab-content p-3" id="nav-tabContent">
                    {this.renderOptionContent()}
                </div>
            </div>
        );
    }

    renderOwner() {
        const serviceOwner = this.props.service.owner;
        const loggedInUserIsOwner = this.props.user && (serviceOwner === this.props.user._id);

        return(
            <div className="owner text-center text-muted p-3">
                <p className="av"><i className="fa fa-user-circle fa-3x"></i></p>
                <p className="ownerName">{`${this.props.serviceOwner.firstName} ${this.props.serviceOwner.lastName}`}</p>
                <a className="email" href={`mailto:${this.props.serviceOwner.email}`}>{this.props.serviceOwner.email}</a>
                <div>
                    {this.props.loggedIn && !loggedInUserIsOwner && 
                        <button onClick={this.handleChatClick} type="button" className="btn btn-outline-primary btn-sm">Message Seller</button>
                    }
                </div>
                </div>
        );

    }

    render() {
        const { id } = this.props.match.params;

        if (!this.props.service || this.props.service._id != id)         
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

        const serviceOwner = this.props.service.owner;
        const loggedInUserIsOwner = this.props.user && (serviceOwner === this.props.user._id);
        
        return ( 
            <div className="service-view container">

                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="service-info">
                                <img className="card-img-top cursor" onClick={this.openServiceView} src="https://dummyimage.com/1200x780/bfb/aab" alt="Card image" />
                                <div className="service-header">
                                    <h1 className="title">{this.props.service.name}</h1>                            
                                    <h6 className="category mb-2 text-muted">{this.props.service.tags.length > 0 ? this.props.service.tags[0].toUpperCase() : ''}</h6>
                                    <h6 className="price card-subtitle mb-2 text-success ">${this.props.service.price} per service</h6>
                                </div>
                                <Markdown 
                                    options={MARKDOWN_OPTIONS}
                                    className="service-description py-3"
                                    >
                                    {this.props.service.description}
                                </Markdown>
                            </div>
                        </div>

                        <div className="col px-1">
                            <div className="options-and-owner sticky-top px-2">
                                {this.renderOptions()}
                                <div className="p-3" />
                                {this.props.serviceOwner && this.renderOwner()}
                            </div>
                        </div>
                    </div>

                    
                    <div className="reviews col-md-8 p-0 pt-3">
                        <Rating 
                            starColor={'rgb(0, 132, 137)'}
                            overallRating={this.overallRating()} 
                            />
                        {this.renderServiceReviews()}
                        {this.props.loggedIn && !loggedInUserIsOwner && this.renderCreateReview()}
                    </div>

                <div className="p-5" />
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return { 
        user: state.user.user,
        loggedIn: state.user.loggedIn,
        service: state.services.service,
        comments: state.services.comments,
        user: state.user.user,
        serviceOwner: state.user.serviceOwner,
    };
}

export default connect(mapStateToProps, { fetchServiceAndOwner, getUserFromLocalStorage })(ServiceView);

