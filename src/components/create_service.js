import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createService } from '../actions';

export default class CreateService extends Component {
    render() {
        return (
            <div className="container" >
                <h1>Create Service</h1>
            </div>
        );
    }
}