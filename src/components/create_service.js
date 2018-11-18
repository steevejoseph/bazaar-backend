import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createService } from '../actions';

class CreateService extends Component {
    renderInputField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid ' : touched && !error ? 'is-valid' : ''}`;

        return (
            <div>
                <input 
                    type="text" 
                    className={className}
                    autoComplete="off"
                    placeholder={field.label}
                    {...field.input} 
                />
                <p className="text-danger">
                    {touched ? error : ''}
                </p>
            </div>
        );
    }

    renderDropdown(field) {
        const { meta: {touched, error } } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid' : ''}`;

        return (
            <div>
                <select className={className}>
                    <option>Category</option>
                </select>
                <p className="text-danger">
                    {touched ? error : ''}
                </p>
            </div>
        );
    }

    onSubmit(values) {
        values = { ...values, user:this.props.user}
        this.props.createService(values, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="modal-body">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field 
                        label="Service Name"
                        name="serviceName"
                        component={this.renderInputField}
                    />
                    <Field 
                        label="Category"
                        name="category"
                        component={this.renderDropdown}
                    />
                    <Field 
                        label="Description"
                        name="description"
                        component={this.renderInputField}
                    />
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-block btn-danger">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.serviceName) 
        errors.serviceName = "Enter a service name.";

    if (values.category == "Category") 
        errors.category = "Choose a category.";
    
    if (!values.description) 
        errors.description = "Enter a description.";
    
    return errors;
}

function mapStateToProps(state) {
    return {
        user:state.user.user,
    };
}

export default reduxForm({
    validate,
    form: 'ServiceForm'
})(
    connect(mapStateToProps, {createService})(CreateService)
);