import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createService } from '../actions';

const CATEGORIES = [
    'Default',
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Fun & Lifestyle',
    'Lessons/Tutoring',
    'Event Management',
    'Beauty',
    'E-Commerce',
    'Photography'
];

class CreateService extends Component {    
    constructor(props) {
        super(props);

        this.renderDropdown = this.renderDropdown.bind(this);
    }

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

    renderSelectOptions() {
        return _.map(CATEGORIES, category => {
            return (
                    <option value={category}>{category}</option>
            )
        });
    }

    renderDropdown(field) {
        const { meta: {touched, error } } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid' : touched && !error ? 'is-valid' : ''}`;

        return (
            <div>
                <select className={className}>
                    {this.renderSelectOptions()}
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
                    <Field 
                        label="Price"
                        name="price"
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

    if (values.category) 
        errors.category = "Choose a category.";
    
    if (!values.description) 
        errors.description = "Enter a description.";

    if (!values.price) 
        errors.price = "Enter a price.";
    
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