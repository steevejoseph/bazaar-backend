import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchServiceAndOwner, connectChat, sendMessage, createRoom} from '../actions/index';
import ServiceDescription from './service_description';
import Rating from './service_rating';
import CreateReview from './create_review';
import ServiceReviewsList from './service_reviews_list';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import Markdown from 'markdown-to-jsx';
import { SyncLoader } from 'react-spinners';
import { MARKDOWN_OPTIONS } from '../constants';

const OPTIONS = [
    {
        name: "Starter",
        description: "2 concepts to choose from with high resolution jpeg simple logos only.",
        price: 10
    },
    {
        name: "Standard",
        description: "3 concepts to choose from with HD jpeg and transparent background.",
        price: 25
    },
    {
        name: "Super",
        description: "3 concepts to choose from with all files, 3d mockup, unlimited revisions and fast delivery.",
        price: 50
    }
]

class ServiceView extends Component {
    constructor(props) {
        super(props);

        this.createReviewSuccessCallback = this.createReviewSuccessCallback.bind(this);
        this.handleChatClick = this.handleChatClick.bind(this);
        this.renderOptionTabs = this.renderOptionTabs.bind(this);
        this.renderOptionContent = this.renderOptionContent.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchServiceAndOwner(id);

        if(this.props.loggedIn)
            this.props.connectChat(this.props.user._id);
    }

    componentDidUpdate(){
        if(this.props.loggedIn)
            this.props.connectChat(this.props.user._id);
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

    handleChatClick(){

        if(!this.props.loggedIn) return;

        const roomName = `${this.props.user.firstName} - ${this.props.service.name}`;

        for(var i = 0; i < this.props.currentUser.rooms.length; i++){
            if(this.props.currentUser.rooms[i].name == roomName){
                this.props.history.push(`/messages/${this.props.currentUser.rooms[i].id}`);
                return;
            }
        }

        this.props.createRoom(this.props.currentUser, this.props.service.owner, roomName);
        this.props.history.push(`/messages`);
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
        var i = 0;

        return _.map(OPTIONS, option => {
            return (
                <a 
                    className={`nav-item nav-link ${i++ == 0 ? 'active' : ''}`} 
                    id={`tab-${option.name}`} 
                    data-toggle="tab" 
                    role="tab" 
                    aria-controls={`${option.name}`} 
                    aria-selected={`nav-item nav-link ${i++ == 0 ? 'true' : 'false'}`} 
                    href={`#${option.name}`}
                    >
                    {option.name}
                </a>
            );
        });
    }

    renderOptionContent() {
        var i = 0;
        const serviceOwner = this.props.service.owner;
        const loggedInUserIsOwner = this.props.user && (serviceOwner === this.props.user._id);

        return _.map(OPTIONS, option => {
            return (
                <div 
                    className={`tab-pane ${i++ == 0 ? 'show active' : ''}`} 
                    id={option.name} 
                    role="tabpanel" 
                    aria-labelledby={`tab-${option.name}`} 
                    >
                        <p>{option.description}</p>
                        {this.props.loggedIn && !loggedInUserIsOwner ? (
                            <button 
                            onClick={this.handleChatClick} 
                            type="button" 
                            className="btn btn-outline-success btn-block"
                            >
                                Continue (${option.price})
                            </button>
                        ) : (
                            <button 
                            onClick={this.handleChatClick} 
                            type="button" 
                            className="btn btn-outline-success btn-block"
                            disabled
                            >
                                Continue (${option.price})
                            </button>
                        )}

                </div>
            );
        });
    }

    renderOptions() {
        return(
            <div className="options text-muted">
                <nav>
                    <div className="option-tabs nav nav-tabs text-center nav-justified" id="nav-tab" role="tablist">
                        {this.renderOptionTabs()}
                    </div>
                </nav>
                <div className="option-info tab-content p-3 px-4" id="nav-tabContent">
                    {this.renderOptionContent()}
                </div>
            </div>
        );
    }

    renderOwner() {
        const serviceOwner = this.props.service.owner;
        const loggedInUserIsOwner = this.props.user && (serviceOwner === this.props.user._id);

        return(
            <div className="owner text-muted p-3 text-center">
                        <p className="av">
                            <i className="fa fa-user-circle fa-3x"></i>
                        </p>
                        <p className="owner-name">
                            {`${this.props.serviceOwner.firstName} ${this.props.serviceOwner.lastName}`}
                        </p>
                        <a className="email" href={`mailto:${this.props.serviceOwner.email}`}>
                            {this.props.serviceOwner.email}
                        </a>
                <div>
                    {this.props.loggedIn && !loggedInUserIsOwner && 
                        this.props.loggedIn ? (
                            <button 
                                onClick={this.handleChatClick} 
                                type="button" 
                                className="btn btn-outline-primary btn-block mt-2"
                                >
                                Message Seller
                            </button>
                        ) : (
                            <button 
                            onClick={this.handleChatClick} 
                            type="button" 
                            className="btn btn-outline-primary btn-block mt-2"
                            disabled
                            >
                                Message Seller
                            </button>
                        )
                    }
                </div>
            </div>
        );
    }

    createReviewSuccessCallback() {
        const { id } = this.props.match.params;
        this.props.serviceView(id);
    }

    overallRating (){
        var sum = 0, i;

        if(!this.props.comments)
            return 0;

        for (i = 0; i < this.props.comments.length; i++){
            sum += this.props.comments[i].rateing;
        }

        return sum/this.props.comments.length;
    }

    render() {
        const { id } = this.props.match.params;

        if (!this.props.service || !this.props.serviceOwner || this.props.service._id != id)        
            return (
                <div className="service-view container text-center">
                    <SyncLoader 
                        className="loader"
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
                                {this.renderOwner()}
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
        serviceOwner: state.user.serviceOwner,
        currentUser: state.user.currentUser,
        joinableRooms: state.user.joinableRooms,
        createdRoom: state.user.createdRoom
    };
}

export default connect(mapStateToProps, { fetchServiceAndOwner, connectChat, createRoom})(ServiceView);