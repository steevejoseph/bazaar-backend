import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createService } from '../actions';

class Signup extends Component {
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-group${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <div>
                    <input 
                        type="text" 
                        className="form-control form-control-lg"
                        autoComplete="off"
                        placeholder={field.label}
                        {...field.input} 
                    />
                </div>
                <p className="text-danger">
                    {touched ? error : ''}
                </p>
            </div>
        );
    }

    onSubmit(values) {
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
                        component={this.renderField}
                    />
                    <Field 
                        label="Tags"
                        name="tags"
                        component={this.renderField}
                    />
                    <Field 
                        label="Description"
                        name="description"
                        component={this.renderField}
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

    if (!values.tags) 
        errors.tags = "Enter some tags.";
    
    if (!values.description) 
        errors.description = "Enter a description.";
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'ServiceForm'
})(
    connect(null, {createService})(Signup)
);