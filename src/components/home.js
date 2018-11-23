import _ from 'lodash';
import React, { Component } from 'react';
import Loader from 'react-loaders'
import ServiceCardListRow from './service_card_list_row';
import Search from './search';
import { connect } from 'react-redux';
import { fetchServicesByTag } from '../actions';
import { CATEGORIES } from '../constants';

class Home extends Component {
    componentDidMount() {      
        _.map(CATEGORIES, categoryObject => {
            this.props.fetchServicesByTag(categoryObject.category);
        });
    }

    renderServiceCategories() {
        return _.map(CATEGORIES, categoryObject => {
            if (!this.props.services[categoryObject.category] || this.props.services[categoryObject.category].length < 1)
                return '';

            return (
                <ServiceCardListRow 
                    key={categoryObject.category} 
                    header={categoryObject.category} 
                    description={categoryObject.description}
                    services={this.props.services[categoryObject.category]} 
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
                <div className="p-5" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { services: state.services.servicesByCategory };
}

export default connect(mapStateToProps, { fetchServicesByTag })(Home);