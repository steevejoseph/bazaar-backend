import React, { Component } from 'react';
import { fetchUserViewServices } from '../actions/index';
import { connect } from 'react-redux';
import { Jumbotron, Fade } from 'reactstrap';
import { SyncLoader } from 'react-spinners';
import CountUp from 'react-countup';
import ServiceCardListRow from './service_card_list_row';
import { serviceRating } from './service_view';
import Rating from './service_rating';
import _ from 'lodash';
import TextEllipsis from 'react-text-ellipsis';

class UserView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            fadeIn: true 
        };

        this.renderServices = this.renderServices.bind(this);
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        const { userId } = this.props.match.params;
        this.props.fetchUserViewServices(userId);
    }

    renderServices(header, services){
        return(
            <div className="container">
                <ServiceCardListRow 
                    header={header} 
                    description={''}
                    services={services} 
                    isHome={false}
                />
            </div>
        );
    }

    renderTopReviews(review, type){
       
        return(
            <h6>
                <h5>{`Top ${type} Review`}</h5>
                <div className="top-text">
                    <Rating 
                        starColor={'rgb(0, 132, 137)'} 
                        overallRating={review.rateing ? review.rateing : 0} 
                        />
                    <TextEllipsis 
                        lines={1} 
                        tag={'p'} 
                        ellipsisChars={'...'} 
                        tagClass={'className'} 
                        debounceTimeoutOnResize={200} 
                        useJsOnly={true} 
                        onResult={(result) => { 
                            if (result === TextEllipsis.RESULT.TRUNCATED) console.log('text get truncated');
                            else console.log('text does not get truncated');
                            }}>
                        {`"${review.comment}"`}
                    </TextEllipsis>
                </div>
            </h6>
        );
    }

    render(){
        if(!this.props.serviceOwner)
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

        const rating = userRating(this.props.profileComments);
        console.log("profileComments: ", this.props.profileComments);
        const topComments = topReviews(this.props.profileComments);
        console.log("topComments: ", topComments);
        var mdSize = (!topComments) ? 5 : 3;

        return (
            <div> 
                <Jumbotron>
                    <Fade in={this.state.fadeIn} timeout={200} tag="h1" className="mt-6">
                        <h1 className="jumbo-greeting display-4 text-center">
                            {`Hi, I'm ${this.props.serviceOwner.firstName}!`}
                        </h1>
                        <hr className="user-view-hr" />

                        <Fade in={this.state.fadeIn} timeout={300} tag="h1" className="mt-6">
                            <div className={`row offset-md-${mdSize}`}>

                                <div className="col col-4 rating-email">   
                                    <div className="row"> 
                                        <div className="user-view-counter bg-secondary rounded text-white">
                                            <CountUp
                                                className="custom-count"
                                                start={0}
                                                end={rating}
                                                duration={4}
                                                delay={0}
                                                decimals={1}
                                            />
                                        </div>
                                        <div className="user-view-rating">average rating</div>
                                    </div>    
                                    <div className="row user-view-contact">
                                        <i className=" fa fa-envelope fa-lg" />
                                        <div className=" user-view-email">
                                            {this.props.serviceOwner.email}
                                        </div>
                                    </div>  
                                </div> 

                                <div className="col offset-md-1 top-reviews">
                                    <div className="row top-positive">
                                        {(topComments && topComments.positive) && this.renderTopReviews(topComments.positive, "Positive")}                                        
                                    </div>
                                    <div className="row top-critical">
                                        {topComments && this.renderTopReviews(topComments.critical, "Critical")}
                                    </div>
                                </div>

                            </div>
                        </Fade>
                    </Fade>
                </Jumbotron>
 
                {this.renderServices(`${this.props.serviceOwner.firstName}'s Services`, this.props.profileServices)}
            </div>
        );
    }
}

function topReviews(comments) {
    var list = [];
    
        if(comments){

            for(var i = 0; i < comments.length; i++)
                list = _.union(list, comments[i]);
            
            list =  _.sortBy(list, 'rateing');
            
            if(list.length === 0)
                return null;
            
            const data = {
                positive: _.last(list),
                critical: _.head(list)
            }
            return data;
        }
         return null; 
}

function userRating(commentsByServices) {
    if(!commentsByServices) return 0;

    var i, sum = 0, length = commentsByServices.length;

    for(i = 0; i < commentsByServices.length; i++) {
        if(commentsByServices[i].length == 0)
            length--;
        else sum += serviceRating(commentsByServices[i]);
    }

    if(length === 0) return 0;

    return sum/length;
}

function mapStateToProps( state ) {
    console.log("state: ", state);
    return {
        user: state.user.user,
        profileServices: state.services.profileServices,
        profileComments: state.services.profileComments,
        serviceOwner: state.user.serviceOwner
    };
}

export default connect(mapStateToProps, { fetchUserViewServices } )(UserView);