import React, { Component } from 'react';
import { serviceSearch } from '../actions/index';
import { fetchServices } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term: ''};
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