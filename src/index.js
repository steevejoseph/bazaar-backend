import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './style/index.css';
import 'font-awesome/css/font-awesome.min.css';

<<<<<<< HEAD
import Navbar from './components/navbar';
import CreateService from './components/create_service';
import EditServices from './components/editservice';
import Home from './components/home';
import Account from './components/account';
import ServiceView from './components/service_view';
=======
import App from './components/app';
>>>>>>> 0bb1362e3bf3199b3d3b71406f75f5aaa0e56dff

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
<<<<<<< HEAD
        <BrowserRouter>
            <div>
                <Route component={Navbar} />
                <Switch>
                    <Route path="/services/:id" component={ServiceView} />
                    <Route path="/account" component={Account} />
                    <Route path="/create-service" component={CreateService} />
                    <Route path="/editservice" component={EditServices} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
=======
        <App />
>>>>>>> 0bb1362e3bf3199b3d3b71406f75f5aaa0e56dff
    </Provider>
    , document.getElementById('root'));