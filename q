[1mdiff --git a/src/actions/index.js b/src/actions/index.js[m
[1mindex 90aff8c..e76b01d 100644[m
[1m--- a/src/actions/index.js[m
[1m+++ b/src/actions/index.js[m
[36m@@ -52,4 +52,20 @@[m [mexport function fetchServices() {[m
         type: FETCH_ALL_SERVICES,[m
         payload: axios.get(`${ROOT_URL}/services`)[m
     }[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32mexport function searchServices(searchTerm){[m
[32m+[m[32m    const data = {[m
[32m+[m[32m        query: searchTerm[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m
[32m+[m[32m    return {[m
[32m+[m[32m        type: SERVICE_SEARCH,[m
[32m+[m[32m        payload: axios.post(`${ROOT_URL}/services/search`, data)[m
[32m+[m[32m    };[m
[32m+[m
[32m+[m[32m}[m
[1mdiff --git a/src/components/home.js b/src/components/home.js[m
[1mindex c13fca8..ce60bb6 100644[m
[1m--- a/src/components/home.js[m
[1m+++ b/src/components/home.js[m
[36m@@ -2,6 +2,7 @@[m [mimport React, { Component } from 'react';[m
 import ServiceCardListRow from './service_card_list_row';[m
 import { connect } from 'react-redux';[m
 import { fetchServices } from '../actions';[m
[32m+[m[32mimport SearchBar from './search_bar';[m
 [m
 const samplesServices = ['Pancake Lessons', 'Frog Taming', 'Cereal Pouring Basics', 'Greek Life Initiation', 'Chick-fil-A Line Holder', 'Yeet'];[m
 [m
[36m@@ -13,6 +14,7 @@[m [mclass Home extends Component {[m
     render() {[m
         return ([m
             <div className="home container" >[m
[32m+[m[32m                <SearchBar/>[m
                 <ServiceCardListRow services={this.props.services}/>[m
             </div>[m
         );[m
[36m@@ -23,4 +25,4 @@[m [mfunction mapStateToProps(state) {[m
     return { services: state.services.services };[m
 }[m
 [m
[31m-export default connect(mapStateToProps, { fetchServices })(Home);[m
\ No newline at end of file[m
[32m+[m[32mexport default connect(mapStateToProps, { fetchServices })(Home);[m
[1mdiff --git a/src/components/login.js b/src/components/login.js[m
[1mindex 0128368..a657319 100644[m
[1m--- a/src/components/login.js[m
[1m+++ b/src/components/login.js[m
[36m@@ -11,8 +11,8 @@[m [mclass Login extends Component {[m
         return ([m
             <div className={className}>[m
                 <div>[m
[31m-                    <input [m
[31m-                        type="text" [m
[32m+[m[32m                    <input[m
[32m+[m[32m                        type="text"[m
                         className="form-control form-control-lg"[m
                         autoComplete="off"[m
                         placeholder={field.label}[m
[36m@@ -28,7 +28,7 @@[m [mclass Login extends Component {[m
 [m
     onSubmit(values) {[m
         this.props.login(values, () => {[m
[31m-        [m
[32m+[m
         });[m
     }[m
 [m
[36m@@ -37,12 +37,12 @@[m [mclass Login extends Component {[m
         return ([m
             <div className="modal-body">[m
                 <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>[m
[31m-                    <Field [m
[32m+[m[32m                    <Field[m
                         label="Email"[m
                         name="email"[m
                         component={this.renderField}[m
                     />[m
[31m-                    <Field [m
[32m+[m[32m                    <Field[m
                         label="Password"[m
                         name="password"[m
                         component={this.renderField}[m
[36m@@ -51,8 +51,8 @@[m [mclass Login extends Component {[m
                         <button type="submit" className="btn btn-lg btn-block btn-danger">Log in</button>[m
                     </div>[m
                 </form>[m
[31m-                <div className="text-center">                    [m
[31m-                    <p>Don't have an account? <a href="#"  onClick={this.props.switchToSignup}>Sign up</a></p>[m
[32m+[m[32m                <div className="text-center">[m
[32m+[m[32m                    <p onClick={this.props.switchToSignup}>Don't have an account? <a href="#">Sign up</a></p>[m
                 </div>[m
             </div>[m
         );[m
[36m@@ -62,12 +62,12 @@[m [mclass Login extends Component {[m
 function validate(values) {[m
     const errors = {};[m
 [m
[31m-    if (!values.email) [m
[32m+[m[32m    if (!values.email)[m
         errors.email = "Enter your UCF email.";[m
[31m-    [m
[31m-    if (!values.password) [m
[32m+[m
[32m+[m[32m    if (!values.password)[m
         errors.password = "Enter your password";[m
[31m-    [m
[32m+[m
     return errors;[m
 }[m
 [m
[36m@@ -76,4 +76,4 @@[m [mexport default reduxForm({[m
     form: 'LoginForm'[m
 })([m
     connect(null, {login})(Login)[m
[31m-);[m
\ No newline at end of file[m
[32m+[m[32m);[m
[1mdiff --git a/src/components/search_bar.js b/src/components/search_bar.js[m
[1mindex 67e350b..5594b41 100644[m
[1m--- a/src/components/search_bar.js[m
[1m+++ b/src/components/search_bar.js[m
[36m@@ -1,11 +1,58 @@[m
 import React, { Component } from 'react';[m
[32m+[m[32mimport { searchServices } from '../actions/index';[m
[32m+[m[32mimport { connect } from 'react-redux';[m
[32m+[m[32mimport {bindActionCreators} from 'redux'[m
[32m+[m[32mimport home from './home';[m
[32m+[m
[32m+[m
[32m+[m[32mclass SearchBar extends Component {[m
[32m+[m
[32m+[m[32m    constructor(props) {[m
[32m+[m
[32m+[m[32m        super(props);[m
[32m+[m
[32m+[m[32m        this.state = {term: ''};[m
[32m+[m
[32m+[m[32m        this.onInputChange = this.onInputChange.bind(this);[m
[32m+[m[32m        this.onFormSubmit = this.onFormSubmit.bind(this);[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    onInputChange(event){[m
[32m+[m[32m        console.log(event.target.value);[m
[32m+[m[32m        this.setState({term: event.target.value});[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m    onFormSubmit(event){[m
[32m+[m
[32m+[m[32m        event.preventDefault();[m
[32m+[m[32m        console.log("THIS CAL IS ", this.state.term);[m
[32m+[m[32m        this.props.searchServices(this.state.term);[m
[32m+[m[32m        console.log("WE back");[m
[32m+[m[32m        this.setState({term: ''});[m
[32m+[m[32m    }[m
[32m+[m
 [m
[31m-export default class SearchBar extends Component {[m
     render() {[m
         return ([m
[31m-            <div>[m
[31m-                <input className="form-control form-control-lg" type="text" placeholder="Search" />[m
[31m-            </div>[m
[32m+[m[32m            <form onSubmit={this.onFormSubmit} className="input-group">[m
[32m+[m[32m                <input[m
[32m+[m[32m                        className="form-control form-control-lg"[m
[32m+[m[32m                        value= {this.state.term}[m
[32m+[m[32m                        type="text"[m
[32m+[m[32m                        placeholder="Search"[m
[32m+[m[32m                        onChange={this.onInputChange}/>[m
[32m+[m[41m                    [m
[32m+[m[32m            </form>[m
[32m+[m
         );[m
     }[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
[32m+[m
[32m+[m
[32m+[m[32mfunction mapDispatchToProps(dispatch) {[m
[32m+[m[32m    return bindActionCreators({searchServices}, dispatch);[m
[32m+[m
[32m+[m[32m}[m
[32m+[m[32mexport default connect (null, mapDispatchToProps)(SearchBar);[m
[1mdiff --git a/src/components/service_card.js b/src/components/service_card.js[m
[1mindex 3f01bcd..2baa3a8 100644[m
[1m--- a/src/components/service_card.js[m
[1m+++ b/src/components/service_card.js[m
[36m@@ -14,4 +14,4 @@[m [mexport default class ServiceCard extends Component {[m
             </div>[m
         );[m
     }[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
[1mdiff --git a/src/components/service_card_list_row.js b/src/components/service_card_list_row.js[m
[1mindex c7e9c6d..d43f535 100644[m
[1m--- a/src/components/service_card_list_row.js[m
[1m+++ b/src/components/service_card_list_row.js[m
[36m@@ -1,8 +1,9 @@[m
 import _ from 'lodash';[m
 import React, { Component } from 'react';[m
 import ServiceCard from './service_card';[m
[32m+[m[32mimport {connect} from 'react-redux';[m
 [m
[31m-export default class ServiceCardListRow extends Component {  [m
[32m+[m[32mclass ServiceCardListRow extends Component {[m
     renderCardList() {[m
         return _.map(this.props.services, service => {[m
             return ([m
[36m@@ -21,4 +22,12 @@[m [mexport default class ServiceCardListRow extends Component {[m
             </div>[m
         );[m
     }[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
[32m+[m
[32m+[m
[32m+[m[32mfunction mapStateToProps(state){[m
[32m+[m[32m    console.log("DO dis do anything", state.services);[m
[32m+[m[32m    return {  services: state.services.services }[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport default connect(mapStateToProps)(ServiceCardListRow);[m
[1mdiff --git a/src/reducers/service_reducer.js b/src/reducers/service_reducer.js[m
[1mindex 281513d..cfdc34f 100644[m
[1m--- a/src/reducers/service_reducer.js[m
[1m+++ b/src/reducers/service_reducer.js[m
[36m@@ -1,15 +1,21 @@[m
 import _ from 'lodash';[m
[31m-import { FETCH_ALL_SERVICES, CREATE_SERVICE } from '../actions';[m
[32m+[m[32mimport { FETCH_ALL_SERVICES, CREATE_SERVICE, SERVICE_SEARCH } from '../actions';[m
 [m
[31m-export default function(state = {}, action) {   [m
[32m+[m[32mexport default function(state = {}, action) {[m
     switch (action.type) {[m
[31m-        case FETCH_ALL_SERVICES: [m
[32m+[m[32m        case FETCH_ALL_SERVICES:[m
             return { services: action.payload.data.services }[m
         case CREATE_SERVICE:[m
         console.log(action);[m
[31m-        [m
[31m-            return state[m
[32m+[m
[32m+[m[32m        case SERVICE_SEARCH:[m
[32m+[m
[32m+[m[32m            //console.log(action.payload.data);[m
[32m+[m[32m            console.log(action.payload.data.results);[m
[32m+[m[32m            return {services: action.payload.data.results};[m
[32m+[m
[32m+[m[32m            //return state[m
         default:[m
             return state;[m
     }[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
