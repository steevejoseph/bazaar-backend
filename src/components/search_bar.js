import React, { Component } from 'react';

export default class SearchBar extends Component {
    render() {
        return (
            <div>
                <input className="form-control form-control-lg" type="text" placeholder="Search" />
            </div>
        );
    }
}