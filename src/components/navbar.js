import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import { connect } from 'react-redux';
import { getUserFromLocalStorage, logOutUser } from '../actions'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = { isTryingToLogin: false };

        this.toggleIntent = this.toggleIntent.bind(this);
        this.loginSignupModal = this.loginSignupModal.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount() {
        // Check local storage to see if user has signed in
        // TODO: Check to see if token is valid instead
        if (localStorage.getItem('loggedInUser'))
            this.props.getUserFromLocalStorage();
    }

    setIntent(intent) {
        this.setState({isTryingToLogin: intent});
    }

    toggleIntent() {
        this.setState({isTryingToLogin: !this.state.isTryingToLogin});
    }

    logOut() {
        this.props.logOutUser();
        this.props.history.push('/');
    }

    loginSignupModal() {
        return (
        <div className="modal fade" id="loginSignupModal" tabIndex="-1" role="dialog" aria-labelledby="loginSignupModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {this.state.isTryingToLogin ?  <Login switchToSignup={this.toggleIntent}/> : <Signup switchToLogin={this.toggleIntent} />}
                </div>
            </div>
        </div>
        );
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

                                    {/* Dropdown is too wide and hangs off the page :( */}
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <Link to="/account" className="dropdown-item">Account</Link>
                                        <div className="dropdown-divider"></div>
                                        <a onClick={this.logOut} className="dropdown-item">Log out</a>
                                    </div>
                                </li>
                                :  '' }

                            
                            {/* Yes, weird, cumbersome use of tertiary, but works only this way weirdly. Open to other solutions */}

                            {this.props.loggedIn ? '' :
                            
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#loginSignupModal" href="" onClick={() => this.setIntent(false)}>Sign up</a>
                                </li>

                            }

                            {this.props.loggedIn ? '' :
                            
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#loginSignupModal" href="" onClick={() => this.setIntent(true)}>Log in</a>
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