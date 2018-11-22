import React, { Component } from 'react';
import { connect } from 'react-redux';
import { serviceView } from '../actions/index';
import ServiceDescription from './service_description';
import Rating from './service_rating';
import CreateReview from './create_review';

class ServiceView extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.serviceView(id);
    }

    render() {
        if(!this.props.service)
            return <div>Sorry, this service does not exist</div>;

        return ( 
            <div className="container service-view">
                <div><h1>{this.props.service.name}</h1></div>
                <Rating />
                <div><h4>{this.props.service.description}</h4></div>

                <div><p><i className="fa fa-user-circle fa-3x"></i></p>
                    <h6>Seller name</h6>
                    <h6>Seller email</h6>
                </div>
                
                <CreateReview serviceName={this.props.service.name} />

                <div className="clear">
                    <ServiceDescription service={this.props.service} />
                </div>
                
            </div>
        );
    }
}

function mapStateToProps( state ) {
    return { service: state.services.service };
}

export default connect(mapStateToProps, { serviceView })(ServiceView);