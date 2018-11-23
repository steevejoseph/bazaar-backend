import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCardListRow from './service_card_list_row';
import { connect } from 'react-redux';
import { serviceSearch } from '../actions';

class SearchResults extends Component {
    render() {
        return (
            <div>
                <div className="results-view container">
                    <ServiceCardListRow 
                        key="Results" 
                        header="Search Results" 
                        description={this.state}
                        services={this.props.services} 
                        />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { services: state.services.searchResults };
}

export default connect(mapStateToProps, { serviceSearch })(SearchResults);