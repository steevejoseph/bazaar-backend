import _ from 'lodash';
import { FETCH_ALL_SERVICES, CREATE_SERVICE, SERVICE_SEARCH, SERVICE_VIEW } from '../actions';

export default function(state = {}, action) {   
    switch (action.type) {
        case FETCH_ALL_SERVICES: 
            return { services: action.payload.data.services }
        case CREATE_SERVICE:
            return state;
        case SERVICE_SEARCH:
            return { services: action.payload.data.results };
        case SERVICE_VIEW:
            return { service: action.payload.data.service };
            //return { ...state, [action.payload.data.service._id]: action.payload.data };
        default:
            return state;
    }
}