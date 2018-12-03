import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsersServices, fetchFavoriteServices } from '../actions';
import ServiceCardListRow from './service_card_list_row.js';
import Modal from './modal';
import CreateEditService from './create_edit_service';
import DeleteService from './delete_service';
import { SyncLoader } from 'react-spinners';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditServiceModal: false,
            showDeleteServiceModal: false
        }

        this.toggleDeleteServiceModal = this.toggleDeleteServiceModal.bind(this);
        this.deleteSuccessCallback = this.deleteSuccessCallback.bind(this);
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        if (!this.props.user)
            this.props.history.push('/');
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.fetchUsersServices(this.props.user._id);
            this.props.fetchFavoriteServices(this.props.user._id);
        }
    }

    toggleDeleteServiceModal() {
        this.setState({ 
            ...this.state,
            showDeleteServiceModal: !this.state.showDeleteServiceModal
        });
    }

    deleteSuccessCallback() {
        this.props.fetchUsersServices(this.props.user._id);
        this.toggleDeleteServiceModal();
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
        if (!this.props.services || !this.props.favorites)       
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

        if (this.props.services.length === 0 && (!this.props.favorites || this.props.favorites.length === 0))
            return (
                <div className="account container text-center">
                    <h1>You don't have any services or favorites.</h1>
                </div>
            );

        return (
            <div className="container account">
                {this.props.services.length > 0 && 
                    <ServiceCardListRow 
                        header="My Services" 
                        services={this.props.services} 
                        ableToEdit={true} 
                        toggleEditServiceModal={this.toggleEditServiceModal}
                        toggleDeleteServiceModal={this.toggleDeleteServiceModal}
                        />
                }
                {this.props.favorites && this.props.favorites.length > 0 &&
                    <ServiceCardListRow 
                        header="My Favorites" 
                        services={this.props.favorites} 
                        />
                }
                {this.renderDeleteModal()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    
    return { 
        user: state.user.user,
        services: state.services.accountServices,
        favorites: state.services.favorites
    };
}

export default connect(mapStateToProps, {fetchUsersServices, fetchFavoriteServices} )(Account);