import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Alert } from 'reactstrap';

class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            hasError: false
        };

        this.errorCallback = this.errorCallback.bind(this);
    }
    
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-control form-control-lg ${touched && error ? 'is-invalid ' : ''}`;

        return (
            <div>
                <input 
                    type={field.input.name === "password" ? "password" : "text"}
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

    errorCallback(){
        this.setState({ 
            ...this.state,
            hasError: !this.state.hasError
        });
    }

    onSubmit(values) {
        this.props.login(values, () => {
            this.props.successCallback();
        }, () => {
            this.errorCallback();
        });
    }

    render() {
        console.log("haserror: ", this.state.hasError);
        const { handleSubmit } = this.props;
        return (
            <div className="modal-body">
                <div>
                    {this.state.hasError &&
                        <Alert color="danger">
                            Invalid Credentials
                        </Alert>
                    }
                </div>
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