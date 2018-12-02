import React, { Component } from 'react';
import { fetchUserViewServices } from '../actions/index';
import { connect } from 'react-redux';
import { Jumbotron, Fade } from 'reactstrap';
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

        return (
            <div> 
                <Jumbotron>
                    <Fade in={this.state.fadeIn} tag="h1" className="mt-6">
                        <h1 className="jumbo-greeting display-3 text-center">
                            {`Hi, I'm ${this.props.serviceOwner.firstName}!`}
                        </h1>
                        <hr className="user-view-hr" />

                        <div className="offset-md-5">
                            <div className="row">
                                <div className="user-view-counter col-xs-12 bg-secondary rounded text-white">
                                    <CountUp
                                        className="custom-count"
                                        start={0}
                                        end={4.3}
                                        duration={4}
                                        delay={0}
                                        decimals={1}
                                    />
                                </div>
                                <div className="col-xs-12 user-view-rating">average rating</div>
                            </div>

                            <div className="row user-view-contact">
                                <i className="col-xs-12 fa fa-envelope fa-lg" />
                                <div className="col-xs-12 user-view-email">
                                    {this.props.serviceOwner.email}
                                </div>
                            </div>    

                        </div>
                    </Fade>
                </Jumbotron>
 
                {this.renderServices('Most Popular', [])}
                {this.renderServices(`${this.props.serviceOwner.firstName}'s Services`, this.props.profileServices)}
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return {
        user: state.user.user,
        profileServices: state.services.profileServices,
        serviceOwner: state.user.serviceOwner
    };
}

export default connect(mapStateToProps, { fetchUserViewServices } )(UserView);