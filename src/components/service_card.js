import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setServiceToEdit } from '../actions';

class ServiceCard extends Component {
    constructor(props) {
        super(props);

        this.openServiceView = this.openServiceView.bind(this);
        this.handleEditServiceClickEvent = this.handleEditServiceClickEvent.bind(this);
    }

    openServiceView() {
        this.props.history.push(`/services/${this.props.service._id}`);
    }

    handleEditServiceClickEvent() {
        this.props.setServiceToEdit(this.props.service);
        this.props.toggleEditServiceModal();
    }

    render() {
        if(this.props.ableToEdit)
            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div onClick={this.openServiceView}>
                                <h5 className="card-title">{this.props.service.name}</h5>
                                <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                                <p className="card-text">{this.props.service.description}</p>
                            </div>    
                            <i onClick={this.handleEditServiceClickEvent} className="fa fa-gear fa-1x text-muted"></i>
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
                            <h6 className="card-subtitle mb-2 text-success">$15/hr</h6>
                            <p className="card-text">{this.props.service.description}</p>
                        </div>
                    </div>
                </div>
            );
    }
}

export default withRouter(connect(null, {setServiceToEdit})(ServiceCard));