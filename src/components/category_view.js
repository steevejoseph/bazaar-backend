import _ from 'lodash';
import React, { Component } from 'react';
import ServiceCardListRow from './service_card_list_row';
import { connect } from 'react-redux';
import { fetchServicesByTag } from '../actions';
import { CATEGORIES } from '../constants';
import Search from './search';

class CategoryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryObject: null
        }

        this.getCategory = this.getCategory.bind(this);
    }

    getCategory(category) {
        category = category.toLowerCase();

        for (var i = 0; i < CATEGORIES.length; i++)
            if (CATEGORIES[i].category.toLowerCase() === category)
                return CATEGORIES[i];

        return null;
    }

    componentDidMount() {
        const categoryFromURL = this.props.match.params.category;
        const categoryObject = this.getCategory(categoryFromURL);
        
        this.setState({ categoryObject: categoryObject });

        if(categoryObject)
            this.props.fetchServicesByTag(categoryObject.category);
    }

    render() {
        const { category } = this.props.match.params;

        if (!this.props.services || !this.state.categoryObject)
            return <div>This ({category}) isn't a category.</div>

        return (
            <div>
                <Search category={this.state.categoryObject.category} />                
                <div className="category-view container">
                    <ServiceCardListRow 
                        key={this.state.categoryObject.category} 
                        header={this.state.categoryObject.category} 
                        description={this.state.categoryObject.description}
                        services={this.props.services[this.state.categoryObject.category]} 
                        ableToEdit={false} 
                        />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { services: state.services.servicesByCategory };
}

export default connect(mapStateToProps, { fetchServicesByTag })(CategoryView);