import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../actions';

class Signup extends Component {
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-group row ${touched && error ? 'is-invalid' : ''}`;

        return (
            <div className={className}>
                <label className="col-sm-2 col-form-label">{field.label}</label>
                <div className="col-sm-10">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        placeholder={field.label}
                        {...field.input} 
                    />
                </div>
                {/* TODO: try to get rid of this little column and justify the other to the right */}
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createUser(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <h1>Sign Up</h1>
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
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                </form>
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