import React, { Component } from 'react';
import { connect } from 'react-redux';
import { serviceView } from '../actions/index';
import ServiceDescription from './service_description';
import Rating from './service_rating';
import CreateReview from './create_review';
import ServiceReviewsList from './service_reviews_list';
import Markdown from 'markdown-to-jsx';

class ServiceView extends Component {
    constructor(props) {
        super(props);

        this.createReviewSuccessCallback = this.createReviewSuccessCallback.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.serviceView(id);
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

    renderServiceReviews() {
        return(
            <div className="review-list">
                <ServiceReviewsList comments={this.props.comments} overallRating={this.overallRating()}/>
            </div>
        );
    }

    renderCreateReview() {
        return (
            <div className="review-create">
                <CreateReview successCallback={this.createReviewSuccessCallback} serviceId={this.props.service._id} />
            </div>
        );
    }

    render() {
        console.log(this.props.service);
        
        if (!this.props.service)
            return <div>Sorry, this service does not exist</div>;

        const serviceOwner = this.props.service.owner;
        const loggedInUserIsOwner = this.props.user && (serviceOwner === this.props.user._id);
        
        return ( 
            <div className="service-view container">

                <div className="row">

                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="service-info">
                                <img className="card-img-top cursor" onClick={this.openServiceView} src="https://dummyimage.com/1200x780/bfb/aab" alt="Card image" />
                                <div className="service-header">
                                    <h1 className="service-title">{this.props.service.name}</h1>                            
                                    <h6 className="service-category mb-2 text-muted">{this.props.service.tags.length > 0 ? this.props.service.tags[0].toUpperCase() : ''}</h6>
                                </div>
                                <Markdown className="service-description py-3">
                                    {this.props.service.description}
                                </Markdown>
                            </div>


                        </div>

                        <div className="options-and-owner col-md-4">
                            <div className="owner-box sticky-top">
                                <p><i className="fa fa-user-circle fa-3x"></i></p>
                                <p>{`${this.props.serviceOwner.firstName} ${this.props.serviceOwner.lastName}`}</p>
                                <h6>{this.props.serviceOwner.email}</h6>
                            </div>
                        </div>
                    </div>

                    
                    <div className="review-box col-md-8 p-0">
                        <Rating overallRating={this.overallRating()} />
                        {this.renderServiceReviews()}
                        {this.props.loggedIn && !loggedInUserIsOwner && this.renderCreateReview()}
                    </div>
                </div>

                {/* <div className="clear">
                    <ServiceDescription service={this.props.service} />
                </div> */}
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
        serviceOwner: state.user.user,
        comments: state.services.comments 
    };
}

export default connect(mapStateToProps, { serviceView })(ServiceView);