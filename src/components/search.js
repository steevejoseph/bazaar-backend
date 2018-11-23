import _ from 'lodash';
import React, { Component } from 'react';
import { fetchServicesByTag, serviceSearch } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
        this.fetchServices = _.debounce(this.fetchServices, 100);
    }

    fetchServices(term) {
        if (this.props.category)
            this.props.fetchServicesByTag(this.props.category, term);
        else
            this.props.serviceSearch(term);
    }

    onInputChange(term){
        this.setState({ term });
        this.fetchServices(term);
        
        if (term && this.props.inputHasTerm)
            this.props.inputHasTerm(true)
        else if (this.props.inputHasTerm)
            this.props.inputHasTerm(false)
    }

    render() {
        return (
            <div className="search container p-3">
                <input 
                    className="form-control form-control-lg" 
                    type="text" 
                    placeholder={`Search ${this.props.category ? `in ${this.props.category}` : ''}`}
                    value={this.state.term}
                    onChange={(event) => this.onInputChange(event.target.value)} 
                    />
                <hr />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchServicesByTag, serviceSearch}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);