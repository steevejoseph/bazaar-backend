import React, { Component } from 'react';
import { connect } from 'react-redux';
import { serviceView } from '../actions/index';
import ServiceDescription from './service_description';
import { Link, withRouter } from 'react-router-dom';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

class ServiceView extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.serviceView(id);
    }

    render() {
        if(!this.props.service)
            return <div>Sorry, this service does not exist</div>;

        return ( 
            <div>
                <div><h1>{this.props.service.name}</h1></div>
                <div><h4>{this.props.service.description}</h4></div>
                <div><p><i className="fa fa-user-circle fa-3x"></i></p>
                    <p><h7>Seller name</h7></p>
                    <p><h7>Seller email</h7></p>
                </div>
                <ServiceDescription service={this.props.service} />
            </div>
        );
    }
}

function mapStateToProps( state ) {
    console.log("hello", state.services.service);
    return { service: state.services.service };
}

export default connect(mapStateToProps, { serviceView })(ServiceView);