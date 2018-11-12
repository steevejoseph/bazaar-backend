import _ from 'lodash';
import { FETCH_ALL_SERVICES, CREATE_SERVICE, SERVICE_SEARCH } from '../actions';

export default function(state = {}, action) {   
    switch (action.type) {
        case FETCH_ALL_SERVICES: 
            return { services: action.payload.data.services }
        case CREATE_SERVICE:
        console.log(action);

        case SERVICE_SEARCH:
            console.log(action.payload.data.results.length);
            return { services: action.payload.data.results };
        
        default:
            return state;
    }
}