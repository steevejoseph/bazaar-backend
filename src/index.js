import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './style/index.css';
import 'font-awesome/css/font-awesome.min.css';

import Navbar from './components/navbar';
import CreateService from './components/create_service';
import Home from './components/home';
import Account from './components/account';
import ServiceView from './components/service_view';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Route component={Navbar} />
                <Switch>
                    <Route path="/services/:id" component={ServiceView} />
                    <Route path="/account" component={Account} />
                    <Route path="/create-service" component={CreateService} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));