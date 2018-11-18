import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCard from './service_card';


export default class ServiceCardListRow extends Component {  

    renderCardList() {
        console.log("in service card list row ", this.props.ableToEdit);
        return _.map(this.props.services, service => {
            return (
                    <ServiceCard key={service._id} service={service} ableToEdit={this.props.ableToEdit}/>
            )
        });
    }

    render() {
        return (
            <div>
                <h1>Services</h1>
                <div className="row flex-row">
                    { this.renderCardList()}
                </div>
            </div>
        );
    }
}