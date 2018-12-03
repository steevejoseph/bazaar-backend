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
        const topComments = topReviews(this.props.profileComments);

        console.log("top comments: ", topComments);

        return (
            <div> 
                <Jumbotron>
                    <Fade in={this.state.fadeIn} timeout={200} tag="h1" className="mt-6">
                        <h1 className="jumbo-greeting display-3 text-center">
                            {`Hi, I'm ${this.props.serviceOwner.firstName}!`}
                        </h1>
                        <hr className="user-view-hr" />
                        <Fade in={this.state.fadeIn} timeout={300} tag="h1" className="mt-6">

                            <div className="row offset-md-1">


                                <div className="col col-4 rating-email">   
                                    <div className="row">                           
                
                                        <div className="user-view-counter col-xs-12 bg-secondary rounded text-white">
                                            <CountUp
                                                className="custom-count"
                                                start={0}
                                                end={rating}
                                                duration={2}
                                                delay={0}
                                                decimals={1}
                                            />
                                        </div>
                                        <div className="user-view-rating">average rating</div>
                                    </div>    
                                    <div className="row user-view-contact">
                                        <i className="col-xs-12 fa fa-envelope fa-lg" />
                                        <div className="col-xs-12 user-view-email">
                                            {this.props.serviceOwner.email}
                                        </div>
                                    </div>  
                                    
                                </div>  


                                <div className="col top-reviews">
                                    <div className="row top-positive">
                                        <h5>{"Top Positive Review"}</h5>
                                            <Rating 
                                                starColor={'rgb(0, 132, 137)'} 
                                                overallRating={topComments.positive.rateing} 
                                                />
                                            <h6 className="positive-comment">{`"${topComments.positive.comment}"`}</h6>
                                    </div>

                                    <div className="row top-critical">
                                        <h5>{"Top Critcal Review"}</h5>
                                        <Rating 
                                            starColor={'rgb(0, 132, 137)'} 
                                            overallRating={topComments.critical.rateing} 
                                            />
                                        <h6>{`"${topComments.critical.comment}"`}</h6>
                                    </div>
                                
                                </div>
                            </div>
                        </Fade>


                        </Fade>
                </Jumbotron>
 
                {this.renderServices('Top Rated', [])}
                {this.renderServices(`${this.props.serviceOwner.firstName}'s Services`, this.props.profileServices)}
            </div>
        );
    }
}

function topReviews(comments) {
    var cutoff = 3, i, j, k;
    var topPositive, topCritical,  topPositiveRating = 0, topCriticalRating = 5;

    var list = [], modify = [];
    
        if(comments){

            for(var i = 0; i < comments.length; i++)
                list = _.union(list, comments[i]);
            
            list =  _.sortBy(list, 'rateing');
            console.log("modify: ", _.head(list).comment);

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