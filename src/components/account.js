import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  } from '../actions';

class Account extends Component {
    render() {

        if (!this.props.user)
            return <div>loading</div>

        return (
            <div className="container account">
                <h1>Account - {this.props.user.lastName}</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user.user };
}

export default connect(mapStateToProps)(Account);