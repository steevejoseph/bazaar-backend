import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ServiceCard extends Component {
    render() {
        console.log("in service card ", this.props.ableToEdit);
        if(this.props.ableToEdit)
            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <Link to={`/services/${this.props.service._id}`}>
                                <h5 className="card-title">{this.props.service.name}</h5>
                            </Link>
                            <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                            <p className="card-text">{this.props.service.description}</p>
                            <div className="btn-group" role="group" aria-label="...">
                                <button type="button" className="btn btn-default">Left</button>
                                <button type="button" className="btn btn-default">Edit</button>
                                <button type="button" className="btn btn-danger">delete</button>
                            </div>
		                    
                        </div>
                    </div>
                </div>
            );

        else if (!this.props.ableToEdit)
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