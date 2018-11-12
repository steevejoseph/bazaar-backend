import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCard from './service_card';
import { connect } from 'react-redux';

export default class ServiceCardListRow extends Component {  
    
    renderCardList() {
        return _.map(this.props.services, service => {
            return (
                <ServiceCard key={service._id} service={service}/>
            )
        });
    }

    render() {
        return (
            <div>
                <h1>Services</h1>
                <div className="row flex-row">
                    {this.renderCardList()}
                </div>
            </div>
        );
    }
}