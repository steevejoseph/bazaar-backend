import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './navbar';
import ServiceView from './service_view';
import Account from './account';
import Home from './home';
import { getUserFromLocalStorage } from '../actions';

class App extends Component {
    componentWillMount() {
        if (localStorage.getItem('loggedInUser') && !this.props.user)
            this.props.getUserFromLocalStorage(); 
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route component={Navbar} />
                    <Switch>
                        <Route path="/services/:id" component={ServiceView} />
                        <Route path="/account" component={Account} />
                        <Route path="/" component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user.user };
}

export default connect(mapStateToProps, {getUserFromLocalStorage})(App);