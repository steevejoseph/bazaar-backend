import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchServiceAndOwner, connectChat, createRoom, addFavorite } from '../actions/index';
import Rating from './service_rating';
import CreateReview from './create_review';
import ServiceReviewsList from './service_reviews_list';
import Markdown from 'markdown-to-jsx';
import { SyncLoader } from 'react-spinners';
import { MARKDOWN_OPTIONS } from '../constants';

const items = [
    {
      src: `${"https://picsum.photos/1200/780/?random"}`,
    },
    {
      src: `${"https://picsum.photos/1200/780/?random"}`,
    },
    {
      src: `${"https://picsum.photos/1200/780/?random"}`,
    }
  ];

class ServiceView extends Component {
    constructor(props) {
        super(props);

        this.createReviewSuccessCallback = this.createReviewSuccessCallback.bind(this);
        this.handleChatClick = this.handleChatClick.bind(this);
        this.renderOptionTabs = this.renderOptionTabs.bind(this);
        this.renderOptionContent = this.renderOptionContent.bind(this);
        this.handleOwnerClick = this.handleOwnerClick.bind(this);
        this.renderCarouselItems = this.renderCarouselItems.bind(this);
        this.handleHeartClickEvent = this.handleHeartClickEvent.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        
        window.scrollTo(0, 0);
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

    handleOwnerClick(){
        this.props.history.push(`/user/${this.props.serviceOwner._id}`);
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

    handleHeartClickEvent() {
        if (this.props.user)
            this.props.addFavorite(this.props.service._id)
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

        return _.map(JSON.parse(this.props.service.options), option => {
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

        return _.map(JSON.parse(this.props.service.options), option => {
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
                        <button 
                            onClick={this.handleOwnerClick} 
                            type="button" 
                            className="btn btn-outline-primary btn-block mt-2"
                            >
                            View Profile
                        </button>
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

    prepPhotos(photos) {
        var items = [];

        for (var i = 0; i < photos.length; i++)
            items.push({ src: photos[i] });

        return items;
    }

    renderCarouselItems(items) {
        var i = 0;

        return _.map(items, item => {
            return (
                <div class={`carousel-item img ${i++ === 0 ? "active" : ""}`}>
                    <img class="d-block img-thing" src={item.src} alt="Cute pic of dogs lol" />
                </div>
            );
        });
    }

    renderCarousel(items) {
        return (
            <div id="carousel" class="carousel slide" data-ride="false">
                <div class="carousel-inner img-container">
                    {this.renderCarouselItems(items)}
                </div>
                <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        );
    }

    renderFavoriteButton() {
        return (
            <div onClick={this.handleHeartClickEvent} className="heart-service-view">
                <i className={`fa ${this.props.user 
                    && this.props.user.favorites
                    && this.props.user.favorites.includes(this.props.service._id)  ? 'fa-heart' : 'fa-heart-o'}`} />
            </div>
        );
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
                                <div className="">
                                    {this.renderCarousel(!this.props.service.photos || this.props.service.photos.length === 0 ? items : this.prepPhotos(this.props.service.photos))}
                                </div>
                                <div className="service-header">
                                    <div className="row">
                                        <h1 className="col col-10 title">{this.props.service.name}</h1>
                                        <div className="col col-2">
                                            {this.renderFavoriteButton()}
                                        </div>
                                    </div>
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
                                {this.props.service.options && this.renderOptions()}
                                {this.props.service.options && <div className="p-3" />}
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
        currentUser: state.chat.currentUser,
        joinableRooms: state.chat.joinableRooms,
        createdRoom: state.chat.createdRoom
    };
}

export default connect(mapStateToProps, { addFavorite, fetchServiceAndOwner, connectChat, createRoom})(ServiceView);