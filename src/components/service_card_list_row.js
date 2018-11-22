import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCard from './service_card';

export default class ServiceCardListRow extends Component {  
    renderCardList() {
        return _.map(this.props.services, service => {
            return (
                <ServiceCard 
                    key={service._id} 
                    service={service} 
                    ableToEdit={this.props.ableToEdit}
                    toggleEditServiceModal={this.props.toggleEditServiceModal}
                    toggleDeleteServiceModal={this.props.toggleDeleteServiceModal}
                    />
            )
        });
    }

    render() {
        return (
            <div className="list-row p-2">
                <h1 className="list-category">{this.props.header}</h1>
                <h6 className="list-description">Short line about this really great category that will help you.</h6>
                <div className="row">
                    { this.renderCardList() }
                </div>
                <div className="list-show-all">
                    <a href="#">
                        Show all <i className="fa fa-lg fa-angle-right" />
                    </a>
                </div>
                
            </div>
        );
    }
}