import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class ServiceCard extends Component {
    constructor(props) {
        super(props);

        this.openServiceView = this.openServiceView.bind(this);
    }

    openServiceView() {
        this.props.history.push(`/services/${this.props.service._id}`);
    }

    render() {
        return (
            <div>
                <div className="card" onClick={this.openServiceView}>
                    <div className="card-body" >
                        <h5 className="card-title">{this.props.service.name}</h5>
                        <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                        <p className="card-text">{this.props.service.description}</p>
                     </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ServiceCard);