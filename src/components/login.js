import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends Component {
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid ' : ''}`;

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

    onSubmit(values) {
        this.props.login(values, () => {
            this.props.successCallback();
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="modal-body">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
                        <button type="submit" className="btn btn-lg btn-block btn-danger">Log in</button>
                    </div>
                </form>
                <div className="text-center">                    
                    <p>Don't have an account? <a href="#"  onClick={this.props.switchToSignup}>Sign up</a></p>
                </div>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) 
        errors.email = "Enter your UCF email.";
    
    if (!values.password) 
        errors.password = "Enter your password";
    
    return errors;
}

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(null, {login})(Login)
);