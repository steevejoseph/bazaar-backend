import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsersServices } from '../actions';
import ServiceCardListRow from './service_card_list_row.js';
import Modal from './modal';
import EditService from './edit_service';
import DeleteService from './delete_service';

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

    renderDeleteModalBody() {
        return (
            <div className="delete text-center">
                <i className="fa fa-trash-o fa-5x text-danger p-4" />
                <h1>Are you sure?</h1>
                <p>Are you sure you want us to permanently delete this service?</p>
                <div className="p-2">
                    <button type="button" className="btn btn-lg btn-danger">Delete</button>
                    <button type="button" className="btn btn-lg">Cancel</button>
                </div>
            </div>
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
        services: state.services.services 
    };
}

export default connect(mapStateToProps, {fetchUsersServices} )(Account);