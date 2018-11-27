import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsersServices } from '../actions';
import ServiceCardListRow from './service_card_list_row.js';
import Modal from './modal';
import EditService from './edit_service';
import DeleteService from './delete_service';
import { SyncLoader } from 'react-spinners';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditServiceModal: false,
            showDeleteServiceModal: false
        }

        this.toggleEditServiceModal = this.toggleEditServiceModal.bind(this);
        this.toggleDeleteServiceModal = this.toggleDeleteServiceModal.bind(this);
        this.editSuccessCallback = this.editSuccessCallback.bind(this);
        this.deleteSuccessCallback = this.deleteSuccessCallback.bind(this);
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

    toggleDeleteServiceModal() {
        this.setState({ 
            ...this.state,
            showDeleteServiceModal: !this.state.showDeleteServiceModal
        });
    }


    editSuccessCallback() {
        this.props.fetchUsersServices(this.props.user._id);
        this.toggleEditServiceModal();
    }

    deleteSuccessCallback() {
        this.props.fetchUsersServices(this.props.user._id);
        this.toggleDeleteServiceModal();
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

    renderDeleteModal() {
        return (
            <Modal 
                isOpen={this.state.showDeleteServiceModal}
                toggle={this.toggleDeleteServiceModal}
                modalBody={<DeleteService successCallback={this.deleteSuccessCallback} cancelCallback={this.toggleDeleteServiceModal}/>}
            />
        );
    }

    render() {
        if (!this.props.services)       
            return (
                <div className="account container text-center">
                    <SyncLoader 
                        className="p-5"
                        sizeUnit={"px"}
                        size={15}
                        margin={'5px'}
                        color={'rgb(0, 132, 137)'}
                        />
                </div>
            );

        if(!this.props.services)
            return (
                <div className="container account">
                    <h5>You do not own any services</h5>
                </div>
            );

        return (
            <div className="container account">
                <ServiceCardListRow 
                    header="My Services" 
                    services={this.props.services} 
                    ableToEdit={true} 
                    toggleEditServiceModal={this.toggleEditServiceModal}
                    toggleDeleteServiceModal={this.toggleDeleteServiceModal}
                    />
                {this.renderEditModal()}
                {this.renderDeleteModal()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        user: state.user.user,
        services: state.services.accountServices
    };
}

export default connect(mapStateToProps, {fetchUsersServices} )(Account);