import React, { Component } from 'react';
import ServiceCardListRow from './service_card_list_row';
import { connect } from 'react-redux';
import { fetchServices } from '../actions';

const samplesServices = ['Pancake Lessons', 'Frog Taming', 'Cereal Pouring Basics', 'Greek Life Initiation', 'Chick-fil-A Line Holder', 'Yeet'];

class Home extends Component {
    componentDidMount() {
        this.props.fetchServices();
    }

    render() {
        return (
            <div className="home container" >
                <ServiceCardListRow services={this.props.services}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { services: state.services.services };
}

export default connect(mapStateToProps, { fetchServices })(Home);