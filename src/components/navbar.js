import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="#">Bazaar</a>
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
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                </li>

                                }
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;