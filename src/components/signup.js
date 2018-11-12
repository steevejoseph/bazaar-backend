import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../actions';

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
        this.props.createUser(values, () => {
            
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="modal-body">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field 
                        label="First Name"
                        name="firstName"
                        component={this.renderField}
                    />
                    <Field 
                        label="Last Name"
                        name="lastName"
                        component={this.renderField}
                    />
                    <Field 
                        label="Email"
                        name="email"
                        component={this.renderField}
                    />
                    <Field 
                        label="Password"
                        name="password"
                        component={this.renderField}
                    />
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-block btn-danger">Sign up</button>
                    </div>
                </form>
                <div className="text-center">                    
                    <p>Already have an account? <a href="#" onClick={this.props.switchToLogin}>Log in</a></p>
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.firstName) 
        errors.firstName = "Enter your first name.";

    if (!values.lastName) 
        errors.lastName = "Enter your last name.";
    
    if (!values.email) 
        errors.email = "Enter your UCF email.";
    
    if (!values.password) 
        errors.password = "Enter your password";
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'SignupForm'
})(
    connect(null, {createUser})(Signup)
);