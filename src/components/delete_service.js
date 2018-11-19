import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteService } from '../actions';

class DeleteService extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleDeleteClick() {
        this.props.deleteService(this.props.service._id, () => {
            this.props.successCallback();
        });
    }

    handleCancelClick() {
        this.props.cancelCallback();
    }

    render() {
        return (
            <div className="delete text-center">
                <i className="fa fa-trash-o fa-5x text-danger p-4" />
                <h1>Are you sure?</h1>
                <p>Are you sure you want us to permanently delete this service?</p>
                <div className="p-2">
                    <button onClick={this.handleDeleteClick} type="button" className="btn btn-lg btn-danger">Delete</button>
                    <button onClick={this.handleCancelClick} type="button" className="btn btn-lg">Cancel</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        service: state.services.serviceToEdit 
    };
}

export default connect(mapStateToProps, { deleteService })(DeleteService);