import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setServiceToEdit } from '../actions';
import PhotoInput from './photo_input';

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

    renderGearbox() {
        return (
            <div className="gearbox text-right">
                <PhotoInput resource={"service"} resourceId={this.props.service._id}/>
                <i onClick={this.handleEditServiceClickEvent} className="fa fa-gear text-muted" />
                <i onClick={this.handleDeleteServiceClickEvent} className="fa fa-trash-o text-danger" />
            </div>
        );
    }

    render() {
        if(!this.props.service)
            return '';

        return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 p-0">
                    <div className="card">
                    <img className="card-img-top cursor" onClick={this.openServiceView} src="https://dummyimage.com/600x390/bfb/aab" alt="Card image" />
                    <div className="card-info cursor" onClick={this.openServiceView}>
                        <h6 className="tag card-subtitle mb-2 text-muted">{this.props.service.tags.length > 0 ? this.props.service.tags[0].toUpperCase() : ''}</h6>
                        <h5 className="title card-title">{this.props.service.name}</h5>
                        <h6 className="price card-subtitle mb-2 text-success">${this.props.service.price} per service</h6>
                    </div>
                    {this.props.ableToEdit ? this.renderGearbox() : ''}
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, {setServiceToEdit})(ServiceCard));