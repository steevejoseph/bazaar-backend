import _ from 'lodash';
import { FETCH_ALL_SERVICES, CREATE_SERVICE } from '../actions';

export default function(state = {}, action) {   
    switch (action.type) {
        case FETCH_ALL_SERVICES: 
            return { services: action.payload.data.services }
        case CREATE_SERVICE:
        console.log(action);
        
            return state
        default:
            return state;
    }
}