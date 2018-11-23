import _ from 'lodash';
import React, { Component } from 'react';
import Loader from 'react-loaders'
import ServiceCardListRow from './service_card_list_row';
import Search from './search';
import { connect } from 'react-redux';
import { fetchServicesByTag } from '../actions';
import { EXPLORE_CATEGORIES } from '../constants';

class Home extends Component {
    componentDidMount() {      
        _.map(EXPLORE_CATEGORIES, category => {
            this.props.fetchServicesByTag(category);
        });
    }

    renderServiceCategories() {
        return _.map(EXPLORE_CATEGORIES, category => {
            if (!this.props.services[category] || this.props.services[category].length < 1)
                return '';

            return (
                <ServiceCardListRow 
                    key={category} 
                    header={category} 
                    services={this.props.services[category]} 
                    ableToEdit={false} 
                    isHome={true}
                    />
            );
        });
    }

    render() {
        if (!this.props.services)
            return <Loader type="ball-pulse" />

        return (
            <div>
                {/* <Search /> */}
                <div className="home container">
                    {this.renderServiceCategories()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { services: state.services.exploreServices };
}

export default connect(mapStateToProps, { fetchServicesByTag })(Home);