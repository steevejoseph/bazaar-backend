import React, { Component } from 'react';
import ServiceCard from './service_card';

export default class ServiceCardListRow extends Component {  
    renderCardList(name) {
        return (
            <div>
                <ServiceCard serviceName={name}/>
            </div>
        )
    }

    render() {
        const samplesServices = ['Pancake Lessons', 'Frog Taming', 'Cereal Pouring Basics', 'Pancake Lessons', 'Frog Taming', 'Cereal Pouring Basics'];
        return (
            <div className="container">
                <h1>Category</h1>
                <div className="row flex-row ">
                    {samplesServices.map(this.renderCardList)}
                </div>
            </div>
        );
    }
}