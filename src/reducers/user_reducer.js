import _ from 'lodash';
import { CREATE_USER, LOGIN } from '../actions';

export default function(state = {}, action) {   
    switch (action.type) {
        case CREATE_USER: 
            return state;
        case LOGIN: 
            if (action.payload.status === 200)
                return { loggedIn: true }
            return state;
        default:
            return state;
    }
}