import React, { Component } from 'react';

const ServiceDescription = ({ service }) => {

    if(!service)
        return <div>Loading...</div>
  
    return (
            <nav className="navbar fixed-bottom navbar-dark bg-light">
                <h5>{service.name}</h5>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <h4 className="text-success font-weight-bold">$15/hr <button className="btn btn-s btn-danger">Interested</button></h4>
                    </li>
                </ul>
            </nav>
    );
};

export default ServiceDescription;