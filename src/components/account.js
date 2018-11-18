import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsersServices } from '../actions';
import ServiceCardListRow from './service_card_list_row.js';

class Account extends Component {

    componentDidMount() {
        this.props.fetchUsersServices(this.props.user._id);
    }
    

    render() {

        //const userObj = JSON.parse(this.props.user);

        if (!this.props.user)
            return <div>loading</div>

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