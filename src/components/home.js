import React, { Component } from 'react';
import SearchBar from './search_bar';
import ServiceCardListRow from './service_card_list_row';

export default class Home extends Component {
    render() {
        return (
            <div className="home container" >
                <ServiceCardListRow />
            </div>
        );
    }
}