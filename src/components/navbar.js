import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Modal from './modal';
import { connect } from 'react-redux';
import { getUserFromLocalStorage, logOutUser } from '../actions';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isTryingToLogin: false,
            modal: false
        };

        this.toggleIntent = this.toggleIntent.bind(this);
        this.loginSignupModal = this.loginSignupModal.bind(this);
        this.logOut = this.logOut.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLoginClickEvent = this.handleLoginClickEvent.bind(this);
        this.handleSignupClickEvent = this.handleSignupClickEvent.bind(this);
    }

    componentDidMount() {
        // Check local storage to see if user has signed in
        // TODO: Check to see if token is valid instead
        if (localStorage.getItem('loggedInUser'))
            this.props.getUserFromLocalStorage();
        
        if (this.props.loggedIn)
            this.setState({ 
                isTryingToLogin: this.state.isTryingToLogin,
                modal: false
            });        
    }

    setIntent(intent, callback = {}) {
        this.setState({ 
            isTryingToLogin: intent,
            modal: this.state.modal
        }, () => callback());
    }

    toggleIntent() {
        this.setState({ 
            isTryingToLogin: !this.state.isTryingToLogin,
            modal: this.state.modal
        });
    }

    logOut() {
        this.props.logOutUser();
        this.props.history.push('/');
    }

    toggleModal() {
        this.setState({ 
            isTryingToLogin: this.state.isTryingToLogin,
            modal: !this.state.modal
        });
    }

    loginSignupModal() {
        return (
            <Modal 
                isOpen={this.state.modal} 
                toggle={this.toggleModal} 
                modalBody={this.state.isTryingToLogin ? <Login switchToSignup={this.toggleIntent} successCallback={this.toggleModal} /> : <Signup switchToLogin={this.toggleIntent} successCallback={this.toggleModal} />}
                />
        );
    }

    handleSignupClickEvent() {
        this.setIntent(false, () => this.toggleModal()); 
    }

    handleLoginClickEvent() {
        this.setIntent(true, () => this.toggleModal()); 
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm  navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand mb-0 h1">Bazaar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/create-service" className="nav-link">Create Service</Link>
                            </li>
                            
                            {this.props.loggedIn ? 

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Account
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <Link to="/account" className="dropdown-item">Account</Link>
                                        <div className="dropdown-divider"></div>
                                        <a onClick={this.logOut} className="dropdown-item">Log out</a>
                                    </div>
                                </li>
                                :  '' }

                            
                            {/* Yes, weird, cumbersome use of ternary, but works only this way weirdly. Open to other solutions */}

                            {this.props.loggedIn ? '' :
                            
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#loginSignupModal" href="" onClick={this.handleSignupClickEvent}>Sign up</a>
                                </li>

                            }

                            {this.props.loggedIn ? '' :
                            
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#loginSignupModal" href="" onClick={this.handleLoginClickEvent}>Log in</a>
                                </li>

                                }
                        </ul>
                    </div>
                </nav>
                {this.loginSignupModal()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { loggedIn: state.user.loggedIn };
}

export default connect(mapStateToProps, {getUserFromLocalStorage, logOutUser})(Navbar);