import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setServiceToEdit } from '../actions';

class ServiceCard extends Component {
    constructor(props) {
        super(props);

        this.openServiceView = this.openServiceView.bind(this);
        this.handleEditServiceClickEvent = this.handleEditServiceClickEvent.bind(this);
        this.handleDeleteServiceClickEvent = this.handleDeleteServiceClickEvent.bind(this);
    }

    openServiceView() {
        this.props.history.push(`/services/${this.props.service._id}`);
    }

    handleEditServiceClickEvent() {
        this.props.setServiceToEdit(this.props.service);
        this.props.toggleEditServiceModal();
    }

    handleDeleteServiceClickEvent() {
        this.props.setServiceToEdit(this.props.service);
        this.props.toggleDeleteServiceModal();
    }

    render() {
        if(this.props.ableToEdit)
            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div onClick={this.openServiceView}>
                                <h5 className="card-title">{this.props.service.name}</h5>
                                <h6 className="card-subtitle mb-2 text-success">Starting at ${this.props.service.price}/service</h6>
                                <p className="card-text">{this.props.service.description}</p>
                            </div>
                            <div className="gearbox text-right">
                                <i onClick={this.handleEditServiceClickEvent} className="fa fa-gear text-muted" />
                                <i onClick={this.handleDeleteServiceClickEvent} className="fa fa-trash-o text-danger" />
                            </div>   
                        </div>
                    </div>
                </div>
            );

        else if (!this.props.ableToEdit)
            return (
                <div>
                     <div className="card" onClick={this.openServiceView}>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.service.name}</h5>
                            <h6 className="card-subtitle mb-2 text-success">Starting at ${this.props.service.price}/service</h6>
                            <p className="card-text">{this.props.service.description}</p>
                        </div>
                    </div>
                </div>
            );
    }
}

export default withRouter(connect(null, {setServiceToEdit})(ServiceCard));