import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ServiceCard extends Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <Link to={`/services/${this.props.service._id}`}>
                            <h5 className="card-title">{this.props.service.name}</h5>
                        </Link>
                        <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                        <p className="card-text">{this.props.service.description}</p>
                     </div>
                </div>
            </div>
        );
    }
}