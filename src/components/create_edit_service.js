import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createService, editService } from '../actions';
import { CREATE_EDIT_CATEGORIES as CATEGORIES } from '../constants';

class CreateEditService extends Component {    
    constructor(props) {
        super(props);

        this.renderDropdown = this.renderDropdown.bind(this);
    }

    componentDidMount() {
        if (this.props.isEdit && !this.props.service)
            this.props.history.push('/');
        
        else if (this.props.isEdit)
            this.props.initialize({ 
                serviceName: this.props.service.name,
                category: this.props.service.tags,
                description: this.props.service.description,
                price: this.props.service.price
            });
    }

    renderInputField(field) {
        const { meta: {touched, error} } = field;
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

    renderTextarea(field) {
        const { meta: {touched, error} } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid ' : touched && !error ? 'is-valid' : ''}`;
        
        return (
            <div>
                <textarea 
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
                <option key={category} value={category}>{category}</option>
            )
        });
    }

    renderDropdown(field) {
        const { meta: {touched, error } } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid' : touched && !error ? 'is-valid' : ''}`;

        return (
            <div>
                <select className={className} {...field.input} >
                    {this.renderSelectOptions()}
                </select>
                <p className="text-danger">
                    {touched ? error : ''}
                </p>
            </div>
        );
    }

    onSubmit(values) {
        if (!this.props.isEdit) {
            values = { 
                ...values, 
                user:this.props.user
            }
            this.props.createService(values, (id) => {
                this.props.history.push(`/services/${id}`);
            });
        } else {
            values = {
                ...values, 
                id: this.props.service._id
            }
            this.props.editService(values, (id) => {
                this.props.history.push(`/services/${id}`);
            });
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="create-edit-form container">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field 
                        label="Service Name"
                        name="serviceName"
                        component={this.renderInputField}
                    />
                    <Field 
                        label="Price"
                        name="price"
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
                        component={this.renderTextarea}
                    />
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-block btn-danger">{this.props.isEdit ? 'Save' : 'Submit'}</button>
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

    if (values.serviceName && values.serviceName.length > 60) 
        errors.serviceName = "Try making your service name shorter.";

    if (!values.category) 
        errors.category = "Choose a category.";
    else if (values.category == "Category") 
        errors.category = "Choose a category.";

    if (!values.description) 
        errors.description = "Enter a description.";

    if (!values.price) 
        errors.price = "Enter a price.";
    else if (values.price) {
        const parse = parseInt(values.price);

        if (parse)
            values.price = parse;
        else {
            values.price = ''
            errors.price = "Enter only numbers.";
        }
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        user:state.user.user,
        service: state.services.serviceToEdit
    };
}

export default reduxForm({
    validate,
    form: 'CreateEditServiceForm'
})(
    withRouter(connect(mapStateToProps, {createService, editService})(CreateEditService))
);