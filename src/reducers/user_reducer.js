import _ from 'lodash';
import { CREATE_USER, LOGIN, GET_USER_FROM_LOCAL_STORAGE, LOG_OUT_USER } from '../actions';

export default function(state = {}, action) {   
    switch (action.type) {
        case CREATE_USER: 
            return state;
        case LOGIN: 
            if (action.payload.status === 200) {
                // console.log(typeof(action.payload.data.token));                
                // console.log(action.payload.data);
                localStorage.setItem('loggedInUser', JSON.stringify(action.payload.data.user))
                localStorage.setItem('token', JSON.stringify(action.payload.data.token))
                return {
                    ...state,
                    loggedIn: true,
                    user: action.payload.data.user,
                    token: action.payload.data.token
                 };
            }
            return state;
        case GET_USER_FROM_LOCAL_STORAGE:
            return {
                ...state,
                loggedIn: true,
                user: localStorage.getItem('loggedInUser'),
                token: localStorage.getItem('token')

            }
        case LOG_OUT_USER:
            return {
                ...state,
                loggedIn: false,

            }
        default:
            return state;
    }
}