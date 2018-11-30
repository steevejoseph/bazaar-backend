import React, { Component } from 'react';
import { fetchUsersServices, fetchServiceAndOwner } from '../actions/index';
import { connect } from 'react-redux';
import { Jumbotron, Fade, Badge } from 'reactstrap';
import { SyncLoader } from 'react-spinners';
import CountUp from 'react-countup';
import ServiceCardListRow from './service_card_list_row';


class UserView extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            avgRating: 0,
            fadeIn: true 
        };

        // this.overallRating = this.overallRating.bind(this);
        // this.findAverageRating = this.findAverageRating.bind(this);
        this.renderServices = this.renderServices.bind(this);
    }

    componentDidMount(){
        const { userId } = this.props.match.params;

        this.props.fetchUsersServices(userId);

        /* if(this.props.serviceOwner && this.props.accountServices){
            var avgRating = this.findAverageRating();
            this.setState({ avgRating: avgRating });
        }
        */
    }
 /*
    overallRating (){
        var sum = 0, i;
       
        if(!this.props.comments) return 0;
        
        for (i = 0; i < this.props.comments.length; i++)
            sum += this.props.comments[i].rateing;

        return sum/this.props.comments.length;
    }

    findAverageRating(){

        var i, total = 0;
       
        if(this.props.accountServices.length == 0) return 0;

        for(i = 0; i < this.props.accountServices.length; i++){
            this.props.fetchServiceAndOwner(this.props.accountServices[i]._id);
            this.overallRating();
        }

        return total;
    }
    */
    renderPopularServices(header, services){
        return (
            <div className="container">
            <ServiceCardListRow 
                header={'Most Popular'} 
                description={''}
                services={[]} 
                isHome={false}
            />
            </div>
        );
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

        return (
            <div> 
                <Jumbotron>
                    <Fade in={this.state.fadeIn} tag="h1" className="mt-6">
                        <h1 className="display-3 text-center">
                            {`Hi, I'm ${this.props.serviceOwner.firstName}!`}
                        </h1>
                        <hr />

                        <div className="owner-info offset-md-5">
                            <div className="row">
                                <div className="counter col-xs-12 bg-secondary rounded text-white">
                                        <CountUp
                                            className="custom-count"
                                            start={0}
                                            end={4.3}
                                            duration={4}
                                            delay={0}
                                            decimals={1}
                                        />
                                </div>
                                <div className="col-xs-12 avg-rating">average rating</div>
                            </div>

                            <div className="row fa-env">
                                <i className="col-xs-12 fa fa-envelope fa-lg" />
                                <div className="col-xs-12 email">
                                    {this.props.serviceOwner.email}
                                </div>
                            </div>    

                        </div>
                    </Fade>
                </Jumbotron>
 
                {this.renderServices('Most Popular', [])}
                {this.renderServices(`${this.props.serviceOwner.firstName}'s Services`, this.props.accountServices)}
               

            </div>
        );
    }
}

function mapStateToProps( state ) {
    return {
        user: state.user.user,
        accountServices: state.services.accountServices,
        serviceOwner: state.user.serviceOwner,
        comments: state.services.comments
    };
}

export default connect(mapStateToProps, { fetchUsersServices, fetchServiceAndOwner } )(UserView);