import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsersServices } from '../actions';
import ServiceCardListRow from './service_card_list_row.js';
import Modal from './modal';
import EditService from './edit_service';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditServiceModal: false
        }

        this.toggleEditServiceModal = this.toggleEditServiceModal.bind(this);
        this.handleEditServiceClickEvent = this.handleEditServiceClickEvent.bind(this);
        this.editSuccessCallback = this.editSuccessCallback.bind(this);
    }

    componentDidMount() {
        if(this.props.user)
            this.props.fetchUsersServices(this.props.user._id);
    }

    toggleEditServiceModal() {
        this.setState({ 
            ...this.state,
            showEditServiceModal: !this.state.showEditServiceModal
        });
    }

    editSuccessCallback() {
        this.props.fetchUsersServices(this.props.user._id);
        this.toggleEditServiceModal();
    }

    renderEditModal() {
        return (
            <Modal 
                isOpen={this.state.showEditServiceModal}
                toggle={this.toggleEditServiceModal}
                modalBody={<EditService successCallback={this.editSuccessCallback}/>}
            />
        );
    }

    handleEditServiceClickEvent() {
        this.toggleEditServiceModal();
    }

    render() {
        if (!this.props.user)
            return <div>loading</div>

        if(!this.props.services)
            return (
                <div className="container account">
                    <h1>Account - {this.props.user.lastName}</h1>
                    <h5>You do not own any services</h5>
                </div>
            );

        return (
            <div className="container account">
                <h1>Account - {this.props.user.lastName}</h1>
                <ServiceCardListRow 
                    header="My Services" 
                    services={this.props.services} 
                    ableToEdit={true} 
                    toggleEditServiceModal={this.toggleEditServiceModal}
                    />
                {this.renderEditModal()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        user: state.user.user, 
        services: state.services.services 
    };
}

export default connect(mapStateToProps, {fetchUsersServices} )(Account);