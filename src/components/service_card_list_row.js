import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCard from './service_card';
import { Link } from 'react-router-dom';


export default class ServiceCardListRow extends Component {  
    
    renderCardList() {
        return _.map(this.props.services, service => {
            return (
                <Link to={`/services/${service._id}`}>
                    <ServiceCard key={service._id} service={service}/>
                </Link>
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