import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsersServices } from '../actions';
import ServiceCardListRow from './service_card_list_row.js';

class Account extends Component {
    componentDidMount() {
        this.props.fetchUsersServices(this.props.user._id);
    }

    render() {
        if (!this.props.user)
            return <div>loading</div>

        if(!this.props.services)
            return (
                <div className="container account">
                    <h1>Account - {this.props.user.lastName}</h1>
                    <h5>You do not own any services</h5>
                </div>
            );

        return (
            <div className="container account">
                <h1>Account - {this.props.user.lastName}</h1>
                <ServiceCardListRow services={this.props.services} ableToEdit={true}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user.user, services: state.services.services };
}

export default connect(mapStateToProps, {fetchUsersServices} )(Account);