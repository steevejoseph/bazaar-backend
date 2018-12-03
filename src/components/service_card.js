import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setServiceToEdit, addFavorite } from '../actions';
import PhotoInput from './photo_input';

const items = [
    {
      src: `${"https://picsum.photos/1200/780/?random"}`,
    },
    {
      src: `${"https://picsum.photos/1200/780/?random"}`,
    },
    {
      src: `${"https://picsum.photos/1200/780/?random"}`,
    }
  ];

class ServiceCard extends Component {
    constructor(props) {
        super(props);

        this.openServiceView = this.openServiceView.bind(this);
        this.handleEditServiceClickEvent = this.handleEditServiceClickEvent.bind(this);
        this.handleDeleteServiceClickEvent = this.handleDeleteServiceClickEvent.bind(this);
        this.handleHeartClickEvent = this.handleHeartClickEvent.bind(this);
    }

    openServiceView() {
        this.props.history.push(`/services/${this.props.service._id}`);
    }

    handleEditServiceClickEvent() {
        this.props.setServiceToEdit(this.props.service);
        this.props.history.push('/service/edit');
    }

    handleDeleteServiceClickEvent() {
        this.props.setServiceToEdit(this.props.service);
        this.props.toggleDeleteServiceModal();
    }

    handleHeartClickEvent() {
        if (this.props.user)
            this.props.addFavorite(this.props.service._id)
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

    renderFavoriteButton() {
        return (
            <div onClick={this.handleHeartClickEvent} className="heart-card">
                <i className={`fa ${this.props.user 
                    && this.props.user.favorites
                    && this.props.user.favorites.includes(this.props.service._id)  ? 'fa-heart' : 'fa-heart-o'}`} />
            </div>
        );
    }

    render() {
        if(!this.props.service)
            return '';
        
        return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 p-0">
                    <div className="card">
                    {this.renderFavoriteButton()}
                    <div className="img-container">
                        <img className="card-img-top cursor img" onClick={this.openServiceView} src={!this.props.service.photos || this.props.service.photos.length === 0 ? "https://picsum.photos/600/390/?random" : this.props.service.photos[0]} alt="Card image" />
                    </div>
                    <div className="card-info cursor" onClick={this.openServiceView}>
                        <h6 className="tag card-subtitle mb-2 text-muted">{this.props.service.tags.length > 0 ? this.props.service.tags[0].toUpperCase() : ''}</h6>
                        <h5 className="title card-title">{this.props.service.name}</h5>
                        <h6 className="price card-subtitle mb-2 text-success">${this.props.service.price} per service</h6>
                    </div>
                    {this.props.ableToEdit && this.renderGearbox()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    };
}

export default withRouter(connect(mapStateToProps, {setServiceToEdit, addFavorite})(ServiceCard));
