import _ from 'lodash';
import { FETCH_ALL_SERVICES } from '../actions';

export default function(state = {}, action) {   
    switch (action.type) {
        case FETCH_ALL_SERVICES: 
            return { services: action.payload.data.services }
        default:
            return state;
    }
}