import _ from 'lodash';
import { CREATE_USER, LOGIN, GET_USER_FROM_LOCAL_STORAGE, LOG_OUT_USER } from '../actions';

export default function(state = {}, action) {   
    switch (action.type) {
        case CREATE_USER: 
            return state;
        case LOGIN: 
            if (action.payload.status === 200) {
                localStorage.setItem('loggedInUser', JSON.stringify(action.payload.data.user))
                return { 
                    loggedIn: true,
                    user: action.payload.data.user
                 };
            }
            return state;
        case GET_USER_FROM_LOCAL_STORAGE:
            return {
                loggedIn: true,
                user: localStorage.getItem('loggedInUser')
            }
        case LOG_OUT_USER:
            return {
                loggedIn: false
            }
        default:
            return state;
    }
}