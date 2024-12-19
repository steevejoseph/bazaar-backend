import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './navbar';
import ServiceView from './service_view';
import Account from './account';
import Home from './home';
import { getUserFromLocalStorage } from '../actions';
import CategoryView from './category_view';
import DirectMessages from './direct_messages';
import UserView from './user_view';
import CreateEditService from './create_edit_service';

class App extends Component {
    componentWillMount() {
        if (localStorage.getItem('loggedInUser'))
            this.props.getUserFromLocalStorage(); 
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route component={Navbar} />
                    <div className="app-body">
                        <Switch>
                            <Route path="/category/:category" component={CategoryView} />
                            <Route path="/services/:id" component={ServiceView} />
                            <Route path="/service/create" component={CreateEditService} />
                            <Route path="/service/edit" component={() => <CreateEditService isEdit={true} />} />
                            <Route path="/account" component={Account} />
                            <Route path="/user/:userId" component={UserView} />
                            <Route path="/messages/" component={DirectMessages} />
                            <Route path="/messages/:roomId" component={DirectMessages} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user.user };
}

export default connect(mapStateToProps, {getUserFromLocalStorage})(App);