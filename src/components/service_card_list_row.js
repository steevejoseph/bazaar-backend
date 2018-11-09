import React, { Component } from 'react';
import ServiceCard from './service_card';

export default class ServiceCardListRow extends Component {  
    renderCardList(name) {
        return (
            <div key={name}>
                <ServiceCard serviceName={name}/>
            </div>
        )
    }

    render() {
        const samplesServices = ['Pancake Lessons', 'Frog Taming', 'Cereal Pouring Basics', 'Greek Life Initiation', 'Chick-fil-A Line Holder', 'Yeet'];
        return (
            <div>
                <h1>Category</h1>
                <div className="row flex-row">
                    {samplesServices.map(this.renderCardList)}
                </div>
            </div>
        );
    }
}