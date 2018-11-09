import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from './signup';
import Login from './login';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = { isTryingToLogIn: null };

        this.toggleIntent = this.toggleIntent.bind(this);
        this.loginSignupModal = this.loginSignupModal.bind(this);
    }

    setIntent(intent) {
        this.setState({isTryingToLogin: intent});
    }

    toggleIntent() {
        this.setState({isTryingToLogin: !this.state.isTryingToLogIn});
    }

    loginSignupModal() {
        return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {this.state.isTryingToLogin ?  <Login switchToSignup={() => this.setIntent(true)}/> : <Signup switchToLogin={this.toggleIntent} />}
                </div>
            </div>
        </div>
        );
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Bazaar</Link>
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
                                
                                // Show if loggedIn

                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">Account</Link>
                                </li>
                                
                                : 
                                
                                // Show if !loggedIn

                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#exampleModal" href="" onClick={() => this.setIntent(false)}>Sign Up</a>
                                </li>
                
                                }

                            {/* yes i know this looks pretty bad right now */}
                            {this.props.loggedIn ? '' :
                            
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="modal" data-target="#exampleModal" href="" onClick={() => this.setIntent(true)}>Login</a>
                                </li>

                                }
                        </ul>
                    </div>
                </nav>
                {this.props.loggedIn ? '' : this.loginSignupModal()}
            </div>
        );
    }
}

export default Navbar;