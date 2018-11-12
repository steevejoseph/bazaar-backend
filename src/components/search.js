import React, { Component } from 'react';
import { serviceSearch } from '../actions/index';
import { fetchServices } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Literally just the UI right now. No logic.

class SearchBar extends Component {


    constructor(props) {

        // because we extend Component
        super(props);

        this.state = {term: ''};

        // makes sure we don't lose reference to the function
        this.onInputChange = this.onInputChange.bind(this);
    }


    onInputChange(term){

        this.setState({ term });

        if(term === '')
            this.props.fetchServices();

        else 
            this.props.serviceSearch(term);
    }


    render() {
        return (
            <div className="search-component d-flex bg-danger">
                <div className="container align-self-center">
                    <h1 className="text-white h1">What brings you?</h1>
                    <input 
                        className="form-control form-control-lg" 
                        type="text" 
                        placeholder="Search"
                        value={this.state.term}
                        onChange={(event) => this.onInputChange(event.target.value)} />
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({serviceSearch, fetchServices}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);