import _ from 'lodash';
import React, { Component } from 'react';
import Loader from 'react-loaders'
import ServiceCardListRow from './service_card_list_row';
import { connect } from 'react-redux';
import { fetchServicesByTag } from '../actions';

class CategoryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: null
        }


    }

    

    componentDidMount() {
        const { category } = this.props.match.params;
        this.props.fetchServicesByTag(category);
    }

    render() {
        const { category } = this.props.match.params;
        console.log(category);
        
        if (!this.props.services)
            return <Loader type="ball-pulse" />

        return (
            <div>
                <div className="home container">
                <ServiceCardListRow 
                    key={this.props.category} 
                    header={category} 
                    services={this.props.services[category]} 
                    ableToEdit={false} 
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { services: state.services.exploreServices };
}

export default connect(mapStateToProps, { fetchServicesByTag })(CategoryView);