import React, { Component } from 'react';

export default class ServiceCard extends Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.service.name}</h5>
                        <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                        <p className="card-text">{this.props.service.description}</p>
                     </div>
                </div>
            </div>
        );
    }
}