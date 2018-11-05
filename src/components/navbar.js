import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <a className="navbar-brand" href="#">bazaar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Browse</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Create Service</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Chat</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Account</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}