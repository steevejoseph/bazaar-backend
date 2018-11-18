import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCard from './service_card';

export default class ServiceCardListRow extends Component {  
    renderCardList() {
        return _.map(this.props.services, service => {
            return (
<<<<<<< HEAD
                <ServiceCard key={service._id} service={service}/>
=======
                    <ServiceCard key={service._id} service={service} ableToEdit={this.props.ableToEdit}/>
>>>>>>> 28b46e86a7ab1a34d4abda33c672fe286ba7b767
            )
        });
    }

    render() {
        return (
            <div>
                <h1>Services</h1>
                <div className="row flex-row">
                    { this.renderCardList() }
                </div>
            </div>
        );
    }
}