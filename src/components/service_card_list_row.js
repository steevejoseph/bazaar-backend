import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCard from './service_card';
import { Link } from 'react-router-dom';

export default class ServiceCardListRow extends Component {  
    renderCardList() {
        return _.map(this.props.isHome ? this.props.services.slice(0, 4) : this.props.services, service => {
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

    renderShowAll() {
        return (
            <div className="list-show-all">
                <Link to={`/category/${this.props.header}`}>
                    Show all ({this.props.services.length}) <i className="fa fa-lg fa-angle-right" />
                </Link>
            </div>
        );
    }

    render() {
        return (
            <div className="list-row p-2">
                <h1 className="list-category">{this.props.header}</h1>
                <h6 className="list-description">{this.props.description}</h6>
                <div className="row">
                    { this.renderCardList() }
                </div>
                {this.props.isHome ? this.renderShowAll() : ''}
            </div>
        );
    }
}