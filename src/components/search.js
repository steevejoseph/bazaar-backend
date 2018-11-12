import React, { Component } from 'react';

// Literally just the UI right now. No logic.

export default class SearchBar extends Component {
    render() {
        return (
            <div className="search-component d-flex bg-danger">
                <div className="container align-self-center">
                    <h1 className="text-white h1">What brings you?</h1>
                    <input className="form-control form-control-lg" type="text" placeholder="Search" />
                </div>
            </div>
        );
    }
}